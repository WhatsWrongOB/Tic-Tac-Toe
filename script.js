const boxes = document.querySelectorAll('.box')
const reset = document.querySelector('.reset')
const turn = document.querySelector('.turn')
const start = document.querySelector('.start')
const counter = document.querySelector('.counter')

let box0 = true

boxes.forEach((box) => {

    box.addEventListener('click', () => {

        if (box0) {
            box.textContent = 'O'
            box.style.color = 'green'
            turn.textContent = 'Player  X turn'
            box0 = false
        }
        else {
            box.textContent = 'X'
            box.style.color = 'blue'
            turn.textContent = 'Player O turn'
            box0 = true
        }

        box.disabled = true
        checkWinner()


    })

    let num = 0;
    let num2 = 0;
    let count;
    let gameStarted;

    start.addEventListener('click', () => {
        turn.textContent = "Game Started ! Let's Play"
        box.disabled = false
        count = setInterval(() => {
            counter.textContent = num++
        }, 1000);
        gameStarted = true

    })

    reset.addEventListener('click', () => {
        box.textContent = ''
        if (gameStarted) {
            turn.textContent = "Game Started ! Let's Play"
            box.disabled = false
            clearInterval(count);
            counter.textContent = 0
            setInterval(() => {
                counter.textContent = num2++
            }, 1000);
        }

    })


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
                    turn.textContent = `Congratulation O Wins!`;
                    turn.style.color = 'green';
                } else {
                    turn.textContent = `Congratulation X Wins!`;
                    turn.style.color = 'blue';
                }
                clearInterval(count);

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
            turn.textContent = `It's a Draw! Reset game`;
        }
    };
})





