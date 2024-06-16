export function createHook(canvas, blockWidth, blockHeight) {
    const hook = {
        x: canvas.width / 2, // Начальная позиция крюка по горизонтали
        y: 0, // Начальная позиция крюка по вертикали
        length: canvas.height/8, // Длина крюка
        width: blockWidth, // Ширина крюка
        height: blockHeight, // Высота крюка
        angle: 0, // Начальный угол наклона крюка
        speed: 0.02, // Скорость изменения угла
        maxAngle: 0.8, // Максимальный угол отклонения
        update: function() {
            this.angle += this.speed;
            if (this.angle > this.maxAngle || this.angle < -this.maxAngle) {
                this.speed = -this.speed; // Изменение направления движения
            }
        },
        getPosition: function() {
            const hookX = this.x + Math.sin(this.angle) * this.length;
            const hookY = this.y + Math.cos(this.angle) * this.length;
            return { hookX, hookY }; // Позиция конца крюка
        }
    };

    return hook;
}
