const params = new URLSearchParams(window.location.search);

// Configurações
const domain = params.get('domain') || 'http://localhost:3900';
const question = params.get('question') || "Qual é a capital de Portugal?";
const optA = params.get('optA') || "Lisboa";
const optB = params.get('optB') || "Porto";
const optC = params.get('optC') || "Faro";
const optD = params.get('optD') || "Braga";

const optionsList = [optA, optB, optC, optD];
const time = parseInt(params.get('time')) || 10000; // Tempo em ms

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const progressBar = document.getElementById('progress-bar');

let votes = {};

// Inicializar
function loadQuiz() {
  questionEl.textContent = question;
  answersEl.innerHTML = '';

  optionsList.forEach(answer => {
    votes[answer.toLowerCase()] = 0;

    const btn = document.createElement('div');
    btn.classList.add('answer');
    btn.id = `answer-${answer.toLowerCase()}`;
    btn.innerHTML = `
      ${answer}
      <span class="vote-count" id="count-${answer.toLowerCase()}">0</span>
    `;
    answersEl.appendChild(btn);
  });

  startTimer();
}

// Temporizador
let timerInterval;
let width = 100;

function startTimer() {
  width = 100;
  progressBar.style.width = width + "%";

  timerInterval = setInterval(() => {
    width -= 100 / (time / 100);
    if (width <= 0) {
      clearInterval(timerInterval);
      highlightWinner();
    }
    progressBar.style.width = width + "%";
  }, 100);
}

// Buscar votos
function fetchVotes() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      const words = (data.wordcloud || "").toLowerCase().split(',');

      optionsList.forEach(opt => {
        const count = words.filter(word => word.trim() === opt.toLowerCase()).length;
        votes[opt.toLowerCase()] = count;

        const countEl = document.getElementById(`count-${opt.toLowerCase()}`);
        if (countEl) {
          countEl.textContent = count;
        }
      });
    })
    .catch(error => console.error("Erro ao buscar votos:", error));
}

// Destacar vencedor
function highlightWinner() {
  let maxVotes = -1;
  let winner = "";

  for (const [option, count] of Object.entries(votes)) {
    if (count > maxVotes) {
      maxVotes = count;
      winner = option;
    }
  }

  if (winner) {
    const winningEl = document.getElementById(`answer-${winner}`);
    if (winningEl) {
      winningEl.classList.add('highlight');
    }
  }
}

// Atualizar votos cada segundo
setInterval(fetchVotes, 1000);

// Começar
loadQuiz();
fetchVotes();
