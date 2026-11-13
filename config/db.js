const AppError = require("../utils/AppError");
const mongoose = require('mongoose');

async function connectDB() {

    try {

        if (!process.env.MONGO_URI) throw new AppError('No MongoURI available!');
        mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database.');

    } catch (err) {

        throw new AppError('Couldnt connect to the db.');
    }

}


module.exports = connectDB;