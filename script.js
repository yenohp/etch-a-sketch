const body = document.querySelector('body');
const resetBttn = document.querySelector('.reset');
const gridSelector = document.querySelector('#gridSize');
const sizeContainer = document.querySelector('.sizeContainer');
const h4 = document.querySelector('h4');
let gridSize = gridSelector.value;

const container = document.querySelector('.container');
let outers = document.querySelectorAll('.outer');
let inners = document.querySelectorAll('.inner');

// Returns array hsl
const RGBToHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
};

// Create grid of divs
function makeGrid(divCount = 51) { //default value = 51
    h4.innerText = `${gridSize} x ${gridSize}`;
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
        let counter = 1; // represents increment by 10% (`${counter * 10}%` is the l value)
        let r, g, b, h, s, l;
        inner.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = randomColor();
            // Turn background color value into individual variables
            let stringRGB = e.target.style.backgroundColor;
            rgbArr = stringRGB.substring(4, stringRGB.length - 1).replace(/ /g, '').split(',');
            let map1 = rgbArr.map(x => parseInt(x));
            [r, g, b] = map1;

            // TURN RGB into HSL
            [h, s, l] = RGBToHSL(r, g, b);
            // Set background to black after 10 mouseover's
            inner.style.backgroundColor = `hsl(${h},${s}%,${l - (counter * 5)}%)`;

            counter++;
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
makeGrid();




// Reset color and change number of squares
resetBttn.addEventListener('click', () => {
    deleteGrid(outers);
    makeGrid(gridSize); //condition not needed because limited range provided.
})

// Show change in values in real time
// Change divs in real time
gridSelector.addEventListener('change', (e) => {
    gridSize = e.target.value;
})