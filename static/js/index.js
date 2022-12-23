const containerNode = document.getElementById('fifteen');
const itemNodes = Array.from(document.querySelectorAll('.item'));
itemNodes[15].style.display = 'none';

//1. Position
let matrix = getMatrix(
    itemNodes.map(item => Number(item.dataset.matrixId))
)
setPostionItems(matrix)
//2. Shuffle
document.getElementById('shuffle').addEventListener('click', ()=>{
    const shuffleMatrix = shuffleArray(matrix.flat());
    matrix = getMatrix(shuffleMatrix);
    setPostionItems(matrix)
})

//3. Change position by click
//4. Change position by arrow
 


//helpers
function getMatrix(arr){
    const matrix = [[], [], [], []];
    let x = 0;
    let y = 0;

    for(let i = 0; i < arr.length; i++){
        if(x >= 4){
            y++;
            x = 0;
        }

        matrix[y][x] = arr[i];
        x++;
    }

    return matrix;
}

function setPostionItems(matrix){
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            const value = matrix[y][x];
            const node = itemNodes[value - 1];
            setNodeStyle(node, x,y)
        }
    }
}

function setNodeStyle(node, x, y){
    const shift = 100;
    node.style.transform = `translate3D(${x * shift}%, ${y * shift}%, 0)`
}

function shuffleArray(arr){
    return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
