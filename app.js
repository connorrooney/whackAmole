const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.getElementById('score');
let score = 0;
let hole;
let loop;
let isClicked = false;
let timer = 3000;

function holeGen() {
    hole = (Math.floor(Math.random() * 6));
    return hole;
}

function molePeep() {
    holeGen()
    moles[hole].style.display = "block";
    moles[hole].addEventListener('click', () => {
        moles[hole].style.display = "none";
        isClicked = true;
        moleClicker();
    });
    setTimeout("moleMiss()", timer)
}

function moleClicker() {
    if(isClicked == true){
        score += 1;
        console.log("checker")
        updater();
        isClicked = false; 
    }
}

function moleMiss() {
    moles[hole].style.display = "none";
    isClicked = false;
}

function updater() {
    scoreBoard.textContent = score;
}

function startGame() {
    loop = setInterval("molePeep()", 3500);
}

function pauseGame() {
    clearInterval(loop)
}