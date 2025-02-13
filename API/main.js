const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const os = require('os');
const app = express();
const port = 3000;

// Configuração do pool do PostgreSQL
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

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

app.get('/api/produtos/:sku', async (req, res) => {
    const { sku } = req.params;
    try {
        console.log('SKU recebido:', sku); // Log do SKU recebido
        // Notabilidade / APP  - Menor Preço Raia / Nome Competidor Raia / MG Mín / Posicionamento Raia / Banner / Status de Preço Raia / Tratativas Raia /  LB% Novo raia / RBV L1M / RBV L1m Pond / Outlier IC /  IC Atual Raia/Concorrente / IC Novo Site  Loja raia ponderado
        const result = await pool.query(`
          SELECT 
              "PREÇO MARGEM MINIMA RAIA" AS lprice, 
              COALESCE(
                  NULLIF("IC NOVO SITE", '')::NUMERIC, 0
              ) / COALESCE(
                  NULLIF("LOJA RAIA PONDERADO", '')::NUMERIC, 0
              ) / NULLIF(
                  COALESCE("RBV L1M"::NUMERIC, 0), 0
              ) AS ic, 
              COALESCE("RBV L1M"::NUMERIC, 0) AS rbv, 
              "PANVEL" AS panvel, 
              "DT INICIO OFERTA RAIA" AS dtInicio, 
              "DT FIM OFERTA RAIA" AS dtFim
          FROM "produtos"
          WHERE "PRODUTO" = $1
      `, [sku]);

        // Verifica se algum produto foi encontrado
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Retorna os dados do produto encontrado
        // console.log('Dados do produto:', result.rows[0]); // Log dos dados do produto
        return res.json(result.rows[0]); // Retorna o primeiro produto encontrado
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).send('Erro ao acessar o banco de dados');
    }
});

app.get('/api/concorrente/:sku', async (req, res) =>{
  const { sku } = req.params;
  try {
      // console.log('SKU recebido:', sku); // Log do SKU recebido
      const result = await pool.query('SELECT "PAGUEMENOS" as "paguemenos", "DROGARIASPACHECO" as "drogariaspacheco", "PANVEL" as "panvel", "BELEZANAWEB" as "belezanaweb", "EPOCACOSMETICOS" as "epocacosmeticos", "FARMACIASNISSEI" as "farmaciasnissei", "ULTRAFARMA" as "ultrafarma", "EXTRAFARMA" as "extrafarma", "AMAZON" as "amazon", "DROGARIAVENANCIO" as "drogariavenancio", "DROGARIASAOPAULO" as "drogariasaopaulo", "MAGAZINELUIZA" as "magazineluiza", "ARAUJO" as "araujo" FROM "produtos" WHERE "PRODUTO" = $1', [sku]);

      // Verifica se algum produto foi encontrado
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Retorna os dados do produto encontrado
      // console.log('Dados do produto:', result.rows[0]); // Log dos dados do produto
      return res.json(result.rows[0]); // Retorna o primeiro produto encontrado
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    res.status(500).send('Erro ao acessar o banco de dados');
  }

})

app.get('/api/categoria/:cat', async (req, res) =>{
  const { cat } = req.params;
  try {
      console.log('Categoria recebida:', cat); // Log do SKU recebido
      const result = await pool.query('SELECT media_ic_atual_raia as "media_ic_atual_site_loja_raia", soma_rbv_l1m, "media_ic_novo_raia_concorrente" as "media_ic_novo_concorrente", numero_produtos FROM resumo_categoria_site WHERE "categoria_site" = $1', [cat]);

      // Verifica se algum produto foi encontrado
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      // Retorna os dados do produto encontrado
      return res.json(result.rows[0]); // Retorna o primeiro produto encontrado
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
    res.status(500).send('Erro ao acessar o banco de dados');
  }

})


app.listen(port, () => {
    const ip = getLocalIP()
    console.log(`Servidor rodando em http://${ip}:${port}`);
});



