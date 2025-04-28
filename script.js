const params = new URLSearchParams(window.location.search);

// Configurações
const question = params.get('question') || "Qual é a capital de Portugal?";
const optA = params.get('optA') || "Lisboa";
const optB = params.get('optB') || "Porto";
const optC = params.get('optC') || "Faro";
const optD = params.get('optD') || "Braga";
const correctAnswer = params.get('correct') || "Lisboa";

const time = parseInt(params.get('time')) || 10000; // Tempo em ms (default 10s)

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const progressBar = document.getElementById('progress-bar');

let timerInterval;
let width = 100;

// Inicializar
function loadQuiz() {
  questionEl.textContent = question;

  const options = [optA, optB, optC, optD];
  answersEl.innerHTML = '';

  options.forEach(answer => {
    const btn = document.createElement('div');
    btn.classList.add('answer');
    btn.textContent = answer;
    btn.addEventListener('click', () => checkAnswer(answer));
    answersEl.appendChild(btn);
  });

  startTimer();
}

// Verificar resposta
function checkAnswer(selected) {
  clearInterval(timerInterval);

  const allAnswers = document.querySelectorAll('.answer');
  allAnswers.forEach(ans => {
    if (ans.textContent === correctAnswer) {
      ans.classList.add('correct');
    } else {
      ans.classList.add('incorrect');
    }
  });
}

// Temporizador
function startTimer() {
  width = 100;
  progressBar.style.width = width + "%";

  timerInterval = setInterval(() => {
    width -= 100 / (time / 100);
    if (width <= 0) {
      clearInterval(timerInterval);
      checkAnswer(null);
    }
    progressBar.style.width = width + "%";
  }, 100);
}

loadQuiz();
