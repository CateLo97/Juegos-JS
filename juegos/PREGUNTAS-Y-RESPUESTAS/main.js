// Import questions and answers
import { questionsAndAnswers } from "./preguntas-y-respuestas.js";

// Variables
let selectedQuestions = [];
let score = 0;

// Select DOM elements
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');

// Entry point of the program
function displayTopics() {
    resultContainer.innerHTML = '';
    questionContainer.innerHTML = '<h2 class="question">Seleccione un tema: </h2>';

    Object.keys(questionsAndAnswers).forEach((topic) => { 
        optionsContainer.innerHTML += `<p class="option"> ${topic.toUpperCase()} </p>`;
    });

    const options = optionsContainer.querySelectorAll('.option');

    options.forEach((option) => {
        option.addEventListener('click', () => {
            const topic = (option.innerHTML.toLowerCase()).trim();
            selectTopic(topic);
        });
    });
}

displayTopics();

// Function to display the first question
// Depending on the selected topic
function selectTopic(topic) {
    if (questionsAndAnswers[topic]) {
        selectedQuestions = questionsAndAnswers[topic];
        showQuestion(0);
    } else {
        questionContainer.innerHTML = `<h2 class="question">Tema no encontrado</h2>`;
    } 
}

function showQuestion(index) {
    if (index >= selectedQuestions.length) {
        createResult();
        return;
    }

    const { correctAnswer, answers } = selectedQuestions[index];
    const question = selectedQuestions[index].question;

    questionContainer.innerHTML = `<h2 class="question">${question}</h2>`;

    displayOptions(answers, correctAnswer, index);
}

function displayOptions(answers, correctAnswer, index) {
    optionsContainer.innerHTML = '';
    answers.forEach((answer) => {
        optionsContainer.innerHTML += `<p class="option"> ${answer} </p>`;
    });

    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((option) => {
        option.addEventListener('click', () => {
            options.forEach((opt) => opt.classList.add('disabled'));

            if (option.innerHTML.trim() === correctAnswer.trim()) {
                score++;
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
            }

            setTimeout(() => {
                showQuestion(index + 1);
            }, 500);
        });
    });
}

function createResult() {
    questionContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    resultContainer.innerHTML = `
    <h2 class="total">  Haz acertado ${score} de ${selectedQuestions.length}</h2>
    <div class="container-btn">
        <button id="restartBtn">Reiniciar</button>
    </div>
    `;
    const restartButton = resultContainer.querySelector('#restartBtn');
    restartButton.addEventListener('click', () => {
        score = 0;
        displayTopics();
    });
}
