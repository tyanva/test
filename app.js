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
            setupCanvas(); // Добавим эту строку, чтобы инициализировать канвас при загрузке страницы
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

// Под вопросм : Этот код предотвращает прокрутку, 
// когда одновременно задействовано более одного пальца, что 
// может помочь предотвратить горизонтальную прокрутку из-за панорамирования.
document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

//setting
document.getElementById('settingsButton').addEventListener('click', function() {
    document.getElementById('settingsOverlay').classList.remove('hidden');
});

document.getElementById('settingsCloseButton').addEventListener('click', function() {
    document.getElementById('settingsOverlay').classList.add('hidden');
});

function setupCanvas() {
    const canvasContainer = document.getElementById('canvasContainer');
    if (!canvasContainer) return;

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.className = 'cellArea';
        cell.addEventListener('click', function() {
            selectedCell = cell;
            document.getElementById('popup').classList.add('active');
            document.getElementById('overlay').classList.add('active');
        });
        canvasContainer.appendChild(cell);
    }

    document.getElementById('overlay').addEventListener('click', function() {
        document.getElementById('popup').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    });

    document.getElementById('startBuildButton').addEventListener('click', function() {
        if (selectedCell) {
            selectedCell.classList.add('building');
        }
        document.getElementById('popup').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    });
}
