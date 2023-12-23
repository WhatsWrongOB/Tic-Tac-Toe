const boxes = document.querySelectorAll('.box')
const reset = document.querySelector('.reset')
const turn = document.querySelector('.turn')
const circle = document.querySelector('.circle')
const theme = document.querySelector('.color')
const btn = document.querySelector('.btn')
const heading = document.querySelector('.heading')


// --------------------Sounds---------------------

const clickSound = new Audio('audio/click.wav')
const clickSoundTwo = new Audio('audio/click2.wav')
const winSound = new Audio('audio/friends.mp3')
const drawSound = new Audio('audio/ahshit.mp3')


// ............Computer Move Functionality...........

const getRandomEmptyBox = () => {
    const emptyBoxes = Array.from(boxes).filter(box => !box.textContent);
    if (emptyBoxes.length === 0) {
        return -1;
    }
    const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    return Array.from(boxes).indexOf(emptyBoxes[randomIndex]);
};

// const computerMove = () => {
//     const emptyBoxIndex = getRandomEmptyBox();

//     if (emptyBoxIndex !== -1) {
//         boxes[emptyBoxIndex].textContent = 'X';
//         boxes[emptyBoxIndex].style.color = 'red';
//         turn.textContent = 'Player O turn';
//         turn.style.color = 'green';
//         clickSoundTwo.play();
//         boxes[emptyBoxIndex].disabled = true;
//         checkWinner();
//     }
// };

// -----------------------Game----------------------


let box0 = true

boxes.forEach((box) => {

    box.addEventListener('click', () => {


        if (box0) {
            box.textContent = 'O'
            box.style.color = 'green'
            turn.textContent = 'Player  X turn'
            turn.style.color = 'red'
            box0 = false
            clickSound.play()
        }
        else {
            box.textContent = 'X'
            box.style.color = 'red'
            turn.textContent = 'Player O turn'
            turn.style.color = 'green'
            box0 = true
            clickSoundTwo.play()
        }

        box.disabled = true

        checkWinner()

        // computerMove()

    })


    // ..........Theme functionality..............

    theme.addEventListener('change', (e) => {
        let themeColor = e.target.value;
        btn.style.backgroundColor = themeColor;
        heading.style.color = themeColor;
        box.style.borderColor = themeColor;
        turn.style.color = themeColor;
        circle.style.borderColor = themeColor;
    })

    // ...................Reaset button ...............

    reset.addEventListener('click', () => {
        box.textContent = ''
        turn.textContent = "Let's Play"
        box.disabled = false
        clickSound.play();

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
                    turn.textContent = `X be like `;
                    turn.style.color = 'blue';
                } else {
                    turn.textContent = `O be like`;
                    turn.style.color = 'blue';
                }
                winSound.play()

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
            drawSound.play()
        }
    };
})





