const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const infoText = document.getElementById("info");
const hiScoreBoard = document.getElementById("hiscore");
const hiScoreBoardName = document.getElementById("hiscorehold");

const easyBtn = document.getElementById("easy");
const normalBtn = document.getElementById("normal");
const hardBtn = document.getElementById("hard");
const masterBtn = document.getElementById("master");

const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.getElementById('score');

let health = 3;
let score = 0;
let hiScore = 0;
let difficulty = 3000;
let isClicked = false;
let scorePlus = false;
let hole;
let loop;
let peepL;

let hit = new Audio("./hit.wav");
let miss = new Audio("./miss.wav");

function holeGen() {
    hole = (Math.floor(Math.random() * 6));
    return hole;
};

function peep() {
    holeGen()
    infoText.textContent = "The mole is coming!"
    moles[hole].style.display = "block";
    moles[hole].addEventListener('click', () => {
        hit.play();
        isClicked = true;
        scorePlus = true;
        infoText.textContent = "You hit the mole!";
        moles[hole].style.display = "none"
    });
    setTimeout('clickChecker()', difficulty);
};

function clickChecker() {
    if(isClicked == true) {
        isClicked = false;
        difficulty -= 50;
        difficultyCheck();
    } else {
        peepMiss();
    }
};

function peepMiss() {
    miss.play();
    moles[hole].style.display = "none";
    clearInterval(loop);
    clearInterval(peepL);
    infoText.textContent = "You missed the mole, Game Over."
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "none";
    startBtn.style.display = "block";
    setTimeout('highScore();', 200)
};

function scoreGen() {
    if(scorePlus == true){
        score++;
        scoreBoard.textContent = score;
        moles[hole].style.display = "none";
        scorePlus = false;
    }
};

function difficultyCheck() {
    if(difficulty <= 400) {
        difficulty = 400;
    }
};

function highScore() {
    if(score > hiScore){
        let name = prompt("Enter your name")
        highScore = score;
        hiScoreBoard.textContent = highScore;
        hiScoreBoardName.textContent = name;
        infoText.textContent = "You beat the High Score!"
    }
};

function gameUpdater() {
    scoreGen();
};

function gameDifficulty() {
    document.getElementById("difficultyCont").style.display = "block";
    startBtn.style.display = "none" 
    easyBtn.addEventListener('click', () => {
        difficulty = 3000;
        startGame();
    })
    normalBtn.addEventListener('click', () => {
        difficulty = 2200;
        startGame();
    })
    hardBtn.addEventListener('click', () => {
        difficulty = 1400;
        startGame();
    })
    masterBtn.addEventListener('click', () => {
        difficulty = 600;
        startGame();
    })
};

function startGame() {
    score = 0;
    loop = setInterval("gameUpdater()", 10);
    peepL = setInterval("peep()", difficulty);
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
    document.getElementById("difficultyCont").style.display = "none";
    document.getElementById("end").style.display = "block"
    infoText.textContent = "The mole is coming!"
};

function pauseGame() {
    clearInterval(loop);
    clearInterval(peepL);
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "block";
    infoText.textContent = "Game Paused";
};

function resumeGame() {
    loop = setInterval("gameUpdater()", 10);
    peepL = setInterval("peep()", difficulty);
    pauseBtn.style.display = "block";
    resumeBtn.style.display = "none";
};

function endGame() {
    clearInterval(loop);
    clearInterval(peepL);
    highScore();
    moles[hole].style.display = " none";
    score = 0;
    scoreBoard.textContent = score;
    infoText.textContent = "Press Start to play";
};