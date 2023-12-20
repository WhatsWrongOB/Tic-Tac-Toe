const boxes = document.querySelectorAll('.box')
const winner = document.querySelector('.winner')
const reset = document.querySelector('.reset')


let winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const checkWinner = () => {
    let filledBoxes = 0;

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[b].textContent === boxes[c].textContent) {

            if (boxes[a].textContent === 'O') {
                winner.textContent = `Congratulation O Wins!`;
                winner.style.color = 'green';
            } else {
                winner.textContent = `Congratulation X Wins!`;
                winner.style.color = 'blue';
            }

            boxes.forEach((box) => {
                box.disabled = true;
            });

            return;
        }
    }

    for (let box of boxes) {
        if (box.textContent) {
            filledBoxes++;
        }
    }

    if (filledBoxes === boxes.length) {
        winner.textContent = `It's a Draw! Please reset game`;
        winner.style.color = 'orange';
    }
};


let box0 = true

boxes.forEach((box) => {

    box.addEventListener('click', () => {

        if (box0) {
            box.textContent = 'O'
            box.style.color = 'green'
            box0 = false
        }
        else {
            box.textContent = 'X'
            box.style.color = 'blue'
            box0 = true
        }
        box.disabled = true
        checkWinner()
    })

    reset.addEventListener('click', () => {
        box.textContent = ''
        winner.textContent = ''
        box.disabled = false

    })
})



