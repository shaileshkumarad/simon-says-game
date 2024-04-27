let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "green", "blue", "red"];
let scores = [];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener('keydown', function() {
  if (started == false) {
    started = true;
    levelUp();
  }
})

function gameFlash(btn) {
  btn.classList.add('flash');
  setTimeout(function() {
    btn.classList.remove('flash');
  }, 200)
};

function userFlash(btn) {
  btn.classList.add('userFlash');
  setTimeout(function() {
    btn.classList.remove('userFlash');
  }, 200)
};

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomColor = btns[Math.floor(Math.random()*4)];
  let randomButton = document.querySelector(`.${randomColor}`);
  gameFlash(randomButton);

  gameSeq.push(randomColor);
  console.log(gameSeq);
};

function btnClick() {
  let button = this;
  userFlash(button);

  let userColor = this.getAttribute('id');
  userSeq.push(userColor);
  checkAnswer(userSeq.length-1);
};

let buttons = document.querySelectorAll('.btn');

for(let i=0; i<buttons.length; i++) {
  buttons[i].addEventListener('click', btnClick);
}

function checkAnswer(index) {
  if (gameSeq[index] === userSeq[index]) {
    if (gameSeq.length === userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any keyboard Key to restart`;
    scores.push(level);
    showScore()
    restart();
    document.querySelector('body').style.backgroundColor = "red";
    setTimeout(function() {
      document.querySelector('body').style.backgroundColor = "white"
    }, 150);
  }
}

function restart() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
};

let highScore = 0;
let h3 = document.querySelector('h3');
function showScore() {
  for (let i=0; i<scores.length; i++) {
    if (highScore < scores[i]) {
      highScore = scores[i]
    }
  }
  h3.innerText = `Your highest score is ${highScore}.`
}





