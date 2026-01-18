// Toggle visibility script
// Adds ability to hide/show sections
function initToggle() {
    const toggleBtns = document.querySelectorAll('[data-toggle]');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const target = document.querySelector(this.dataset.toggle);
            if (target) {
                target.style.display = target.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initToggle);
