let player = document.getElementById("player");
let exam = document.getElementById("exam");
let scoreDisplay = document.getElementById("score");
let score = 1;
let isJumping = false;
let playerX = 50; // Player starting position
let speed = 5; // Speed at which class moves towards player

// Function to make the player jump
function jump() {
    if (!isJumping) {
        isJumping = true;
        let up = setInterval(() => {
            let playerBottom = parseInt(window.getComputedStyle(player).bottom);
            if (playerBottom >= 100) {
                clearInterval(up);
                let down = setInterval(() => {
                    if (playerBottom <= 20) {
                        clearInterval(down);
                        isJumping = false;
                    } else {
                        player.style.bottom = (playerBottom - 5) + "px";
                    }
                    playerBottom = parseInt(window.getComputedStyle(player).bottom);
                }, 20);
            } else {
                player.style.bottom = (playerBottom + 5) + "px";
            }
        }, 20);
    }
}

// Function to move the player forward
function movePlayer() {
    setInterval(() => {
        playerX += 2;  // Move player forward every frame
        player.style.left = playerX + "px";  // Update player position

        // Collision detection with class
        let playerBottom = parseInt(window.getComputedStyle(player).bottom);
        let examPosition = parseInt(window.getComputedStyle(exam).right);

        // Check collision if the player is at the same height as class
        if (examPosition < 100 && examPosition > 50 && playerBottom < 40) {
            alert(`FAILED! You got stuck in Class ${score}. Time to repeat!`);
            location.reload();
        }
    }, 20);
}

// Function to move the class
function moveExam() {
    let examPosition = 600;
    let gameLoop = setInterval(() => {
        examPosition -= speed; // Move the class towards the player
        exam.style.right = examPosition + "px";

        // When the class reaches the end of the screen
        if (examPosition < -40) {
            if (score === 12) {
                alert("🎓 Congratulations! You passed all exams and realized they are useless!");
                location.reload();
            }
            score++;
            scoreDisplay.innerText = `Class: ${score}`;
            exam.innerText = `📖 Class ${score} Exam`; // Changing class name
            examPosition = 600; // Reset the class position
            speed += 1; // Make the exam move faster as you progress
        }
    }, 20);
}

// Start the game loop
movePlayer();
moveExam();

// Start moving the first class
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();  // Player jumps when spacebar is pressed
    }
});
