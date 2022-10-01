const CROSS_CLASS = 'cross';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];


const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
let circleTurn;
startGame();
restartButton.addEventListener('click', startGame)

function myStopfunctions() {
    clearTimeout(myTimeOut)
}



function startGame() {
    circleTurn = false;
    cellElement.forEach(cell => {
        cell.classList.remove(CIRCLE_CLASS)
        cell.classList.remove(CROSS_CLASS)
        cell.addEventListener('click', heandleClcik, { once: true })
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show')
}


function heandleClcik(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : CROSS_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    circleTurn = !circleTurn;
}
function setBoardHoverClass() {
    board.classList.remove(CROSS_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(CROSS_CLASS);
    }


}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass);
        })
    })

}
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = ' Match nul !'

    } else {
        winningMessageTextElement.innerHTML = `${circleTurn ? "Le joueur O gagne !" : "Le joueur X gagne ! "}`;
    }
    winningMessageElement.classList.add('show');

}

function isDraw(cell, currentClass) {
    return [...cellElement].every(cell => {
        return cell.classList.contains(CROSS_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}