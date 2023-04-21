const express = require('express')
const app = express()
const port = 4000

app.get('/test', (req, res) => {
    res.json('test Ok')
}).listen(port)