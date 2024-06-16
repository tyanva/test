export function clickEvent(canvas, onClick) {
    canvas.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;

        // Условие проверки координат касания внутри заданной области
        if (x >= 0 && x <= 500 && y >= 50 && y <= 500) {
            onClick(); // Вызов функции клика
        }
    });

    canvas.addEventListener('click', function(e) {
        const x = e.clientX;
        const y = e.clientY;

        // Условие проверки координат клика внутри области канваса
        if (x >= 0 && x <= canvas.width && y >= 50 && y <= canvas.height) {
            onClick(); // Вызов функции клика
        }
    });
}
