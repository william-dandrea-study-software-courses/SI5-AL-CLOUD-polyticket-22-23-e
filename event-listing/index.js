const express = require('express');
const pg = require("pg");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.get('/all-events', async (req, res) => {

    try {

        const pgConfig = {
            user: 'postgres',
            host: process.env.DATABASE_URL || '',
            database: process.env.DATABASE_NAME || '',
            password: process.env.DATABASE_PASSWORD || ''
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

