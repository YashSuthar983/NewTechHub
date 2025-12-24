const mongoose = require('mongoose');

const connectDB = async () => {
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        }
    } else {
        console.warn('MONGODB_URI not provided. Database features will not work.');
    }
};

module.exports = connectDB;
