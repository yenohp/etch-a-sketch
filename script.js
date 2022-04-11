const body = document.querySelector('body');
const resetBttn = document.querySelector('button');
let divCount = 16; //default amount

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
            inner.innerText = 1;
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
    for (let inner of inners) {
        inner.style.backgroundColor = 'white';
    }
    divCount = parseInt(prompt('How many squares?'));
    if (divCount > 30) divCount = 30;
    else if (divCount < 0) divCount = 1;
    deleteGrid(outers);
    makeGrid(divCount);

})