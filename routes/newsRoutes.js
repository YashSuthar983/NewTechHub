const express = require('express');
const router = express.Router();
const axios = require('axios');
const ArticleInteraction = require('../models/ArticleInteraction');

router.get('/', async (req, res) => {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'News API key not configured' });
    }
    try {
        let { q, country, category, page = 1, timeRange, sortBy } = req.query;

        // Sanitize inputs
        q = q && q.trim() !== '' && q !== 'undefined' ? q.trim() : null;
        country = country && country.trim() !== '' && country !== 'undefined' ? country.trim() : null;
        category = category && category.trim() !== '' && category !== 'undefined' ? category.trim() : null;
        timeRange = timeRange && timeRange !== 'undefined' ? timeRange : null;
        sortBy = sortBy && sortBy !== 'undefined' ? sortBy : null;

        console.log(`News Request - q: ${q}, country: ${country}, category: ${category}, time: ${timeRange}, sort: ${sortBy}, page: ${page}`);

        let url = '';
        let params = [];

        // Determine Endpoint
        const useEverything = !!timeRange || (sortBy && sortBy !== 'publishedAt') || (q && !country && !category);

        if (useEverything) {
            url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&page=${page}`;

            if (!q) {
                if (category === 'technology') {
                    params.push('q=technology OR AI OR startup OR coding');
                } else {
                    params.push('q=technology OR AI OR startup');
                }
            } else {
                params.push(`q=${encodeURIComponent(q)}`);
            }

            if (timeRange) {
                const now = new Date();
                let fromDate = new Date();

                if (timeRange === 'today') {
                    fromDate.setDate(now.getDate());
                } else if (timeRange === 'week') {
                    fromDate.setDate(now.getDate() - 7);
                } else if (timeRange === 'month') {
                    fromDate.setMonth(now.getMonth() - 1);
                }
                const fromStr = fromDate.toISOString().split('T')[0];
                params.push(`from=${fromStr}`);
            }

            if (sortBy === 'publishedAt') {
                params.push('sortBy=publishedAt');
            } else {
                params.push('sortBy=publishedAt');
            }

        } else {
            url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&page=${page}`;
            if (q) params.push(`q=${encodeURIComponent(q)}`);
            if (country) params.push(`country=${encodeURIComponent(country)}`);
            if (category) params.push(`category=${encodeURIComponent(category)}`);

            if (!q && !country && !category) {
                params.push('category=technology');
                params.push('country=us');
            }
        }

        const finalUrl = `${url}&${params.join('&')}`;
        console.log('Fetching from NewsAPI:', finalUrl.replace(apiKey, 'API_KEY_HIDDEN'));

        const response = await axios.get(finalUrl);
        let articles = response.data.articles || [];

        // Upvote Merging
        const articleIds = articles.map(a => a.url);
        const interactions = await ArticleInteraction.find({ articleId: { $in: articleIds } });

        const upvoteMap = {};
        interactions.forEach(i => {
            upvoteMap[i.articleId] = i.upvotes;
        });

        articles = articles.map(article => ({
            ...article,
            upvotes: upvoteMap[article.url] || 0
        }));

        if (sortBy === 'upvotes') {
            articles.sort((a, b) => b.upvotes - a.upvotes);
        }

        res.json({
            status: response.data.status,
            totalResults: response.data.totalResults,
            articles: articles
        });

    } catch (error) {
        console.error('Error fetching news:', error.response ? error.response.data : error.message);
        let errorMsg = 'Failed to fetch news';
        if (error.response?.data?.message) errorMsg = error.response.data.message;
        res.status(error.response?.status || 500).json({ error: errorMsg });
    }
});

module.exports = router;
