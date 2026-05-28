// Goofy Relationship Questions
const questions = [
    "Who is most likely to order takeout when there is food at home?",
    "Who starts arguments completely inside their own head?",
    "Who is the primary stealer of hoodies/snacks?",
    "Who takes 45 minutes just to choose a movie on Netflix?"
];

let currentQuestionIndex = 0;
let loveScore = 75; // Starting base score

function loadQuestion() {
    // Grab the elements directly inside the function
    const questionText = document.getElementById("question-text");
    const progressBar = document.getElementById("progress");

    if (currentQuestionIndex < questions.length) {
        // Update the question text
        if (questionText) {
            questionText.textContent = questions[currentQuestionIndex];
        }
        // Update the progress bar width
        if (progressBar) {
            const progressPercent = (currentQuestionIndex / questions.length) * 100;
            progressBar.style.width = progressPercent + "%";
        }
    } else {
        // If no more questions, reveal the final screen
        showRevealScreen();
    }
}

function handleAnswer(choice) {
    // Add points depending on the click to build up the meter
    if (choice === 'partner1') loveScore += 5;
    if (choice === 'partner2') loveScore += 6;
    if (choice === 'both') loveScore += 7;

    // Move to the next question index and reload the UI
    currentQuestionIndex++;
    loadQuestion();
}

function showRevealScreen() {
    const quizScreen = document.getElementById("quiz-screen");
    const revealScreen = document.getElementById("reveal-screen");
    const finalPercentage = document.getElementById("final-percentage");

    // Swap the visibility classes
    if (quizScreen && revealScreen) {
        quizScreen.classList.add("hidden");
        revealScreen.classList.remove("hidden");
    }
    
    // Animate the love percentage counter cleanly
    const exactScore = Math.min(loveScore, 99); // Max out at 99% for fun
    let count = 0;
    
    const counterInterval = setInterval(function() {
        count += 3;
        if (count >= exactScore) {
            clearInterval(counterInterval);
            if (finalPercentage) finalPercentage.textContent = exactScore + "%";
        } else {
            if (finalPercentage) finalPercentage.textContent = count + "%";
        }
    }, 20);
}

function scratchCard(element) {
    // Simply adds the CSS class to slide the scratch layer away
    element.classList.add("scratched");
}

// Ensure the first question runs cleanly when everything finishes loading
window.onload = function() {
    loadQuestion();
};