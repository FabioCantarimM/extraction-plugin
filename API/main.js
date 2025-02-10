const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const os = require("os");

const app = express();
const port = process.env.PORT || 80;

// Configuração do pool do PostgreSQL
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT) || 5432,
});

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces).flat()) {
    if (iface && iface.family === "IPv4" && !iface.internal)
      return iface.address;
  }
  return "IP não encontrado";
};

/**
 *
 * @param {string} query
 * @param {string[]} params
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const queryDatabase = async (query, params, res, next) => {
  try {
    const result = await pool.query(query, params);
    if (result.rows.length === 0) throw new Error("Registro não encontrado");
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

app.use((req, res, next) => {
  // logger middleware
  res.on("finish", () => {
    const { ip, url, method } = req;
    const { statusCode, statusMessage } = res;
    console.debug(
      `${method} ${url} ${ip} -> ${statusCode} ${statusMessage}`
    );
  });
  next();
});
app.use(cors());
app.use(express.json());

app.get("/api/produtos/:sku", (req, res, next) => {
  queryDatabase(
    'SELECT "PREÇO MARGEM MINIMA RAIA" as lprice, "IC NOVO SITE/LOJA RAIA" as ic, "RBV L1M" as rbv, "PANVEL" AS panvel FROM "produtos" WHERE "PRODUTO" = $1',
    [req.params.sku],
    res,
    next
  );
});

app.get("/api/concorrente/:sku", (req, res, next) => {
  queryDatabase(
    'SELECT "PAGUEMENOS" as paguemenos, "DROGARIASPACHECO" as drogariaspacheco, "PANVEL" as panvel, "BELEZANAWEB" as belezanaweb, "EPOCACOSMETICOS" as epocacosmeticos, "FARMACIASNISSEI" as farmaciasnissei, "ULTRAFARMA" as ultrafarma, "EXTRAFARMA" as extrafarma, "AMAZON" as amazon, "DROGARIAVENANCIO" as drogariavenancio, "DROGARIASAOPAULO" as drogariasaopaulo, "MAGAZINELUIZA" as magazineluiza, "ARAUJO" as araujo FROM "produtos" WHERE "PRODUTO" = $1',
    [req.params.sku],
    res,
    next
  );
});

app.get("/api/categoria/:cat", (req, res, next) => {
  queryDatabase(
    'SELECT media_ic_atual_raia as media_ic_atual_site_loja_raia, soma_rbv_l1m, "media_ic_novo_raia_concorrente" as media_ic_novo_concorrente, numero_produtos FROM resumo_categoria_site WHERE "categoria_site" = $1',
    [req.params.cat],
    res,
    next
  );
});

// qualquer outra rota não mapeada cai aqui
app.use((_, __, next) => next(new Error("Página não encontrada")));

/**
 * Handle errors to keep api from going down
 *
 * @type {import("express").ErrorRequestHandler}
 */
const errorHandler = (err, _, res, __) => {
  const statusCode = err.message.includes("não") ? 404 : 500;
  const message = err.message || "Erro interno do servidor";
  console.error(statusCode, message);
  res.status(statusCode).send(message);
};

app.use(errorHandler);

app.listen(+port, () => {
  console.log(`Servidor rodando em http://${getLocalIP()}:${port}`);
});

// TODO
// - exportar metricas
// - authenticação
// - graceful exit
// - cache (lru)
