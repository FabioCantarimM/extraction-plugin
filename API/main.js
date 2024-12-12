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
        const result = await pool.query('SELECT "PREÇO MARGEM MINIMA RAIA" as lprice, "IC NOVO SITE/LOJA RAIA" as ic, "RBV L1M" as rbv,"panvel" FROM "data_updated" WHERE "produto" = $1', [sku]);

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
      console.log('SKU recebido:', sku); // Log do SKU recebido
      const result = await pool.query('SELECT "paguemenos", "drogariaspacheco","panvel","belezanaweb","epocacosmeticos","farmaciasnissei","ultrafarma","extrafarma","amazon","drogariavenancio","drogariasaopaulo","magazineluiza","araujo" FROM drogadata WHERE "PRODUTO" = $1', [sku]);

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
      const result = await pool.query('SELECT total_rbv_l1m, total_ic_novo_raia_concorrente, total_ic_novo_site_loja_raia FROM soma_categoria_completa WHERE "CATEGORIA" = $1', [cat]);

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



