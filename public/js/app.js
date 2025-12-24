import { API } from './api.js';
import { Auth } from './auth.js';
import { UI } from './ui.js';
import { Toast } from './utils.js';

const App = {
    state: {
        page: 1,
        query: '',
        country: 'us',
        category: '',
        timeRange: '',
        sortBy: 'publishedAt'
    },

    init() {
        Auth.init();
        UI.init();
        this.setupEventListeners();
        this.fetchNews();
    },

    setupEventListeners() {
        // Navigation
        document.getElementById('navHome').onclick = (e) => {
            e.preventDefault();
            this.setCategory('', 'navHome');
        };
        document.getElementById('navTech').onclick = (e) => {
            e.preventDefault();
            this.setCategory('technology', 'navTech');
        };

        // Search & Filter
        document.getElementById('searchBtn').onclick = () => this.handleSearch();
        document.getElementById('searchInput').onkeypress = (e) => {
            if (e.key === 'Enter') this.handleSearch();
        };
        document.getElementById('timeRange').onchange = (e) => {
            this.state.timeRange = e.target.value;
            this.fetchNews();
        };
        document.getElementById('sortBy').onchange = (e) => {
            this.state.sortBy = e.target.value;
            this.fetchNews();
        };

        // Load More
        document.getElementById('loadMoreBtn').onclick = () => {
            this.state.page++;
            this.fetchNews(true);
        };

        // Auth Form
        this.setupAuthForm();
    },

    setCategory(category, navId) {
        this.state.category = category;
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        document.getElementById(navId).classList.add('active');
        this.fetchNews();
    },

    handleSearch() {
        this.state.query = document.getElementById('searchInput').value.trim();
        this.state.timeRange = document.getElementById('timeRange').value;
        this.state.sortBy = document.getElementById('sortBy').value;
        this.fetchNews();
    },

    async fetchNews(append = false) {
        if (!append) {
            this.state.page = 1;
            UI.showLoading();
        } else {
            UI.showLoading(true);
        }

        try {
            const data = await API.fetchNews({
                q: this.state.query,
                country: this.state.country,
                category: this.state.category,
                timeRange: this.state.timeRange,
                sortBy: this.state.sortBy,
                page: this.state.page
            });

            UI.renderNews(data.articles || [], append);
            if (append) Toast.success(`Loaded ${data.articles.length} more articles`);
        } catch (error) {
            UI.showError(error.message, append);
        } finally {
            UI.hideLoading();
        }
    },

    setupAuthForm() {
        const form = document.getElementById('authForm');
        const switchLink = document.getElementById('authSwitchLink');
        let isLoginMode = true;

        const toggleMode = () => {
            isLoginMode = !isLoginMode;
            document.getElementById('authTitle').textContent = isLoginMode ? 'Login' : 'Register';
            document.getElementById('authSubmitBtn').textContent = isLoginMode ? 'Login' : 'Register';
            document.getElementById('authSwitchText').innerHTML = isLoginMode
                ? 'Don\'t have an account? <a href="#" id="authSwitchLink">Register here</a>'
                : 'Already have an account? <a href="#" id="authSwitchLink">Login here</a>';
            document.getElementById('authSwitchLink').onclick = (e) => {
                e.preventDefault();
                toggleMode();
            };
        };

        switchLink.onclick = (e) => {
            e.preventDefault();
            toggleMode();
        };

        form.onsubmit = async (e) => {
            e.preventDefault();
            const username = document.getElementById('usernameInput').value.trim();
            const password = document.getElementById('passwordInput').value;
            const errorEl = document.getElementById('authError');

            try {
                let data;
                if (isLoginMode) {
                    data = await API.login(username, password);
                    Auth.login(data.token, data.username);
                    document.getElementById('authModal').style.display = 'none';
                    Toast.success(`Welcome back, ${data.username}!`);
                } else {
                    await API.register(username, password);
                    Toast.success('Registration successful! Please login.');
                    toggleMode();
                }
                errorEl.textContent = '';
            } catch (error) {
                errorEl.textContent = error.message;
                errorEl.style.color = 'red';
            }
        };
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
