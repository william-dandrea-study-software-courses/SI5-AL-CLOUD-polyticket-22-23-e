const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Root /")
});


app.get('/hello', (req, res) => {
    res.send("Root /hello")
});

exports.main = app;
