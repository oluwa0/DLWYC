const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const resultDiv = document.getElementById('result');
const spinBtn = document.getElementById('spin-btn');

const questions = [
    "Who was the first Archbishop of the Church of Nigeria?",
    "What does the term 'Anglican' mean?",
    "What is the name of the first book published for Anglican worship?",
    "How many articles are in the Articles of Religion of the Anglican Church?",
    "What do the letters 'ACM' stand for in the Anglican Church?",
    "Which color is used on the altar during Advent?",
    "What are the two sacraments ordained by Christ?",
    "What does the word 'Diocese' mean?",
    "Which king established the Church of England?",
    "What year was the Church of Nigeria inaugurated?"
];

// Wheel variables
const numSegments = questions.length;
const arcSize = (2 * Math.PI) / numSegments;
let startAngle = 0;
let isSpinning = false;

// Draw wheel
function drawWheel() {
    for (let i = 0; i < numSegments; i++) {
        const angle = startAngle + i * arcSize;
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, angle, angle + arcSize);
        ctx.closePath();
        ctx.fillStyle = i % 2 === 0 ? '#007bff' : '#ffd700';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();
        ctx.save();

        // Add text
        ctx.translate(
            250 + Math.cos(angle + arcSize / 2) * 150,
            250 + Math.sin(angle + arcSize / 2) * 150
        );
        ctx.rotate(angle + arcSize / 2 + Math.PI / 2);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText(questions[i], -ctx.measureText(questions[i]).width / 2, 0);
        ctx.restore();
    }
}

// Spin wheel
function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;

    const spinTime = Math.random() * 3000 + 3000; // Random spin duration
    const spinAngle = Math.random() * 5000 + 2000; // Random spin speed
    let currentAngle = 0;

    const spin = setInterval(() => {
        currentAngle += spinAngle / 100;
        startAngle += spinAngle / 1000;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();

        if (currentAngle >= spinTime) {
            clearInterval(spin);
            isSpinning = false;

            // Determine result
            const finalAngle = (startAngle + Math.PI / 2) % (2 * Math.PI);
            const winningIndex = Math.floor(
                (numSegments - (finalAngle / arcSize)) % numSegments
            );
            resultDiv.innerText = `Question: ${questions[winningIndex]}`;
        }
    }, 30);
}

spinBtn.addEventListener('click', spinWheel);
drawWheel();
