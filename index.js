const board = document.querySelector("#board");
const board_context = board.getContext("2d");
const score_text = document.querySelector("#score");
const restart_btn = document.querySelector("#restart");
const WIDTH = 500;
const HEIGHT = 500;
const background_color = "black";
const snake_color = "green";
const fruit_color = "red";
const unitsize = 25;
let running = false;
let xv = 25;
let yv = 0;
let foodX = 0;
let foodY = 0;
let points = 0;
let snake = [
  {x: unitsize*4, y: 0},
  {x: unitsize*3, y: 0},
  {x: unitsize*2, y: 0},
  {x: unitsize, y: 0},
  {x: 0, y: 0}
];

window.addEventListener("keydown", updateDir);
restart_btn.addEventListener("click", restartGame);

function run() {
  running = true;
  score_text.textContent = points;
  createFood();
  drawFood();
  gameLoop();
};

function gameLoop() {
  if (running) {
    setTimeout(() => {
      clearScreen();
      drawFood();
      moveSnake();
      drawSnake();
      checkCollision();
      gameLoop();
    }, 75);
  } else {
    gameOver();
  }
};

function clearScreen() {
  board_context.fillStyle = background_color;
  board_context.fillRect(0, 0, WIDTH, HEIGHT);
};

function gameOver() {
  board_context.font = "60px Arial";
  board_context.fillStyle = "red";
  board_context.textAlign = "center";
  board_context.fillText("GAME OVER", WIDTH/2, HEIGHT/2);
  running = false;
};

function moveSnake() {
  const head = {x: snake[0].x + xv, y: snake[0].y + yv};
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    points += 1;
    score_text.textContent = points;
    createFood();
  } else {
    snake.pop();
  }
};

function drawSnake() {
  board_context.fillStyle = snake_color;
  for (var i = 0; i < snake.length; i++) {
    board_context.fillRect(snake[i].x, snake[i].y, unitsize, unitsize);
  }
};

function checkCollision() {
  if (snake[0].x >= WIDTH || snake[0].x < 0 || snake[0].y >= HEIGHT || snake[0].y < 0) {
    running = false;
  }
  let head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) {
      running = false;
      break;
    }
  }
};

function createFood() {
  function randomFood(min, max) {
    const rand = Math.round((Math.random() * (max-min) + min)/unitsize)*unitsize;
    return rand;
  }
  while (true) { 
    foodX = randomFood(0, WIDTH-unitsize);
    foodY = randomFood(0, HEIGHT-unitsize);
    if (checkFoodPos()) {
      break;
    }
  }
};

function checkFoodPos() {
  for (let i  = 0; i < snake.length; i++) {
    if (snake[i].x == foodX && snake[i].y == foodY) {
      return false;
    }
  }
  return true;
};

function drawFood() {
  board_context.fillStyle = fruit_color;
  board_context.fillRect(foodX, foodY, unitsize, unitsize);
};

function updateDir(event) {
  if (event.key === "ArrowUp") {
    yv = -unitsize;
    xv = 0;
  } else if (event.key === "ArrowDown") {
    yv = unitsize;
    xv = 0;
  } else if (event.key === "ArrowLeft") {
    yv = 0;
    xv = -unitsize;
  } else if (event.key === "ArrowRight") {
    yv = 0;
    xv = unitsize;
  } else {
    console.log("invalid key");
  }
};

function restartGame() {
  points = 0;
  xv = unitsize;
  yv = 0;
  snake = [
    {x: unitsize*4, y: 0},
    {x: unitsize*3, y: 0},
    {x: unitsize*2, y: 0},
    {x: unitsize, y: 0},
    {x: 0, y: 0}
  ];
  running = true;
  run();
};

run();
