import { API } from './api.js';
import { Auth } from './auth.js';
import { Toast } from './utils.js';

export const UI = {
    elements: {
        newsGrid: document.getElementById('news-grid'),
        loadMoreBtn: document.getElementById('loadMoreBtn'),
        modal: document.getElementById('articleModal'),
        modalTitle: document.getElementById('modalTitle'),
        modalImage: document.getElementById('modalImage'),
        modalDescription: document.getElementById('modalDescription'),
        modalLink: document.getElementById('modalLink'),
        modalUpvoteBtn: document.getElementById('modalUpvoteBtn'),
        modalUpvoteCount: document.getElementById('modalUpvoteCount'),
        closeBtn: document.querySelector('.close-button'),
        authModal: document.getElementById('authModal')
    },

    currentArticle: null,

    init() {
        this.elements.closeBtn.onclick = () => this.closeModal();
        window.onclick = (event) => {
            if (event.target == this.elements.modal) this.closeModal();
            if (event.target == this.elements.authModal) this.elements.authModal.style.display = 'none';
        };

        this.elements.modalUpvoteBtn.onclick = () => this.handleUpvote();
    },

    renderNews(articles, append = false) {
        if (!append) this.elements.newsGrid.innerHTML = '';

        articles.forEach(article => {
            if (!article.title) return;
            const card = this.createCard(article);
            this.elements.newsGrid.appendChild(card);
        });

        if (articles.length > 0) {
            this.elements.loadMoreBtn.style.display = 'inline-block';
        } else {
            this.elements.loadMoreBtn.style.display = 'none';
        }
    },

    createCard(article) {
        const card = document.createElement('div');
        card.className = 'article-card';
        const upvoteBadge = article.upvotes > 0 ? `<div class="upvote-badge">🔥 ${article.upvotes}</div>` : '';

        card.innerHTML = `
            ${upvoteBadge}
            <img src="${article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${article.title}" class="article-image">
            <h2 class="article-title">${article.title}</h2>
            <div class="article-meta">By ${article.author || 'Unknown'} | ${new Date(article.publishedAt).toLocaleDateString()}</div>
            <p class="article-snippet">${article.description || ''}</p>
        `;

        card.addEventListener('click', () => this.openModal(article));
        return card;
    },

    async openModal(article) {
        this.currentArticle = article;
        this.elements.modalTitle.textContent = article.title;
        this.elements.modalImage.src = article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image';
        this.elements.modalDescription.textContent = article.content || article.description;
        this.elements.modalLink.href = article.url;
        this.elements.modalUpvoteCount.textContent = '...';
        this.elements.modal.style.display = 'block';

        const articleId = encodeURIComponent(article.url);
        const data = await API.fetchInteractions(articleId);
        this.elements.modalUpvoteCount.textContent = data.upvotes;
    },

    closeModal() {
        this.elements.modal.style.display = 'none';
    },

    async handleUpvote() {
        if (!Auth.isLoggedIn()) {
            Toast.info('Please login to upvote articles');
            this.elements.authModal.style.display = 'block';
            return;
        }
        if (!this.currentArticle) return;

        this.elements.modalUpvoteBtn.disabled = true;
        try {
            const data = await API.upvote(this.currentArticle, Auth.token);
            this.elements.modalUpvoteCount.textContent = data.upvotes;
            Toast.success('Upvoted! 👍');
        } catch (error) {
            if (error.message === 'Unauthorized') {
                Toast.error('Session expired. Please login again.');
                Auth.logout();
                this.elements.authModal.style.display = 'block';
            } else {
                Toast.error('Failed to upvote');
            }
        } finally {
            this.elements.modalUpvoteBtn.disabled = false;
        }
    },

    showLoading(append = false) {
        if (!append) {
            this.elements.newsGrid.innerHTML = '<div class="loading"><div class="spinner"></div>Loading news...</div>';
        } else {
            this.elements.loadMoreBtn.disabled = true;
            this.elements.loadMoreBtn.textContent = 'Loading...';
        }
    },

    hideLoading() {
        this.elements.loadMoreBtn.disabled = false;
        this.elements.loadMoreBtn.textContent = 'Load More Stories';
    },

    showError(message, append = false) {
        if (!append) {
            this.elements.newsGrid.innerHTML = `<div class="error-state"><h3>⚠️ Error</h3><p>${message}</p></div>`;
        }
        Toast.error(message);
    }
};
