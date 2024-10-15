const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do pool do PostgreSQL
console.log(process.env.PG_USER, process.env.PG_HOST, process.env.PG_DATABASE, process.env.PG_PASSWORD, process.env.PG_PORT);
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

app.use(cors());
app.use(express.json());

app.get('/api/produtos/:sku', async (req, res) => {
    const { sku } = req.params;
    try {
        console.log('SKU recebido:', sku); // Log do SKU recebido
        const result = await pool.query('SELECT * FROM piloto_plugin WHERE sku_monitorado = $1', [sku]);

        // Verifica se algum produto foi encontrado
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Retorna os dados do produto encontrado
        console.log('Dados do produto:', result.rows[0]); // Log dos dados do produto
        return res.json(result.rows[0]); // Retorna o primeiro produto encontrado
    } catch (error) {
        console.error('Erro ao acessar o banco de dados:', error);
        res.status(500).send('Erro ao acessar o banco de dados');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
