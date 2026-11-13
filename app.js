const dotenv = require('dotenv').config();
const express = require('express');

const app = express();
const taskRouter = require('./routes/taskRoutes');
const { fail } = require('./utils/response');
const { HTTPSTATUS_CODE } = require('./utils/statuscode');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');

connectDB();

app.use(express.urlencoded());
app.use(express.json());
app.use(morgan('dev'));
app.use('', logger);
app.use('/api/tasks', taskRouter);

app.get('/', (req, res) => {
    const time = Date.now();
    res.send("{name : 'Ajil', age: 30}")
    // res.status(200).json({message: 'Hello there.....', time })
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.get('/crash', (req, res) => {
    throw new Error("BOOOM");
});

app.use((req, res) => fail(res, "Route not found", 404, HTTPSTATUS_CODE.NOTFOUND));
app.use((err, req, res, next) => {
    return fail(res, err.message || "Server Error", 500, HTTPSTATUS_CODE.INTERNAL_ERROR);
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Connected to backend on port : ${process.env.PORT}`);
});