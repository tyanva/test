import { drawHook, drawFallingBlock, drawBlocks, drawBaseBlock } from './draw.js';
import { clickEvent } from './click.js';
import { createHook } from './hook.js';
import { checkCollisionWithGround, checkCollisionWithBase, checkCollisionWithBlocks } from './comparison.js';
import { drawCounter } from './ui.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;
var ratio = 1.7;

if (gameWidth / gameHeight < ratio) {
    gameWidth = Math.ceil(gameHeight / ratio);
    canvas.width = gameWidth;
    canvas.height = gameHeight;
}

function resizeCanvas() {
    canvas.width = gameWidth;
    canvas.height = gameHeight;
}
window.addEventListener('resize', resizeCanvas);

var bgImg = new Image();
bgImg.src = "./assets/background.png";
export var bgHeight = 100; // Высота фона

// Настройки игры
const blockWidth = 100;
const blockHeight = 80; // Высота блока 80
const blockSpeed = 5; // Скорость падения блока
const overlapThreshold = 0.4; // Процент пересечения кубов 
const highOverlapThreshold = 0.85; // Процент высокого совпадения 
const swingAmplitude = 15; // Амплитуда покачивания
const swingSpeed = 0.05; // Скорость покачивания

var blockImgDefault = new Image();
blockImgDefault.src = "./assets/block.png";

var baseImg = new Image();
baseImg.src = "./assets/block-perfect.png";

const hook = createHook(canvas, blockWidth, blockHeight); // Создание крюка
let fallingBlock = null; // Падающий блок
let blocks = []; // Массив блоков
let placedBlocksCount = 0; // Счетчик установленных блоков
let swingAngle = 0; // Текущий угол отклонения
let swingDirection = 1; // Направление покачивания

const baseBlock = {
    x: (canvas.width - 120) / 2, // Позиция базового блока по горизонтали, ширина 120
    y: canvas.height - 100, // Позиция базового блока по вертикали, высота 100
    width: 120,
    height: 100,
    isOccupied: false // Занятость базового блока
};

function lowerBlocks() {
    blocks.forEach(block => block.y += blockHeight);
    baseBlock.y += blockHeight;
    bgHeight += blockHeight;
    blocks = blocks.filter(block => block.y < canvas.height);
}

function swingBlocks() {
    if (placedBlocksCount >= 4) {
        swingAngle += swingSpeed * swingDirection;
        if (swingAngle > swingAmplitude || swingAngle < -swingAmplitude) {
            swingDirection *= -1;
        }

        blocks.forEach(block => {
            block.x += swingSpeed * swingDirection;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка канваса

        if (!fallingBlock) {
            hook.update();
            const hookPos = hook.getPosition();
            drawHook(ctx, bgImg, blockImgDefault, hook, hookPos);
        } else {
            drawFallingBlock(ctx, bgImg, blockImgDefault, fallingBlock);
            fallingBlock.y += fallingBlock.speed;

            let landed = false; // Переменная для проверки приземления блока
            let highOverlap = false; // Переменная для проверки высокого совпадения

            // Проверка приземления на базовый блок
            const baseCollision = checkCollisionWithBase(fallingBlock, baseBlock, overlapThreshold, highOverlapThreshold);
            if (baseCollision.collided) {
                console.log(`Base Collision Overlap: ${baseCollision.overlapPercentage * 100}%`); // Вывод в консоль
                fallingBlock.y = baseBlock.y - fallingBlock.height;
                baseBlock.isOccupied = true;
                landed = true;
                highOverlap = baseCollision.highOverlap;
            } else {
                // Проверка приземления на другие блоки
                const collisionResult = checkCollisionWithBlocks(fallingBlock, blocks, overlapThreshold, highOverlapThreshold);
                if (collisionResult.collided) {
                    console.log(`Block Collision Overlap: ${collisionResult.overlapPercentage * 100}%`); // Вывод в консоль
                    highOverlap = collisionResult.highOverlap;
                    landed = true;
                }
            }

            // Проверка, если блок упал на землю
            if (checkCollisionWithGround(fallingBlock, canvas.height)) {
                landed = true;
            }

            if (landed) {
                if (fallingBlock.y + fallingBlock.height < canvas.height) {
                    fallingBlock.perf = highOverlap;
                    blocks.push(fallingBlock); // Добавление блока в массив блоков, если он не упал на землю
                    placedBlocksCount++; // Увеличение счетчика установленных блоков
                    if (placedBlocksCount >= 2) {
                        lowerBlocks(); // Опустить все блоки, базовый блок и фон
                    }
                }
                fallingBlock = null; // Сброс падающего блока
            }
        }

        swingBlocks(); // Покачивание блоков
        drawBaseBlock(ctx, baseImg, baseBlock); // Отрисовка базового блока
        drawBlocks(ctx, blockImgDefault, baseImg, blocks); // Отрисовка всех блоков
        drawCounter(ctx, placedBlocksCount); // Отрисовка счетчика блоков
        requestAnimationFrame(gameLoop); // Запуск игрового цикла
    }

    gameLoop();
    
    clickEvent(canvas, () => {
        if (!fallingBlock) {
            const hookPos = hook.getPosition();
            fallingBlock = {
                x: hookPos.hookX - blockWidth / 2, // Начальная позиция блока
                y: hookPos.hookY,
                width: blockWidth,
                height: blockHeight,
                speed: blockSpeed, // Скорость падения блока
                isOccupied: false, // Занятость блока
                perf: false // Флаг для идеального совпадения
            };
        }
    });
});
