// comparison.js
export function calculateOverlap(block1, block2) {
    const overlapWidth = Math.min(block1.x + block1.width, block2.x + block2.width) - Math.max(block1.x, block2.x);
    const overlapPercentage = overlapWidth / block2.width;
    return overlapPercentage;
}

export function checkCollisionWithGround(block, canvasHeight) {
    return block.y + block.height >= canvasHeight;
}

export function checkCollisionWithBase(block, baseBlock, overlapThreshold, highOverlapThreshold) {
    const overlapPercentage = calculateOverlap(block, baseBlock);
    const collided = (
        block.y + block.height >= baseBlock.y &&
        overlapPercentage > overlapThreshold &&
        !baseBlock.isOccupied
    );

    return {
        collided,
        highOverlap: collided && overlapPercentage >= highOverlapThreshold,
        overlapPercentage // Возвращаем процент пересечения для вывода в консоль
    };
}

export function checkCollisionWithBlocks(block, blocks, overlapThreshold, highOverlapThreshold) {
    for (let existingBlock of blocks) {
        const overlapPercentage = calculateOverlap(block, existingBlock);

        if (
            !existingBlock.isOccupied &&
            block.y + block.height >= existingBlock.y &&
            overlapPercentage > overlapThreshold
        ) {
            block.y = existingBlock.y - block.height;
            existingBlock.isOccupied = true;
            return {
                collided: true,
                highOverlap: overlapPercentage >= highOverlapThreshold,
                overlapPercentage // Возвращаем процент пересечения для вывода в консоль
            };
        }
    }
    return { collided: false, highOverlap: false, overlapPercentage: 0 };
}
