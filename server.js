const express = require('express')
const lib = require('./utils/utils')
const middleware = require('./utils/middleware')

const path = require('path')
const app = express()
const port = 3000

app.use(middleware.rateLimiter)
app.use(middleware.requestLogger)

app.use(express.static('ui'))

app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname + '/ui/index.html'))
    } catch (err) {
        res.send(err)
    }
})

app.get('/short/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const url = await lib.findOrigin(id);
        if (url == null) {
            res.send("<h1>404</h1>");
        }
        else {
            res.redirect(url);
        }
    } catch (err) {
        res.send(err)
    }
})

app.post('/create', async (req, res) => {
    try {
        const url = req.query.url;
        const newID = await lib.shortUrl(url);
        res.send({id:newID});
    } catch (err) {
        res.send(err)
    }
});

app.listen(port, () => {
    console.log(`CS1 app listening on port ${port}`);
})
