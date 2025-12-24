import { Toast } from './utils.js';

export const API = {
    async fetchNews(params) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`/api/news?${queryString}`);
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to fetch news');
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            Toast.error(error.message);
            throw error;
        }
    },

    async fetchInteractions(articleId) {
        try {
            const response = await fetch(`/api/interactions/${articleId}`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return { upvotes: 0 };
        }
    },

    async login(username, password) {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Login failed');
        return data;
    },

    async register(username, password) {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Registration failed');
        return data;
    },

    async upvote(article, token) {
        const articleId = encodeURIComponent(article.url);
        const response = await fetch('/api/upvotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ articleId })
        });

        if (response.status === 401 || response.status === 403) {
            throw new Error('Unauthorized');
        }

        if (!response.ok) throw new Error('Failed to upvote');
        return await response.json();
    }
};
