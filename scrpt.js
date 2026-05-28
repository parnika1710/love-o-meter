// Goofy Relationship Questions Data Matrix
const questions = [
    { text: "Who is most likely to order takeout when there is food at home?" },
    { text: "Who starts arguments completely inside their own head?" },
    { text: "Who is the primary stealer of hoodies/snacks?" },
    { text: "Who takes 45 minutes just to choose a movie on Netflix?" }
];

let currentQuestionIndex = 0;
let loveScore = 70; // Base score that changes organically on answers

const questionText = document.getElementById("question-text");
const progressBar = document.getElementById("progress");
const quizScreen = document.getElementById("quiz-screen");
const revealScreen = document.getElementById("reveal-screen");
const finalPercentage = document.getElementById("final-percentage");

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionText.textContent = questions[currentQuestionIndex].text;
        const progressPercent = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
    } else {
        showRevealScreen();
    }
}

function handleAnswer(choice) {
    // Modify score with a bit of randomness based on choices to simulate complex calculation
    if (choice === 'partner1') loveScore += Math.floor(Math.random() * 6) + 2;
    if (choice === 'partner2') loveScore += Math.floor(Math.random() * 5) + 3;
    if (choice === 'both') loveScore += 8;

    currentQuestionIndex++;
    loadQuestion();
}

function showRevealScreen() {
    quizScreen.classList.add("hidden");
    revealScreen.classList.remove("hidden");
    
    // Cap score beautifully at 99% (because 100% means no banter left)
    const exactScore = Math.min(loveScore, 99);
    
    // Animate the numbers ticking upward
    let count = 0;
    const duration = 1500; // ms
    const increment = exactScore / (duration / 16);
    
    const counterInterval = setInterval(() => {
        count += increment;
        if (count >= exactScore) {
            clearInterval(counterInterval);
            finalPercentage.textContent = `${exactScore}%`;
        } else {
            finalPercentage.textContent = `${Math.floor(count)}%`;
        }
    }, 16);
}

function scratchCard(element) {
    element.classList.add("scratched");
}

// Initial Kickoff
loadQuestion();