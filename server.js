const express = require('express');
const lib = require('./utils');
const middleware = require('./middleware');
const rateLimit = require('express-rate-limit');

const path = require('path');
const app = express();
const port = 3000;

// Cấu hình middleware throttling
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 phút
    max: 100, // Tối đa 100 yêu cầu mỗi phút
    message: { error: "Too many requests, please try again later." },
});


app.use(limiter);

app.use(express.static('ui'));
app.use(middleware.requestLogger);

app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname + '/ui/index.html'));
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/short/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const url = await lib.findOrigin(id);
        if (url == null) {
            res.status(404).send("<h1>404</h1>");
        } else {
            res.redirect(url);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/create', async (req, res) => {
    try {
        const url = req.query.url;
        const newID = await lib.shortUrl(url);
        res.send({ id: newID });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`CS1 app listening on port ${port}`);
});
