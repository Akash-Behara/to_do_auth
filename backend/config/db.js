const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const connect = mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.log('ERR connecting DB', err);
        process.exit(1);
    }
}

module.exports = connectDB