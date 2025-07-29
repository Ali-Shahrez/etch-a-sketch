const container = document.querySelector(".container")
const gridSize = 16
const totalSquares = gridSize*gridSize
for (let i = 0; i < totalSquares; i++) {
    const div = document.createElement('div');
    div.classList.add('square')
    container.appendChild(div)
}
