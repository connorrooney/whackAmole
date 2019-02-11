const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const infoText = document.getElementById("info");

const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.getElementById('score');

let score = 0;
let isClicked = false;
let scorePlus = false;
let hole;
let loop;
let peepL;


function holeGen() {
    hole = (Math.floor(Math.random() * 6));
    return hole;
}

function peep() {
    holeGen()
    infoText.textContent = "The mole is coming!"
    moles[hole].style.display = "block";
    moles[hole].addEventListener('click', () => {
        isClicked = true;
        scorePlus = true;
        infoText.textContent = "You hit the mole!";
        moles[hole].style.display = "none"
    });
    setTimeout('clickChecker()', 3000);
}

function clickChecker() {
    if(isClicked == true) {
        isClicked = false;
    } else {
        peepMiss();
    }
}

function peepMiss() {
    moles[hole].style.display = "none";
    clearInterval(loop);
    clearInterval(peepL);
    infoText.textContent = "You missed the mole, Game Over."
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "none";
    startBtn.style.display = "block";
}

function scoreGen() {
    if(scorePlus == true){
        score++;
        scoreBoard.textContent = score;
        moles[hole].style.display = "none";
        scorePlus = false;
    }
}

function gameUpdater() {
    scoreGen();
}

function startGame() {
    loop = setInterval("gameUpdater()", 10);
    peepL = setInterval("peep()", 3500);
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
}

function pauseGame() {
    clearInterval(loop);
    clearInterval(peepL);
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "block";
}

function resumeGame() {
    loop = setInterval("gameUpdater()", 10);
    peepL = setInterval("peep()", 3500);
    pauseBtn.style.display = "block";
    resumeBtn.style.display = "none";
}