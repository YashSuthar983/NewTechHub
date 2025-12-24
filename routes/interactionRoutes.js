const express = require('express');
const router = express.Router();
const ArticleInteraction = require('../models/ArticleInteraction');
const authenticateToken = require('../middleware/auth');

// Get interactions
router.get('/interactions/:articleId', async (req, res) => {
    try {
        // Decode the articleId to match stored format
        const articleId = decodeURIComponent(req.params.articleId);
        console.log('GET interactions - articleId:', articleId.substring(0, 50) + '...');

        let interaction = await ArticleInteraction.findOne({ articleId });
        console.log('GET interactions - found:', interaction ? `upvotes: ${interaction.upvotes}` : 'null');

        if (!interaction) {
            interaction = { upvotes: 0 };
        }
        res.json({ upvotes: interaction.upvotes });
    } catch (error) {
        console.error('GET interactions error:', error);
        res.status(500).json({ error: 'Error fetching interactions' });
    }
});

// Upvote (Protected - one vote per user)
router.post('/upvotes', authenticateToken, async (req, res) => {
    try {
        // Decode the articleId to match stored format
        const articleId = decodeURIComponent(req.body.articleId);
        const username = req.user.username;

        console.log('POST upvote - articleId:', articleId.substring(0, 50) + '...');
        console.log('POST upvote - user:', username);

        let interaction = await ArticleInteraction.findOne({ articleId });

        if (!interaction) {
            interaction = new ArticleInteraction({ articleId, upvotes: 0, upvotedBy: [] });
        }

        // Check if user already upvoted
        if (interaction.upvotedBy && interaction.upvotedBy.includes(username)) {
            console.log('POST upvote - user already voted');
            return res.status(400).json({ error: 'Already upvoted', upvotes: interaction.upvotes });
        }

        // Add the upvote
        interaction.upvotes += 1;
        interaction.upvotedBy = interaction.upvotedBy || [];
        interaction.upvotedBy.push(username);
        await interaction.save();

        console.log('POST upvote - saved, upvotes now:', interaction.upvotes);
        res.json({ upvotes: interaction.upvotes });
    } catch (error) {
        console.error('POST upvote error:', error);
        res.status(500).json({ error: 'Error upvoting' });
    }
});

module.exports = router;
