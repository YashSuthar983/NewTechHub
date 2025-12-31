document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration & State ---
    const state = {
        page: 1,
        query: '',
        country: 'us',
        category: '',
        timeRange: '',
        sortBy: 'publishedAt',
        user: localStorage.getItem('username')
    };

    // --- DOM Elements ---
    const els = {
        newsGrid: document.getElementById('news-grid'),
        loadMoreBtn: document.getElementById('loadMoreBtn'),
        searchInput: document.getElementById('searchInput'),
        searchBtn: document.getElementById('searchBtn'),
        timeRange: document.getElementById('timeRange'),
        navHome: document.getElementById('navHome'),
        navTech: document.getElementById('navTech'),
        authBtn: document.getElementById('authBtn'),
        userDisplay: document.getElementById('userDisplay'),
        authModal: document.getElementById('authModal'),
        authForm: document.getElementById('authForm'),
        authTitle: document.getElementById('authTitle'),
        authSubmitBtn: document.getElementById('authSubmitBtn'),
        authSwitchLink: document.getElementById('authSwitchLink'),
        authSwitchText: document.getElementById('authSwitchText'),
        authError: document.getElementById('authError'),
        modal: document.getElementById('articleModal'),
        modalTitle: document.getElementById('modalTitle'),
        modalImage: document.getElementById('modalImage'),
        modalDescription: document.getElementById('modalDescription'),
        modalLink: document.getElementById('modalLink'),
        modalUpvoteBtn: document.getElementById('modalUpvoteBtn'),
        modalUpvoteCount: document.getElementById('modalUpvoteCount'),
        closeBtn: document.querySelector('.close-button'),
        authClose: document.querySelector('.auth-close'),
        toastContainer: document.getElementById('toastContainer')
    };

    // --- Utils ---
    const Toast = {
        show(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            els.toastContainer.appendChild(toast);
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        },
        success(msg) { this.show(msg, 'success'); },
        error(msg) { this.show(msg, 'error'); },
        info(msg) { this.show(msg, 'info'); }
    };

    // --- Auth Logic ---
    function updateAuthUI() {
        if (state.user) {
            els.userDisplay.textContent = `Welcome, ${state.user}`;
            els.userDisplay.style.display = 'inline';
            els.authBtn.textContent = 'Logout';
        } else {
            els.userDisplay.style.display = 'none';
            els.authBtn.textContent = 'Login / Register';
        }
    }

    els.authBtn.onclick = () => {
        if (state.user) {
            localStorage.removeItem('username');
            state.user = null;
            updateAuthUI();
            Toast.info('Logged out');
        } else {
            els.authModal.style.display = 'block';
        }
    };

    let isLoginMode = true;
    function toggleAuthMode() {
        isLoginMode = !isLoginMode;
        els.authTitle.textContent = isLoginMode ? 'Login' : 'Register';
        els.authSubmitBtn.textContent = isLoginMode ? 'Login' : 'Register';
        els.authSwitchText.innerHTML = isLoginMode
            ? 'Don\'t have an account? <a href="#" id="switchLink">Register here</a>'
            : 'Already have an account? <a href="#" id="switchLink">Login here</a>';
        document.getElementById('switchLink').onclick = (e) => {
            e.preventDefault();
            toggleAuthMode();
        };
    }

    els.authSwitchLink.onclick = (e) => {
        e.preventDefault();
        toggleAuthMode();
    };

    els.authForm.onsubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById('usernameInput').value.trim();
        const password = document.getElementById('passwordInput').value;
        const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok) {
                if (isLoginMode) {
                    state.user = data.username;
                    localStorage.setItem('username', data.username);
                    updateAuthUI();
                    els.authModal.style.display = 'none';
                    Toast.success(`Welcome, ${data.username}`);
                } else {
                    Toast.success('Registered! Please login.');
                    toggleAuthMode();
                }
                els.authError.textContent = '';
            } else {
                els.authError.textContent = data.error || 'Auth failed';
            }
        } catch (err) {
            els.authError.textContent = 'Network error';
        }
    };

    // --- News Logic ---
    async function fetchNews(append = false) {
        if (!append) {
            state.page = 1;
            els.newsGrid.innerHTML = '<div class="loading"><div class="spinner"></div>Loading...</div>';
        } else {
            els.loadMoreBtn.textContent = 'Loading...';
            els.loadMoreBtn.disabled = true;
        }

        const params = new URLSearchParams({
            page: state.page,
            q: state.query,
            country: state.country,
            category: state.category,
            timeRange: state.timeRange,
            sortBy: state.sortBy
        });

        try {
            const res = await fetch(`/api/news?${params}`);
            const data = await res.json();

            if (!append) els.newsGrid.innerHTML = '';

            if (data.articles && data.articles.length > 0) {
                renderNews(data.articles);
                els.loadMoreBtn.style.display = 'inline-block';
                if (append) Toast.success(`Loaded ${data.articles.length} more`);
            } else {
                if (!append) els.newsGrid.innerHTML = '<div class="empty-state">No news found</div>';
                els.loadMoreBtn.style.display = 'none';
            }
        } catch (err) {
            console.error(err);
            if (!append) els.newsGrid.innerHTML = '<div class="error-state">Error loading news</div>';
            Toast.error('Failed to load news');
        } finally {
            els.loadMoreBtn.textContent = 'Load More Stories';
            els.loadMoreBtn.disabled = false;
        }
    }

    function renderNews(articles) {
        articles.forEach(article => {
            if (!article.title) return;
            const card = document.createElement('div');
            card.className = 'article-card';
            const upvoteBadge = article.upvotes > 0 ? `<div class="upvote-badge">🔥 ${article.upvotes}</div>` : '';

            card.innerHTML = `
                ${upvoteBadge}
                <img src="${article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'}" class="article-image">
                <h2 class="article-title">${article.title}</h2>
                <div class="article-meta">${new Date(article.publishedAt).toLocaleDateString()}</div>
                <p class="article-snippet">${article.description || ''}</p>
            `;
            card.onclick = () => openModal(article);
            els.newsGrid.appendChild(card);
        });
    }

    // --- Interaction Logic ---
    let currentArticle = null;
    async function openModal(article) {
        currentArticle = article;
        els.modalTitle.textContent = article.title;
        els.modalImage.src = article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image';
        els.modalDescription.textContent = article.content || article.description;
        els.modalLink.href = article.url;
        els.modalUpvoteCount.textContent = '...';
        els.modal.style.display = 'block';

        const res = await fetch(`/api/interactions/${encodeURIComponent(article.url)}`);
        const data = await res.json();
        els.modalUpvoteCount.textContent = data.upvotes;
    }

    els.modalUpvoteBtn.onclick = async () => {
        if (!state.user) {
            Toast.info('Login to upvote');
            els.authModal.style.display = 'block';
            return;
        }
        els.modalUpvoteBtn.disabled = true;
        try {
            const res = await fetch('/api/upvotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Username': state.user
                },
                body: JSON.stringify({ articleId: encodeURIComponent(currentArticle.url) })
            });
            if (res.status === 401) {
                Toast.error('Please login again');
                state.user = null;
                localStorage.removeItem('username');
                updateAuthUI();
                return;
            }
            const data = await res.json();

            if (data.error) {
                Toast.error(data.error);
            } else {
                els.modalUpvoteCount.textContent = data.upvotes;

                // Update the article object so upvote count persists
                if (currentArticle) {
                    currentArticle.upvotes = data.upvotes;
                }

                Toast.success('Upvoted!');
            }
        } catch (err) {
            Toast.error('Failed to upvote');
        } finally {
            els.modalUpvoteBtn.disabled = false;
        }
    };

    // --- Event Listeners ---
    els.searchBtn.onclick = () => {
        state.query = els.searchInput.value.trim();
        state.timeRange = els.timeRange.value;
        fetchNews();
    };

    els.searchInput.onkeypress = (e) => {
        if (e.key === 'Enter') els.searchBtn.click();
    };

    els.timeRange.onchange = () => els.searchBtn.click();

    els.navHome.onclick = (e) => {
        e.preventDefault();
        state.category = '';
        els.navHome.classList.add('active');
        els.navTech.classList.remove('active');
        fetchNews();
    };

    els.navTech.onclick = (e) => {
        e.preventDefault();
        state.category = 'technology';
        els.navTech.classList.add('active');
        els.navHome.classList.remove('active');
        fetchNews();
    };

    els.loadMoreBtn.onclick = () => {
        state.page++;
        fetchNews(true);
    };

    els.closeBtn.onclick = () => els.modal.style.display = 'none';
    els.authClose.onclick = () => els.authModal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target == els.modal) els.modal.style.display = 'none';
        if (e.target == els.authModal) els.authModal.style.display = 'none';
    };

    // --- Init ---
    updateAuthUI();
    fetchNews();
});
