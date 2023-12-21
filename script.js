const boxes = document.querySelectorAll('.box')
const reset = document.querySelector('.reset')
const turn = document.querySelector('.turn')
const circle = document.querySelector('.circle')
const theme = document.querySelector('.color')
const btn = document.querySelector('.btn')
const heading = document.querySelector('.heading')

let box0 = true

boxes.forEach((box) => {

    box.addEventListener('click', () => {

        if (box0) {
            box.textContent = 'O'
            box.style.color = 'green'
            turn.textContent = 'Player  X turn'
            turn.style.color = 'red'
            box0 = false
        }
        else {
            box.textContent = 'X'
            box.style.color = 'red'
            turn.textContent = 'Player O turn'
            turn.style.color = 'green'
            box0 = true
        }

        box.disabled = true
        checkWinner()

    })

    // ..........Theme functionality..............


    theme.addEventListener('change', (e) => {
        let themeColor = e.target.value
        btn.style.backgroundColor = themeColor
        heading.style.color = themeColor
        box.style.borderColor = themeColor
        turn.style.color = themeColor
        circle.style.borderColor = themeColor
    })

    // ...................Reaset button ...............

    reset.addEventListener('click', () => {
        box.textContent = ''
        turn.textContent = "Game Reset, Let's Play"
        box.disabled = false
    })


    // ...................Winning Condition ................

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
                    turn.style.color = 'red';
                }

                boxes.forEach((box) => {
                    box.disabled = true
                })

                return;
            }
        }

        for (let box of boxes) {
            if (box.textContent) {
                filledBoxes++;
            }
        }

        if (filledBoxes === boxes.length) {
            turn.style.color = 'blue';
            turn.textContent = `It's a Draw! Reset game`;
        }
    };
})





