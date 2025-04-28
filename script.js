// Pergunta e respostas
const questionData = {
  question: "Qual é a capital de Portugal?",
  answers: ["Lisboa", "Porto", "Faro", "Braga"],
  correct: "Lisboa"
};

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const progressBar = document.getElementById('progress-bar');

let time = 10000; // 10 segundos
let timerInterval;
let width = 100;

// Inicializar o quiz
function loadQuiz() {
  questionEl.textContent = questionData.question;
  answersEl.innerHTML = '';

  questionData.answers.forEach(answer => {
    const btn = document.createElement('div');
    btn.classList.add('answer');
    btn.textContent = answer;
    btn.addEventListener('click', () => checkAnswer(answer));
    answersEl.appendChild(btn);
  });

  startTimer();
}

// Função para verificar a resposta
function checkAnswer(selected) {
  clearInterval(timerInterval);

  const allAnswers = document.querySelectorAll('.answer');
  allAnswers.forEach(ans => {
    if (ans.textContent === questionData.correct) {
      ans.classList.add('correct');
    } else {
      ans.classList.add('incorrect');
    }
  });
}

// Função para gerir o tempo
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
