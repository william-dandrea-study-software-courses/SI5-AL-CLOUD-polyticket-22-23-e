const express = require('express');
const pg = require("pg");
const app = express();
app.use(express.json())

const pgConfig = {
    user: 'postgres',
    host: '34.172.33.192',
    database: 'events',
    password: 'postgres',
    port: 5432
};


let pgPool;
if (!pgPool) {
    pgPool = new pg.Pool(pgConfig);
}

app.get('/all-events', async (req, res) => {
    const selectedRows = await pgPool.query("SELECT * from events");
    const rows = selectedRows.rows

    res.status(200).json(rows);
})

exports.main = app;

