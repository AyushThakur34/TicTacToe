document.addEventListener("DOMContentLoaded", function(){
    const gameInfo = document.querySelector(".game-info");
    const newGame = document.querySelector(".new-game");
    const boxes = document.querySelectorAll(".box");

    let currPlayer;
    let filledBoxes;
    let gameGrid;
    let answer;

    let winningPositions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function initialize(){
        filledBoxes = 0;
        currPlayer = "O";
        initGame();
        newGame.classList.remove("active");
        gameGrid = ["","","","","","","","",""];
        boxes.forEach((box)=>{
            box.innerHTML = "";
        });
        answer = "";

        winningPositions.forEach((position)=>{
            boxes[position[0]].classList.remove("win");
            boxes[position[1]].classList.remove("win");
            boxes[position[2]].classList.remove("win");
        });
    }

    initialize();

    // initialize game
    function initGame(){
        gameInfo.innerHTML = `Current Player: ${currPlayer}`;
    }

    initGame();

    function handleClick(index){
        gameGrid[index] = `${currPlayer}`;
        if(currPlayer == "O") currPlayer = "X";
        else(currPlayer = "O");
        initGame();
        return gameGrid[index];
    }

    function checkGame(){
        answer = "";

        winningPositions.forEach((position)=>{
            if((gameGrid[position[0]] !== "") || (gameGrid[position[1]] !== "") || (gameGrid[position[2]] !== "")){
                if((gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[0]] === gameGrid[position[2]])){
                    if(gameGrid[position[0]] === "X") answer = "X";
                    else answer = "O";

                    boxes[position[0]].classList.add("win");
                    boxes[position[1]].classList.add("win");
                    boxes[position[2]].classList.add("win");
                }
            }
        });

        if(answer === "" && filledBoxes === 9){
            newGame.classList.add("active");
            gameInfo.innerHTML = "Draw";
        }
        else if(answer !== ""){
            newGame.classList.add("active");
            if(answer === "X") gameInfo.innerHTML = "X Wins";
            else if(answer === "O") gameInfo.innerHTML = "O Wins";
        }
    }

    boxes.forEach((box, index)=>{
        box.addEventListener("click", function(){
            if(box.innerHTML == "" && answer === ""){
                box.innerHTML = handleClick(index, box);
                filledBoxes++;
                checkGame();
            }
        })
    });

    newGame.addEventListener("click", function(){
        initialize();
    })
    
});