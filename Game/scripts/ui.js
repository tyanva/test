// ui.js
export function drawCounter(ctx, count) {
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText(`Blocks: ${count}`, 10, 30);
    ctx.restore();
}
