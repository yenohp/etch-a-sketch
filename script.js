const container = document.querySelector('.container');

for (let i = 0; i < 16; i++) {
    const outer = document.createElement('div');
    outer.classList.add('outer');
    container.appendChild(outer);
    for (let j = 0; j < 16; j++) {
        const inner = document.createElement('div');
        inner.classList.add('inner');
        inner.innerText = 1;
        outer.appendChild(inner);
    }
}

const inners = document.querySelectorAll('.inner');
for (let inner of inners) {
    inner.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = 'blue';
    })
}