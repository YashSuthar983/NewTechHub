require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const interactionRoutes = require('./routes/interactionRoutes');
const Feedback = require('./models/Feedback');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api', interactionRoutes);

// Feedback endpoint
app.post('/api/feedback', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.json({ success: true, message: 'Feedback saved successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save feedback' });
    }
});

// File-based feedback saving (Alternative approach)
const fs = require('fs');
const path = require('path');

app.post('/api/feedback-file', (req, res) => {
    try {
        const { name, email, mobile, rating, message } = req.body;

        // Create formatted feedback entry
        const timestamp = new Date().toISOString();
        const feedbackEntry = `
========================================
Date: ${timestamp}
Name: ${name}
Email: ${email}
Mobile: ${mobile}
Rating: ${rating}/5
Message: ${message}
========================================

`;

        // Define file path
        const filePath = path.join(__dirname, 'feedback.txt');

        // Append to file
        fs.appendFile(filePath, feedbackEntry, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).json({
                    success: false,
                    error: 'Failed to save feedback to file'
                });
            }

            console.log('Feedback saved to file successfully');
            res.json({
                success: true,
                message: 'Feedback saved to file successfully!'
            });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Failed to save feedback'
        });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
