document.addEventListener('DOMContentLoaded', () => {
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

let selectedCell = null;

function setupTopNav() {
    const topNavButtons = document.querySelectorAll('.top-nav-btn');
    topNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            topNavButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadTabContent(button.id.split('-')[0]);
        });
    });

    // Load default tab content
    if (topNavButtons.length > 0) {
        loadTabContent(topNavButtons[0].id.split('-')[0]);
    }
}

function loadPage(page) {
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            setupTopNav();
            if (page === 'build') {
                initializeCanvas();
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

function loadTabContent(tab) {
    fetch(`sub-${tab}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('tab-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading tab content:', error);
        });
}

// Prevent scroll with multiple touch points
document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// Settings button functionality
document.getElementById('settingsButton').addEventListener('click', function() {
    document.getElementById('settingsOverlay').classList.remove('hidden');
});

document.getElementById('settingsCloseButton').addEventListener('click', function() {
    document.getElementById('settingsOverlay').classList.add('hidden');
});

function initializeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const cellImage = new Image();
    const buildingImage = new Image();
    cellImage.src = './assets/cell.png';
    buildingImage.src = './assets/building.png';

    const cellSize = 100;
    const gridSize = 5;

    canvas.width = cellSize * gridSize;
    canvas.height = cellSize * gridSize;

    cellImage.onload = () => {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                ctx.drawImage(cellImage, col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    };

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);

        const popup = document.getElementById('popup');
        popup.style.display = 'block';

        const buildButton = document.getElementById('buildButton');
        buildButton.onclick = () => {
            window.location.href = './Game/index.html';
        };

        const freeButton = document.getElementById('freeButton');
        freeButton.onclick = () => {
            ctx.drawImage(buildingImage, col * cellSize, row * cellSize, cellSize, cellSize);
            popup.style.display = 'none';
        };

        // Close popup on outside click
        window.addEventListener('click', (e) => {
            if (e.target == popup) {
                popup.style.display = 'none';
            }
        });

        // Close popup with close button
        const closePopup = document.getElementById('closePopup');
        closePopup.onclick = () => {
            popup.style.display = 'none';
        };
    });
}
