var puzzleBoard = document.getElementById('puzzle');
var solveButton = document.getElementById('solve-button');
var checkButton = document.getElementById('check-button');
var newPuzzleButton = document.getElementById('newPuzzle-button');
var squares = 81;
var errors = 0;

var board = "..74916.52...6.3.9.....7.1..586....4..3....9...62..1879.4.7...267.83....81..45..."
var solution = "387491625241568379569327418758619234123784596496253187934176852675832941812945763"

window.onload = function(){
 setGame();
};


function setGame() {
    //Calculations to determine where to thicken border of input boxes
    var verticalBorder1 = [];
    var verticalBorder2 = [];
    for (let j = 1; j <= 9; j++){
        verticalBorder1[j] = 9*j - 7;
        verticalBorder2[j] = 9*j - 4;
    }

    //Creating Board
    for (let i = 0; i < squares; i++){
        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'number');
        inputElement.setAttribute('max', '9');
        inputElement.setAttribute('min', '1');
        puzzleBoard.appendChild(inputElement);


        if (Math.floor(i/9) == 2 || Math.floor(i/9) == 5){
            inputElement.classList.add("horizontal-line");
        }
        
        if (verticalBorder1.includes(i) || verticalBorder2.includes(i)){
            inputElement.classList.add("vertical-line");
        }
        
    }

    //Adding initial values
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, i) => {
        if (board.charAt(i) != ".") {
            inputs[i].value = board.charAt(i);
            inputs[i].classList.add("initial-tile");
            inputs[i].disabled = "true";
        }
    })

    solveButton.addEventListener('click', solveGame);
    checkButton.addEventListener('click', checkAnswers);
}



function solveGame(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, i) => {
        inputs[i].value = solution.charAt(i);
    })
}

function checkAnswers(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, i) => {
        if (inputs[i].value != '' && inputs[i].value == solution.charAt(i) && !inputs[i].classList.contains("initial-tile")){
            inputs[i].classList.add("correct");
            inputs[i].disabled = "true";
        } else if (inputs[i].value != '' && inputs[i].value != solution.charAt(i)) {
            errors +=1;
            document.getElementById("errors").innerText = errors;
            inputs[i].classList.add("wrong");
        }
    })
}

