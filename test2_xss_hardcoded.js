const express = require('express');
const app = express();

const DB_PASSWORD = "supersecret123";
const API_KEY = "sk-hardcoded-key-abc123";

app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`<h1>Results for: ${query}</h1>`);
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`<div>User data: ${userId}</div>`);
});
