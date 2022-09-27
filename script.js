const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessageText = document.querySelector("[data-winning-message-text]")
const endGameMessage = document.getElementById("winning-message")
const restartButton = document.getElementById("restart")

const X_CLASS = "x"
const CIRCLE_CLASS = "circle"

let circleTurn




const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]




cellElements.forEach(cell => {
    cell.addEventListener("click", handleClick, {once: true})
})

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    //placemark
    placeMark(cell, currentClass)



    //check for win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHover()
    }


    //check for draw
    //switch turns
    
}


const endGame = (draw) => {
    if (draw) {
        winningMessageText.innerText = "Draw!"
    }
    else {
        winningMessageText.innerText = `${circleTurn ? "Circle" : "X"} Wins!`
    }
    endGameMessage.classList.add("show")
}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
}

const swapTurns = () => {
    circleTurn = !circleTurn
}

const setBoardHover = () => {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}


function startGame() {
    circleTurn=false;
    cellElements.forEach(cell => {
        cell.classList.remove(CIRCLE_CLASS)
        cell.classList.remove(X_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true})
    })
    setBoardHover()
    endGameMessage.classList.remove("show")
}

startGame()

const checkWin = (currentClass) => {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

const isDraw = ()  => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

restartButton.addEventListener("click", startGame)