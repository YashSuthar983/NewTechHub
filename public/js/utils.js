// Toast Notification System
export const Toast = {
    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        const container = document.getElementById('toastContainer');
        container.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    success(message) {
        this.show(message, 'success');
    },

    error(message) {
        this.show(message, 'error');
    },

    info(message) {
        this.show(message, 'info');
    }
};

// Share functionality
export async function shareArticle(article) {
    const shareData = {
        title: article.title,
        text: article.description || '',
        url: article.url
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            Toast.success('Article shared successfully!');
        } else {
            // Fallback: Copy to clipboard
            await navigator.clipboard.writeText(article.url);
            Toast.success('Link copied to clipboard!');
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            Toast.error('Failed to share article');
        }
    }
}

// Validation helpers
export const Validators = {
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    isValidUsername(username) {
        return username && username.length >= 3 && username.length <= 20;
    },

    isValidPassword(password) {
        return password && password.length >= 6;
    }
};

// Debounce helper
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format date helper
export function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
