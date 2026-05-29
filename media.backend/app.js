// External module
require("dotenv").config();
require('dns').setDefaultResultOrder('ipv4first');
const express = require('express')
const cors = require('cors');
const nodemailer = require("nodemailer");

const mongoose = require('mongoose');
const DB_PATH = process.env.MONGO_URL;

//core module
const path = require("path");

//Local Module
const rootDir = require('./utils/pathUtil');
const postsRouter = require('./routes/postsRouter');
const errorsController = require('./controllers/errors');

const app = express();

app.use((req, res, next) => {
    next();
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/posts', postsRouter);

app.use(errorsController.pageNotFound)

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
    console.log("Connected to Mongo")
    app.listen(PORT, () => {
        console.log(`Server running on address http://localhost:${PORT}`)
    });
}).catch(err => {
    console.log(process.env.MONGO_URL)
    console.log('Error while connecting to Mongoose', err)
})