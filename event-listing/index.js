const express = require('express');
const { Client } = require("pg");


const app = express();
app.use(express.json())


const client = new Client({
    user: "postgres",
    host: "34.172.33.192",
    database: "events",
    password: "postgres",
    port: 5432
});

app.get('/all-events', async (req, res) => {

    const result = await client.query(`SELECT * FROM events`)
        .then((payload) => {
            return payload.rows;
        })
        .catch(error => res.status(400).json({"error": error.detail}))

    res.status(200).json(result);
})

exports.main = app;
