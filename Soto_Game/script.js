const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const levelDisplay = document.getElementById("level");
const message = document.getElementById("message");
const nextLevelButton = document.getElementById("nextLevel");

const tileSize = 40;
let level = 1;
let player = { x: 1, y: 1 };
let goal = { x: 8, y: 8 };

const levels = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
];

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let maze = levels[level - 1];
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            ctx.fillStyle = maze[row][col] === 1 ? "black" : "white";
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
    ctx.fillStyle = "red";
    ctx.fillRect(goal.x * tileSize, goal.y * tileSize, tileSize, tileSize);
}

function movePlayer(dx, dy) {
    let maze = levels[level - 1];
    let newX = player.x + dx;
    let newY = player.y + dy;
    if (maze[newY] && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    }
    drawMaze();
    checkWin();
}

function askCodingChallenge(callback) {
    const questions = [
        "Complete the function: function add(a, b) { return ___; }",
        "Fill in the missing part: while(___) { console.log(\"Looping...\"); }"
    ];
    const answers = ["a + b", "true"];
    
    const questionIndex = level - 1;
    const answer = prompt(questions[questionIndex]);
    if (answer && answer.trim() === answers[questionIndex]) {
        callback();
    } else {
        alert("Incorrect! Try again.");
    }
}

function checkWin() {
    if (player.x === goal.x && player.y === goal.y) {
        message.textContent = "You escaped the maze!";
        askCodingChallenge(() => {
            if (level === 1) {
                nextLevelButton.textContent = "Next Level";
                nextLevelButton.style.display = "block";
            } else {
                alert("Congratulations! You have completed all levels.");
                nextLevelButton.textContent = "Reset Game";
                nextLevelButton.style.display = "block";
            }
        });
    }
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp": movePlayer(0, -1); break;
        case "ArrowDown": movePlayer(0, 1); break;
        case "ArrowLeft": movePlayer(-1, 0); break;
        case "ArrowRight": movePlayer(1, 0); break;
    }
});

nextLevelButton.addEventListener("click", () => {
    if (level < levels.length) {
        level++;
    } else {
        level = 1;
    }
    player = { x: 1, y: 1 };
    goal = { x: levels[level - 1][0].length - 2, y: levels[level - 1].length - 2 };
    levelDisplay.textContent = level;
    message.textContent = "";
    nextLevelButton.style.display = "none";
    drawMaze();
});

drawMaze();
