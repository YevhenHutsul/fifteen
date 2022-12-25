const containerNode = document.getElementById('fifteen');
const itemNodes = Array.from(document.querySelectorAll('.item'));
const blankNumber = 16;
itemNodes[blankNumber - 1].style.display = 'none';

//1. Position
let matrix = getMatrix(
    itemNodes.map(item => Number(item.dataset.matrixId))
)
setPostionItems(matrix)
//2. Shuffle
document.getElementById('shuffle').addEventListener('click', () => {
    const shuffleMatrix = shuffleArray(matrix.flat());
    matrix = getMatrix(shuffleMatrix);
    setPostionItems(matrix)
})

//3. Change position by click
containerNode.addEventListener('click', (event) => {
    const buttonNode = event.target.closest('button');
    const buttonNumber = Number(buttonNode.dataset.matrixId);

    const buttonCoords = findButtonCoord(buttonNumber, matrix);
    const blankCoords = findButtonCoord(blankNumber, matrix);
    const isValidMoove = isValidChange(buttonCoords, blankCoords)

    if (isValidMoove) {
        swap(buttonCoords, blankCoords, matrix);
        setPostionItems(matrix)
    }
})
//4. Change position by arrow
window.addEventListener('keydown', (event) => {
    if (!event.key.includes('Arrow')) {
        return
    }
    const blankCoords = findButtonCoord(blankNumber, matrix);
    const buttonCoords = {
        x: blankCoords.x,
        y: blankCoords.y
    }

    const direction = event.key.split('Arrow')[1].toLocaleLowerCase();

    switch (direction) {
        case 'up':
            buttonCoords.y += 1;
            break;
        case 'down':
            buttonCoords.y -= 1;
            break;
        case 'right':
            blankCoords.x -= 1;
            break;
        case 'left':
            blankCoords.x += 1;
            break;
    }
    if (buttonCoords.x < 0 || blankCoords.x > 4 || blankCoords.y < 0 || blankCoords > 4) {
        return;
    }

    swap(buttonCoords, blankCoords, matrix);
    setPostionItems(matrix)

})



//helpers
function getMatrix(arr) {
    const matrix = [[], [], [], []];
    let x = 0;
    let y = 0;

    for (let i = 0; i < arr.length; i++) {
        if (x >= 4) {
            y++;
            x = 0;
        }

        matrix[y][x] = arr[i];
        x++;
    }

    return matrix;
}

function setPostionItems(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = itemNodes[value - 1];
            setNodeStyle(node, x, y)
        }
    }
}

function setNodeStyle(node, x, y) {
    const shift = 100;
    node.style.transform = `translate3D(${x * shift}%, ${y * shift}%, 0)`
}

function shuffleArray(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

function findButtonCoord(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === number) {
                return { y, x }
            }
        }
    }
}

function isValidChange(coords1, coords2) {
    const diffX = Math.abs(coords1.x - coords2.x)
    const diffY = Math.abs(coords1.y - coords2.y)

    return ((diffX === 1 || diffY === 1) &&
        (coords1.x === coords2.x || coords1.y === coords2.y)
    )
}

function swap(coords1, coords2, matrix) {
    const saveNumber1 = matrix[coords1.y][coords1.x];
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
    matrix[coords2.y][coords2.x] = saveNumber1;

    if (isWon(matrix)) {
        addWonClasses();
    }
}


function isWon(matrix) {
    const flatMatrix = matrix.flat();
    const flatWonArray = new Array(16).fill(0).map((_, index) => index + 1);
    for (let i = 0; i < flatMatrix.length; i++) {
        if (flatMatrix[i] != flatWonArray[i]) {
            return false
        }
    }
    return true;
}

function addWonClasses() {
    setTimeout(() => {
        containerNode.classList.add('fifteenWon')
        setTimeout(() => {
            containerNode.classList.remove('fifteenWon')
        },1000)

    },200)
}