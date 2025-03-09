const express = require('express');
const { Pool } = require('pg');
const Redis = require('ioredis');
const cors = require('cors');
const os = require('os');

const app = express();
const port = 3000;

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
    username: process.env.REDIS_USER || 'default',
    password: process.env.REDIS_PASSWORD || 'minhaSenhaSegura',
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
