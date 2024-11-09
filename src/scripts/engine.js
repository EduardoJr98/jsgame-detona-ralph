const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
    highscore: document.querySelector("#highscore"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 10,
    lives: 3,
    highscore: 0,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

  if (state.values.lives > 0) {
      state.values.lives--;
      state.view.lives.textContent = `x${state.values.lives}`;
      state.values.curretTime = 60;
      state.view.timeLeft.textContent = state.values.curretTime;
      updateHighScore();
      if (state.values.lives > 0) {
        state.values.result = 0;
        state.view.score.textContent = state.values.result;
        state.actions.countDownTimerId = setInterval(countDown, 1000);
        state.actions.timerId = setInterval(randomSquare, 1000);
        alert("Tempo esgotado! Uma vida foi perdida.");   
  } else {
      alert("Game Over! O seu resultado foi: " + state.values.result);
      displayGameOver();
    }
  } 
}
}

function updateHighScore() {
  if (state.values.result > state.values.highscore) {
  state.values.highscore = state.values.result;
  state.view.highscore.textContent = `Highscore: ${state.values.highscore}`;
  }
}

function displayGameOver() {
  alert(`Game Over! Seu resultado final foi: ${state.values.result}`);
  alert(`O seu melhor resultado (highscore) é: ${state.values.highscore}`);
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
  state.view.lives.textContent = `x${state.values.lives}`;
  state.view.highscore.textContent = `Highscore: ${state.values.highscore}`;
}

initialize();
