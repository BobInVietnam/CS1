const express = require('express');
const lib = require('./utils');
const middleware = require('./middleware');
const rateLimit = require('express-rate-limit');
const { createQueue, shortQueue } = require('./queues');

const path = require('path');
const app = express();
const port = 3000;

// Middleware throttling
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

// Định nghĩa handler cho hàng đợi
shortQueue.process(async (job) => {
    const url = await lib.findOrigin(job.data.id);
    return url;
});

createQueue.process(async (job) => {
    const id = await lib.shortUrl(job.data.url);
    return id;
});


shortQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result:`, result);
});

shortQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err.message);
});

createQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result:`, result);
});

createQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err.message);
});

// Xử lý truy vấn /short/:id
app.get('/short/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Thêm công việc vào hàng đợi
        const job = await shortQueue.add({ id });

        // Chờ job hoàn thành
        const url = await job.finished();
        res.redirect(url);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Xử lý truy vấn /create
app.post('/create', async (req, res) => {
    const url = req.query.url;

    try {
        // Thêm công việc vào hàng đợi
        const job = await createQueue.add({ url });

        // Chờ job hoàn thành
        const newID = await job.finished();
        res.json({ id: newID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
