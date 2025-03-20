const express = require('express');
const { Pool } = require('pg');
const Redis = require('ioredis');
const cors = require('cors');
const multer = require("multer");
const xlsx = require("xlsx");
const os = require('os');

const app = express();
const port = 3000;
const upload = multer({ dest: "uploads/" });

// Configuração do PostgreSQL
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// Configuração do Redis com autenticação
const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    retryStrategy: (times) => Math.min(times * 50, 2000)
});

const CACHE_EXPIRATION = 3600; // Cache por 1 hora

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'IP não encontrado';
}

app.use(cors());
app.use(express.json());

// 📌 ROTA: Buscar Produto por SKU
app.get('/api/produtos/:sku', async (req, res) => {
    const { sku } = req.params;
    const cacheKey = `produto:${sku}`;

    try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            console.log(`Cache hit para SKU: ${sku}`);
            return res.json(JSON.parse(cachedData));
        }

        console.log(`Cache miss para SKU: ${sku}, consultando o banco...`);
        const result = await pool.query(
            `SELECT 
                "PREÇO MARGEM MINIMA RAIA" as lprice,  
                "IC NOVO SITE/LOJA RAIA PONDERADO" as ic, 
                "RBV L1M" as rbv, 
                "PANVEL" AS panvel, 
                "DT INICIO OFERTA RAIA" AS dtInicio, 
                "DT FIM OFERTA RAIA" AS dtFim 
             FROM "produtos" 
             WHERE "PRODUTO" = $1`, 
            [sku]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        const produto = result.rows[0];

        await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(produto));

        return res.json(produto);
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).send('Erro ao acessar o banco de dados');
    }
});

