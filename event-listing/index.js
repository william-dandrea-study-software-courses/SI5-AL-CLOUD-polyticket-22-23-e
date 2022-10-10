const express = require('express');
const pg = require("pg");
const app = express();
app.use(express.json())


app.get('/all-events', async (req, res) => {

    try {

        const pgConfig = {
            user: 'postgres',
            host: '34.172.33.192',
            database: 'events',
            password: 'postgres',
            port: 5432
        };

        const pgPool = new pg.Pool(pgConfig);

        const selectedRows = await pgPool.query("SELECT * from events");
        const rows = selectedRows.rows
        res.status(200).json(rows);
    } catch (e) {
        res.status(400).json(e);
    }

})

exports.main = app;

