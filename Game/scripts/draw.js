import { bgHeight } from './main.js';

export function drawHook(ctx, bgImg, hookImg, hook, hookPos) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Очистка канваса

    if (bgHeight < ctx.canvas.height)
        ctx.drawImage(bgImg, 0, bgHeight, ctx.canvas.width, ctx.canvas.height); // Отрисовка фона

    ctx.beginPath();
    ctx.moveTo(hook.x, hook.y); // Начало линии крюка
    ctx.lineTo(hookPos.hookX, hookPos.hookY); // Конец линии крюка
    ctx.stroke();

    ctx.save();
    ctx.translate(hookPos.hookX, hookPos.hookY); // Перемещение системы координат к концу крюка
    ctx.drawImage(hookImg, -hook.width / 2, -15, hook.width, hook.height); // Отрисовка изображения крюка
    ctx.restore();
}

export function drawFallingBlock(ctx, bgImg, blockImg, block) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Очистка канваса

    if (bgHeight < ctx.canvas.height)
        ctx.drawImage(bgImg, 0, bgHeight, ctx.canvas.width, ctx.canvas.height); // Отрисовка фона

    ctx.drawImage(blockImg, block.x, block.y, block.width, block.height); // Отрисовка падающего блока
}

export function drawBlocks(ctx, blockImg, blockPerfImg, blocks) {
    for (let block of blocks) {
        if (block.perf) {
            ctx.drawImage(blockPerfImg, block.x, block.y, block.width, block.height); // Отрисовка всех идеальных блоков
        } else {
            ctx.drawImage(blockImg, block.x, block.y, block.width, block.height); // Отрисовка всех блоков
        }
    }
}

export function drawBaseBlock(ctx, baseImg, baseBlock) {
    ctx.drawImage(baseImg, baseBlock.x, baseBlock.y, baseBlock.width, baseBlock.height); // Отрисовка базового блока
}

export function drawMissAnimation(ctx, missImg, missedBlocks) {
    for (let block of missedBlocks) {
        if (block.miss) {
          console.log("misss")
            // Здесь логика для анимации спрайта
            // Например, если изображение missImg содержит несколько кадров анимации,
            // можно циклически переключать кадры для каждого блока
            // ctx.drawImage(missImg, sourceX, sourceY, sourceWidth, sourceHeight, block.x, block.y, block.width, block.height);
            // Анимация спрайтов, где sourceX и другие параметры зависят от текущего кадра
        }
    }
}
