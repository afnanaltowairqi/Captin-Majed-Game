document.addEventListener('DOMContentLoaded', () => {
    const goal = document.getElementById("goal");
    const ball = document.getElementById("ball");
    const scoreElement = document.getElementById("score");
    let score = 0;
    let speed = 1;
    const initialSpeed = speed;
    let direction = "right";
    let currentPosition = 0;

    function moveGoal() {
        const windowWidth = window.innerWidth;
        let newPosition;

        if (direction === "right") {
            newPosition = currentPosition + speed;
            if (newPosition >= windowWidth) {
                direction = "left";
            }
        } else {
            newPosition = currentPosition - speed;
            if (newPosition <= 0) {
                direction = "right";
            }
        }
        goal.style.left = `${newPosition}px`;
        currentPosition = newPosition;
    }

    function moveBall(e) {
        const ballRect = ball.getBoundingClientRect();
        const targetX = e.clientX - ballRect.width / 4;
        const targetY = e.clientY - ballRect.height / 4;
        const dx = targetX - ballRect.left;
        const dy = targetY - ballRect.top;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const duration = distance / 800;

        ball.style.transition = `left ${duration}s linear, top ${duration}s linear`;
        ball.style.left = `${targetX}px`;
        ball.style.top = `${targetY}px`;

        setTimeout(() => {
            checkGoal(targetX, targetY);
            ball.style.transition = '';
        }, duration * 800);
    }

    function checkGoal(x, y) {
        const goalRect = goal.getBoundingClientRect();
        if (x >= goalRect.left &&
            x <= goalRect.right &&
            y >= goalRect.top &&
            y <= goalRect.bottom
        ) {
            score++;
            speed += 1;
            scoreElement.innerText = `Score: ${score}`;
            alert('GOOOOOOOAAAAALLLLL!');
        } else {
            score = 0;
            speed = initialSpeed;
            scoreElement.innerText = `Score: ${score}`;
            alert('Missed goal!');
        }
        ball.style.left = '50%';
        ball.style.top = '60%';
    }
    document.addEventListener('click', moveBall);
    setInterval(moveGoal, 10);
});