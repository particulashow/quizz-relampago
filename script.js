const params = new URLSearchParams(window.location.search);
const questionText = params.get('question') || 'Quem vai ganhar?';
const optA = params.get('optA') || 'Equipe A';
const optB = params.get('optB') || 'Equipe B';
const domain = params.get('domain') || 'http://localhost:3900';

document.getElementById('question').innerText = questionText;

function setupOptions() {
  ['A', 'B'].forEach(letter => {
    const div = document.getElementById('option' + letter);
    div.innerHTML = `<div class="option-bar" id="bar${letter}"></div><div class="option-text" id="text${letter}"></div>`;
  });
}

setupOptions();

let counts = { A: 0, B: 0 };

function updateDisplay() {
  const total = counts.A + counts.B || 1;

  document.getElementById('textA').innerText = `${optA}: ${counts.A}`;
  document.getElementById('barA').style.width = `${(counts.A / total) * 100}%`;

  document.getElementById('textB').innerText = `${optB}: ${counts.B}`;
  document.getElementById('barB').style.width = `${(counts.B / total) * 100}%`;
}

function fetchData() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      let chatHistory = (data.wordcloud || "").toLowerCase().split(',');

      counts.A = chatHistory.filter(word => word.trim() === optA.toLowerCase()).length;
      counts.B = chatHistory.filter(word => word.trim() === optB.toLowerCase()).length;

      updateDisplay();
    })
    .catch(error => console.error('Erro ao buscar votos:', error));
}

setInterval(fetchData, 1000);

fetch(`${domain}/clear-chat?words=${optA},${optB}`)
  .then(() => setTimeout(fetchData, 500));
