let player = document.getElementById("player");
let exam = document.getElementById("exam");
let scoreDisplay = document.getElementById("score");
let score = 1;
let isJumping = false;
let speed = 5;

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

// Function to move the exam class
function moveExam() {
    let examPosition = 600;
    let gameLoop = setInterval(() => {
        examPosition -= speed;
        exam.style.right = examPosition + "px";

        // Check for collision
        let playerBottom = parseInt(window.getComputedStyle(player).bottom);
        if (examPosition < 100 && examPosition > 50 && playerBottom < 40) {
            clearInterval(gameLoop);
            alert(`FAILED! You got stuck in Class ${score}. Time to repeat!`);
            location.reload();
        }

        // Reset position & move to next class after jump
        if (examPosition < -40) {
            if (score == 12) {
                alert("🎓 Congratulations! You passed all exams and realized they are useless!");
                location.reload();
            }
            score++;
            scoreDisplay.innerText = `Class: ${score}`;
            exam.innerText = `📖 Class ${score} Exam`; // Changing class name
            examPosition = 600;
            speed += 1; // Make exams faster
        }
    }, 20);
}

// Start the game and listen for the spacebar to jump
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});

// Start moving the first class
moveExam();
