const body = document.querySelector('body');
const resetBttn = document.querySelector('.reset');

const randomBttn = document.querySelector('.random');
const gridSelector = document.querySelector('#gridSize');
const sizeContainer = document.querySelector('.sizeContainer');
const h4 = document.querySelector('h4');
let gridSize = gridSelector.value;
let divCount = gridSize; //default amount

const container = document.querySelector('.container');
let outers = document.querySelectorAll('.outer');
let inners = document.querySelectorAll('.inner');
// Create grid of divs
function makeGrid(divCount) {

    for (let i = 0; i < divCount; i++) {
        const outer = document.createElement('div');
        outer.classList.add('outer');
        container.appendChild(outer);
        for (let j = 0; j < divCount; j++) {
            const inner = document.createElement('div');
            inner.classList.add('inner');
            outer.appendChild(inner);
        }
    }
    outers = document.querySelectorAll('.outer');
    inners = document.querySelectorAll('.inner');
    // Change background on mouseover
    for (let inner of inners) {
        inner.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = randomColor();
        })
    }
}

function deleteGrid(outers) {
    // See if there are any nodes
    if (!container.childElementCount) return;
    for (let outer of outers) {
        container.removeChild(outer);

    }
}

function randomColor() {
    // Random HSL value -- script that decreases L by 10% each time
    // h: 0-360
    let h = Math.floor(Math.random() * 360);
    // s: 0-100%
    let s = `${Math.floor(Math.random() * 100)}%`;
    // l: 0
    let l = `${50}%`;

    return `hsl(${h},${s},${l})`;
}
//Function call by default
makeGrid(divCount);




// Reset color and change number of squares
resetBttn.addEventListener('click', () => {

    if (divCount > 64) divCount = 64;
    else if (divCount < 0) divCount = 1;
    deleteGrid(outers);
    makeGrid(divCount);

})

// Show change in values in real time
// Change divs in real time
gridSelector.addEventListener('change', (e) => {
    let gridSize = e.target.value;
    h4.innerText = `${gridSize} x ${gridSize}`;
})