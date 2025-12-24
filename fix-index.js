// Quick script to drop the problematic email index
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const db = mongoose.connection.db;
        const collection = db.collection('users');

        try {
            await collection.dropIndex('email_1');
            console.log('✅ Successfully dropped email_1 index');
        } catch (error) {
            console.log('Error dropping index:', error.message);
        }

        // List current indexes
        const indexes = await collection.indexes();
        console.log('Current indexes:', indexes);

        mongoose.connection.close();
        process.exit(0);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
