let isDrawing = false;
let currentMode = 'draw'; // can be 'draw' or 'eraser'
let currentGridSize = 16;

const container = document.querySelector(".container");
const gridSizeInput = document.querySelector("#grid-size");
const createButton = document.querySelector('#create-button');
const drawButton = document.querySelector('#draw');
const eraserButton = document.querySelector('#eraser');
const resetButton = document.querySelector('#reset');

// Mouse state tracking
document.addEventListener('mousedown', () => isDrawing = true);
document.addEventListener('mouseup', () => isDrawing = false);

// Create grid
function makeGrid(size) {
    container.innerHTML = '';
    const squareSize = 100 / size;

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('square');
        div.style.flexBasis = `${squareSize}%`;
        div.style.aspectRatio = '1 / 1';
        div.style.backgroundColor = 'hsl(0, 0%, 100%)';
        div.dataset.shade = "0";

        function applyColor() {
            if (currentMode === 'draw') {
                let currentShade = parseInt(div.dataset.shade);
                if (currentShade < 10) {
                    currentShade++;
                    div.dataset.shade = currentShade;
                    const lightness = 100 - (currentShade * 10);
                    div.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
                }
            } else if (currentMode === 'eraser') {
                div.style.backgroundColor = 'hsl(0, 0%, 100%)';
                div.dataset.shade = "0";
            }
        }

        div.addEventListener('click', applyColor);
        div.addEventListener('mouseenter', () => {
            if (isDrawing) applyColor();
        });

        container.appendChild(div);
    }
}

// Generate grid from input
function generateGrid() {
    const size = parseInt(gridSizeInput.value);
    if (isNaN(size) || size < 1 || size > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
    }
    currentGridSize = size;
    makeGrid(size);
}

// Button event listeners
createButton.addEventListener('click', generateGrid);

gridSizeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        generateGrid();
    }
});

drawButton.addEventListener('click', () => {
    currentMode = 'draw';
});

eraserButton.addEventListener('click', () => {
    currentMode = 'eraser';
});

resetButton.addEventListener('click', () => {
    makeGrid(currentGridSize);
});

// Initial grid
makeGrid(currentGridSize);
