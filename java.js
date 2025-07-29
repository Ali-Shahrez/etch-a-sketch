const container = document.querySelector(".container")

const gridSize = document.querySelector("#grid-size")
const createButton = document.querySelector('#create-button')

function makeGrid(size) {
    container.innerHTML = '';
    const squareSize=640/size
    for (let i=0; i<size*size; i++) {
        const div = document.createElement('div');
        div.classList.add('square')
        div.style.width = `${squareSize}px`
        div.style.height = `${squareSize}px`
        container.appendChild(div)
    }
}
function generateGrid() {
    const size = parseInt(gridSize.value);
    if (isNaN(size) || size<1 || size>100) {
        alert("Please enter a valid number between 1 and 100.")
        return;
    }
    makeGrid(size);
}

createButton.addEventListener('click', generateGrid)
gridSize.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        generateGrid();
    }
})

makeGrid(16)

