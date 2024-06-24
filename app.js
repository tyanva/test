document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const buttons = document.querySelectorAll('.nav-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadPage(button.id.split('-')[0]);
        });
    });

    // Load default page
    loadPage('build');
});

function loadPage(page) {
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}
