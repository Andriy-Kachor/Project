const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const score = document.querySelector(".score");
const loose = document.querySelector(".loose");
const reload = document.querySelector(".reload");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const skill = document.getElementById("selectList");
let gamePlay = false;
let duration = 1250;
let scorePerSkill = 1;

let bg = new Image();
let spaceShip = new Image();
let asteroid = new Image();
let shot = new Image();
let heart = new Image();

bg.src = "./img/space.png";
spaceShip.src = "./img/spaceShip.png";
asteroid.src = "./img/asteroid.png";
shot.src = "./img/shot.png";
heart.src = "./img/heart.png";

// Позиція корабля
let position = {
  x: 228,
  y: 624,
};

startBtn.addEventListener("click", () => (gamePlay = true));
stopBtn.addEventListener("click", () => (gamePlay = false));
skill.addEventListener("change", () => {
  if (skill.value === "Easy") {
    duration = 1250;
    scorePerSkill = 1;
  }
  if (skill.value === "Medium") {
    duration = 1000;
    scorePerSkill = 2;
  }
  if (skill.value === "Hard") {
    duration = 750;
    scorePerSkill = 3;
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    position.x += 24;
    if (position.x >= 456) {
      position.x = 456;
    }
  }
  if (event.key === "ArrowLeft") {
    position.x -= 24;
    if (position.x <= 0) {
      position.x = 0;
    }
  }
  if (event.code === "Space") {
    spaceShot();
  }
});

let shootsBarriers = 0;

// логіка пострілу пострілу
function spaceShot() {
  let aShot = {
    x: position.x,
    y: position.y,
  };

  context.drawImage(shot, aShot.x, aShot.y);
  setInterval(function () {
    for (let i = 0; i < barrier.length; i++) {
      if (
        (aShot.y > barrier[i].y &&
          aShot.y < barrier[i].y + 48 &&
          aShot.x >= barrier[i].x &&
          aShot.x <= barrier[i].x + 48) ||
        (aShot.y > barrier[i].y &&
          aShot.y < barrier[i].y + 48 &&
          barrier[i].x >= aShot.x &&
          barrier[i].x <= aShot.x + 48)
      ) {
        barrier.splice(i, 1);
        shootsBarriers += scorePerSkill;
        score.innerHTML = `Your score : ${Number(shootsBarriers)}`;
        return (aShot = {});
      }
    }
    if (aShot.y <= 25) {
      this.aShot = {};
      return;
    }
    context.drawImage(shot, aShot.x, aShot.y);
    aShot.y -= 12;
  }, 15);
}

// перешкоди
let barrier = [];
barrier[0] = {
  x: Math.floor(Math.random() * 457),
  y: 0,
};

function drawGame() {
  for (let i = 0; i < barrier.length; i++) {
    context.drawImage(asteroid, barrier[i].x, barrier[i].y);
    barrier[i].y += 12;
    if (barrier[i].y == 12) {
      setTimeout(() => {
        barrier.push({
          x: Math.floor(Math.random() * 457),
          y: 0,
        });
      }, duration);
    }
  }
  for (let i = 0; i < barrier.length; i++) {
    if (barrier[i].y > 672) {
      barrier.splice(i, 1);
      lives[0].counter -= 1;
      console.log(lives.length);
      if (lives[0].counter <= 0) {
        loose.classList.add("inline");
        reload.classList.add("inline");
        gamePlay = false;
      }
    }
  }
}

let lives = [{ counter: 3 }, { x: 0, y: 0 }, { x: 16, y: 0 }, { x: 32, y: 0 }];
function looseGame() {
  if (lives[0].counter == 3) {
    context.drawImage(heart, lives[1].x, lives[1].y);
    context.drawImage(heart, lives[2].x, lives[2].y);
    context.drawImage(heart, lives[3].x, lives[3].y);
  } else if (lives[0].counter == 2) {
    context.drawImage(heart, lives[1].x, lives[1].y);
    context.drawImage(heart, lives[2].x, lives[2].y);
  } else if (lives[0].counter == 1) {
    context.drawImage(heart, lives[1].x, lives[1].y);
  } else if (lives[0].counter <= 0) {
    return;
  }
}

let game = setInterval(() => {
  context.drawImage(bg, 0, 0);
  context.drawImage(spaceShip, position.x, position.y);
  looseGame();
  if (gamePlay == true) {
    drawGame();
  }
}, 100);