app.post("/api/upload/produtos", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
      }
  
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      const insertQuery = `
        INSERT INTO public.produtos("UF", "PRODUTO", "DESCRIÇÃO", "GRUPO", "Departamento SITE", "MASTER", 
        "CATEGORIA SITE", "CATEGORIA", "SUB CATEGORIA", "FORNECEDOR", "FL INATIVO", "REMARCAÇÃO", "COMERCIALIZAÇÃO", 
        "QT ESTOQUE", "NOTABILIDADE", "PREÇO DE RAIA BAIXA", "PREÇO DE DSIL BAIXA", "PREÇO DE RAIA MÉDIA", "PREÇO DE DSIL MÉDIA", 
        "PREÇO DE RAIA ALTA", "PREÇO DE DSIL ALTA", "PREÇO POR RAIA BAIXA", "PREÇO POR DSIL BAIXA", "PREÇO POR RAIA MÉDIA", 
        "PREÇO POR DSIL MÉDIA", "PREÇO POR RAIA ALTA", "PREÇO POR DSIL ALTA", "MENOR PREÇO RAIA", "MENOR PREÇO DSIL", 
        "PREÇO DE RAIA ECOMM", "PREÇO DE DSIL ECOMM", "PREÇO POR RAIA ECOMM", "DT INICIO OFERTA RAIA", "DT FIM OFERTA RAIA", 
        "PREÇO POR DSIL ECOMM", "DT INICIO OFERTA DSIL", "DT FIM OFERTA DSIL", "MENOR PREÇO RAIA ECOMM", "MENOR PREÇO DSIL ECOMM", 
        "PANVEL", "ULTRAFARMA", "EXTRAFARMA", "DROGARIAVENANCIO", "MAGAZINELUIZA", "ARAUJO", "EPOCACOSMETICOS", "AMAZON", 
        "DROGARIASPACHECO", "PAGUEMENOS", "FARMACIASNISSEI", "DROGARIASAOPAULO", "BELEZANAWEB", "REGRA CONCORRÊNCIA RAIA", 
        "REGRA CONCORRÊNCIA DSIL", "NOME COMPETIDOR RAIA", "NOME COMPETIDOR DSIL", "CUSTO MEDIO", "ALIQUOTA MEDIA", 
        "ORIGEM DO CUSTO", "MG MÍN RAIA", "POSICIONAMENTO RAIA", "MG MÍN DSIL", "POSICIONAMENTO DSIL", "PREÇO MARGEM MINIMA RAIA", 
        "PREÇO CONCORRENCIA RAIA", "PREÇO MAXIMO RAIA", "PREÇO MARGEM MINIMA DSIL", "PREÇO CONCORRENCIA DSIL", "PREÇO MAXIMO DSIL",
        "PREÇO SEGUIR RAIA", "PREÇO SEGUIR DSIL", "STATUS DE PREÇO RAIA", "STATUS DE PREÇO DSIL", "CLASSIFICACAO ELASTICIDADE", 
        "PREÇO MAGICO RAIA", "PREÇO MAGICO DSIL", "EXCEÇÃO", "EXCEÇÃO REMARCAÇÃO", "É OFERTA ECOMM RAIA?", "É OFERTA ECOMM DSIL?",
        "LMPM RAIA", "DT INICIO LMPM RAIA", "DT FIM LMPM RAIA", "LMPM MENOR QUE POR RAIA?", "LMPM DSIL", "DT INICIO LMPM DSIL", 
        "DT FIM LMPM DSIL", "LMPM MENOR QUE POR DSIL?", "VEREDITO RAIA", "VEREDITO DSIL", "O QUE FAZER RAIA", "O QUE FAZER DSIL", 
        "BANNER", "DERMACLUB", "PMC", "COMBO", "PREÇO SEMI-FINAL RAIA", "PREÇO SEMI-FINAL DSIL", "COMBO MENSAL", "TRATATIVAS RAIA", 
        "TRATATIVAS DSIL", "PREÇO FINAL RAIA", "PREÇO FINAL DSIL", "PREÇO POR BLACK", "TRAVA DE DIFERENÇA RAIA", 
        "TRAVA DE DIFERENÇA DSIL", "CODIGO OFERTA RAIA", "CODIGO OFERTA DSIL", "RELATIVIDADE RAIA/DSIL", 
        "TRAVA DIFERENÇA ENTRE BANDEIRAS", "VARIAÇÃO DE PREÇO RAIA", "VARIAÇÃO DE PREÇO DSIL", "IC ATUAL RAIA/CONCORRENTE", 
        "IC NOVO RAIA/CONCORRENTE", "IC ATUAL DSIL/CONCORRENTE", "IC NOVO DSIL/CONCORRENTE", "LB ATUAL RAIA", "LB % ATUAL RAIA", 
        "LB NOVO RAIA", "LB % NOVO RAIA", "LB ATUAL DSIL", "LB % ATUAL DSIL", "LB NOVO DSIL", "LB % NOVO DSIL", 
        "IC ATUAL SITE/LOJA RAIA", "IC NOVO SITE/LOJA RAIA", "IC ATUAL SITE/LOJA DSIL", "IC NOVO SITE/LOJA DSIL", 
        "QT UNIDADE VENDIDA L1M", "RBV L1M", "OUTLIER IC", "RBV L1M POND", "IC ATUAL RAIA/CONCORRENTE POND", 
        "IC NOVO RAIA/CONCORRENTE POND", "IC ATUAL DSIL/CONCORRENTE POND", "IC NOVO DSIL/CONCORRENTE POND", 
        "LB % ATUAL RAIA PONDERADO", "LB % NOVO RAIA PONDERADO", "LB % ATUAL DSIL PONDERADO", "LB % NOVO DSIL PONDERADO", 
        "IC ATUAL SITE/LOJA RAIA PONDERADO", "IC NOVO SITE/LOJA RAIA PONDERADO", "IC ATUAL SITE/LOJA DSIL PONDERADO", 
        "IC NOVO SITE/LOJA DSIL PONDERADO", "VARIAÇÃO RAIA PONDERADO", "VARIAÇÃO DSIL PONDERADO")
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, 
          $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, 
          $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, 
          $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80, $81, $82, 
          $83, $84, $85, $86, $87, $88, $89, $90, $91, $92, $93, $94, $95, $96, $97, $98, $99, $100, $101, $102,
          $103, $104, $105, $106, $107, $108, $109, $110, $111, $112, $113, $114, $115, $116, $117, $118, $119, 
          $120, $121, $122, $123, $124, $125, $126, $127, $128, $129, $130, $131, $132, $133, $134, $135, $136, 
          $137, $138, $139, $140, $141, $142, $143, $144, $145, $146)
      `;
      
      const updateQuery = `
        UPDATE public.produtos SET
          "UF" = $1, "PRODUTO" = $2, "DESCRIÇÃO" = $3, "GRUPO" = $4, "Departamento SITE" = $5, "MASTER" = $6,
          "CATEGORIA SITE" = $7, "CATEGORIA" = $8, "SUB CATEGORIA" = $9, "FORNECEDOR" = $10, "FL INATIVO" = $11,
          "REMARCAÇÃO" = $12, "COMERCIALIZAÇÃO" = $13, "QT ESTOQUE" = $14, "NOTABILIDADE" = $15, "PREÇO DE RAIA BAIXA" = $16,
          "PREÇO DE DSIL BAIXA" = $17, "PREÇO DE RAIA MÉDIA" = $18, "PREÇO DE DSIL MÉDIA" = $19, "PREÇO DE RAIA ALTA" = $20,
          "PREÇO DE DSIL ALTA" = $21, "PREÇO POR RAIA BAIXA" = $22, "PREÇO POR DSIL BAIXA" = $23, "PREÇO POR RAIA MÉDIA" = $24,
          "PREÇO POR DSIL MÉDIA" = $25, "PREÇO POR RAIA ALTA" = $26, "PREÇO POR DSIL ALTA" = $27, "MENOR PREÇO RAIA" = $28,
          "MENOR PREÇO DSIL" = $29, "PREÇO DE RAIA ECOMM" = $30, "PREÇO DE DSIL ECOMM" = $31, "PREÇO POR RAIA ECOMM" = $32,
          "DT INICIO OFERTA RAIA" = $33, "DT FIM OFERTA RAIA" = $34, "PREÇO POR DSIL ECOMM" = $35, "DT INICIO OFERTA DSIL" = $36,
          "DT FIM OFERTA DSIL" = $37, "MENOR PREÇO RAIA ECOMM" = $38, "MENOR PREÇO DSIL ECOMM" = $39, "PANVEL" = $40,
          "ULTRAFARMA" = $41, "EXTRAFARMA" = $42, "DROGARIAVENANCIO" = $43, "MAGAZINELUIZA" = $44, "ARAUJO" = $45,
          "EPOCACOSMETICOS" = $46, "AMAZON" = $47, "DROGARIASPACHECO" = $48, "PAGUEMENOS" = $49, "FARMACIASNISSEI" = $50,
          "DROGARIASAOPAULO" = $51, "BELEZANAWEB" = $52, "REGRA CONCORRÊNCIA RAIA" = $53, "REGRA CONCORRÊNCIA DSIL" = $54,
          "NOME COMPETIDOR RAIA" = $55, "NOME COMPETIDOR DSIL" = $56, "CUSTO MEDIO" = $57, "ALIQUOTA MEDIA" = $58,
          "ORIGEM DO CUSTO" = $59, "MG MÍN RAIA" = $60, "POSICIONAMENTO RAIA" = $61, "MG MÍN DSIL" = $62, "POSICIONAMENTO DSIL" = $63,
          "PREÇO MARGEM MINIMA RAIA" = $64, "PREÇO CONCORRENCIA RAIA" = $65, "PREÇO MAXIMO RAIA" = $66, "PREÇO MARGEM MINIMA DSIL" = $67,
          "PREÇO CONCORRENCIA DSIL" = $68, "PREÇO MAXIMO DSIL" = $69, "PREÇO SEGUIR RAIA" = $70, "PREÇO SEGUIR DSIL" = $71,
          "STATUS DE PREÇO RAIA" = $72, "STATUS DE PREÇO DSIL" = $73, "CLASSIFICACAO ELASTICIDADE" = $74, "PREÇO MAGICO RAIA" = $75,
          "PREÇO MAGICO DSIL" = $76, "EXCEÇÃO" = $77, "EXCEÇÃO REMARCAÇÃO" = $78, "É OFERTA ECOMM RAIA?" = $79, "É OFERTA ECOMM DSIL?" = $80,
          "LMPM RAIA" = $81, "DT INICIO LMPM RAIA" = $82, "DT FIM LMPM RAIA" = $83, "LMPM MENOR QUE POR RAIA?" = $84, "LMPM DSIL" = $85,
          "DT INICIO LMPM DSIL" = $86, "DT FIM LMPM DSIL" = $87, "LMPM MENOR QUE POR DSIL?" = $88, "VEREDITO RAIA" = $89,
          "VEREDITO DSIL" = $90, "O QUE FAZER RAIA" = $91, "O QUE FAZER DSIL" = $92, "BANNER" = $93, "DERMACLUB" = $94,
          "PMC" = $95, "COMBO" = $96, "PREÇO SEMI-FINAL RAIA" = $97, "PREÇO SEMI-FINAL DSIL" = $98, "COMBO MENSAL" = $99,
          "TRATATIVAS RAIA" = $100, "TRATATIVAS DSIL" = $101, "PREÇO FINAL RAIA" = $102, "PREÇO FINAL DSIL" = $103,
          "PREÇO POR BLACK" = $104, "TRAVA DE DIFERENÇA RAIA" = $105, "TRAVA DE DIFERENÇA DSIL" = $106, "CODIGO OFERTA RAIA" = $107,
          "CODIGO OFERTA DSIL" = $108, "RELATIVIDADE RAIA/DSIL" = $109, "TRAVA DIFERENÇA ENTRE BANDEIRAS" = $110, "VARIAÇÃO DE PREÇO RAIA" = $111,
          "VARIAÇÃO DE PREÇO DSIL" = $112, "IC ATUAL RAIA/CONCORRENTE" = $113, "IC NOVO RAIA/CONCORRENTE" = $114,
          "IC ATUAL DSIL/CONCORRENTE" = $115, "IC NOVO DSIL/CONCORRENTE" = $116, "LB ATUAL RAIA" = $117, "LB % ATUAL RAIA" = $118,
          "LB NOVO RAIA" = $119, "LB % NOVO RAIA" = $120, "LB ATUAL DSIL" = $121, "LB % ATUAL DSIL" = $122, "LB NOVO DSIL" = $123,
          "LB % NOVO DSIL" = $124, "IC ATUAL SITE/LOJA RAIA" = $125, "IC NOVO SITE/LOJA RAIA" = $126, "IC ATUAL SITE/LOJA DSIL" = $127,
          "IC NOVO SITE/LOJA DSIL" = $128, "QT UNIDADE VENDIDA L1M" = $129, "RBV L1M" = $130, "OUTLIER IC" = $131, "RBV L1M POND" = $132,
          "IC ATUAL RAIA/CONCORRENTE POND" = $133, "IC NOVO RAIA/CONCORRENTE POND" = $134, "IC ATUAL DSIL/CONCORRENTE POND" = $135,
          "IC NOVO DSIL/CONCORRENTE POND" = $136, "LB % ATUAL RAIA PONDERADO" = $137, "LB % NOVO RAIA PONDERADO" = $138,
          "LB % ATUAL DSIL PONDERADO" = $139, "LB % NOVO DSIL PONDERADO" = $140, "IC ATUAL SITE/LOJA RAIA PONDERADO" = $141,
          "IC NOVO SITE/LOJA RAIA PONDERADO" = $142, "IC ATUAL SITE/LOJA DSIL PONDERADO" = $143, "IC NOVO SITE/LOJA DSIL PONDERADO" = $144,
          "VARIAÇÃO RAIA PONDERADO" = $145, "VARIAÇÃO DSIL PONDERADO" = $146
        WHERE "PRODUTO" = $2;
      `;

      // Insert cada linha de dados de produtos
      for (const row of data) {
        const values = Object.values(row);
        
        // Verifica se o produto já existe na base (por exemplo, se "PRODUTO" é único)
        const result = await pool.query(`SELECT * FROM public.produtos WHERE "PRODUTO" = $1`, [row.PRODUTO]);
        
        if (result.rows.length > 0) {
          await pool.query(updateQuery, values);
        } else {
          await pool.query(insertQuery, values);
        }
      }
  
      res.json({ message: "Dados inseridos com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// 📌 ROTA: Buscar concorrentes por SKU
app.get('/api/concorrente/:sku', async (req, res) => {
    const { sku } = req.params;
    const cacheKey = `concorrente:${sku}`;

    try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            console.log(`Cache hit para Concorrente SKU: ${sku}`);
            return res.json(JSON.parse(cachedData));
        }

        console.log(`Cache miss para Concorrente SKU: ${sku}, consultando o banco...`);
        const result = await pool.query(
            `SELECT 
                "PAGUEMENOS" as paguemenos, 
                "DROGARIASPACHECO" as drogariaspacheco, 
                "PANVEL" as panvel, 
                "BELEZANAWEB" as belezanaweb, 
                "EPOCACOSMETICOS" as epocacosmeticos, 
                "FARMACIASNISSEI" as farmaciasnissei, 
                "ULTRAFARMA" as ultrafarma, 
                "EXTRAFARMA" as extrafarma, 
                "AMAZON" as amazon, 
                "DROGARIAVENANCIO" as drogariavenancio, 
                "DROGARIASAOPAULO" as drogariasaopaulo, 
                "MAGAZINELUIZA" as magazineluiza, 
                "ARAUJO" as araujo 
            FROM "produtos" 
            WHERE "PRODUTO" = $1`, 
            [sku]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        const concorrente = result.rows[0];

        await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(concorrente));

        return res.json(concorrente);
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).send('Erro ao acessar o banco de dados');
    }
});

// 📌 ROTA: Buscar informações por categoria
app.get('/api/categoria/:cat', async (req, res) => {
    const { cat } = req.params;
    const cacheKey = `categoria:${cat}`;

    try {
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            console.log(`Cache hit para Categoria: ${cat}`);
            return res.json(JSON.parse(cachedData));
        }

        console.log(`Cache miss para Categoria: ${cat}, consultando o banco...`);
        const result = await pool.query(
            `SELECT 
                media_ic_atual_raia as media_ic_atual_site_loja_raia, 
                soma_rbv_l1m, 
                "media_ic_novo_raia_concorrente" as media_ic_novo_concorrente, 
                numero_produtos 
            FROM resumo_categoria_site 
            WHERE "categoria_site" = $1`, 
            [cat]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        const categoria = result.rows[0];

        await redis.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(categoria));

        return res.json(categoria);
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).send('Erro ao acessar o banco de dados');
    }
});

app.listen(port, () => {
    const ip = getLocalIP();
    console.log(`Servidor rodando em http://${ip}:${port}`);
});
