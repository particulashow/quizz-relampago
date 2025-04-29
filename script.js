// Ler parâmetros da URL
const params = new URLSearchParams(window.location.search);
const questionText = params.get('question') || 'Qual a tua cor preferida?';
const optA = params.get('optA') || 'Azul';
const optB = params.get('optB') || 'Vermelho';
const optC = params.get('optC') || 'Verde';
const optD = params.get('optD') || 'Amarelo';
const domain = params.get('domain') || 'http://localhost:3900';

document.getElementById('question').innerText = questionText;

let counts = {
  A: 0,
  B: 0,
  C: 0,
  D: 0
};

function updateDisplay() {
  document.getElementById('optionA').innerText = `${optA}: ${counts.A}`;
  document.getElementById('optionB').innerText = `${optB}: ${counts.B}`;
  document.getElementById('optionC').innerText = `${optC}: ${counts.C}`;
  document.getElementById('optionD').innerText = `${optD}: ${counts.D}`;
}

function fetchData() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      let chatHistory = (data.wordcloud || "").toLowerCase().split(',');

      counts.A = chatHistory.filter(word => word.trim() === optA.toLowerCase()).length;
      counts.B = chatHistory.filter(word => word.trim() === optB.toLowerCase()).length;
      counts.C = chatHistory.filter(word => word.trim() === optC.toLowerCase()).length;
      counts.D = chatHistory.filter(word => word.trim() === optD.toLowerCase()).length;

      updateDisplay();
    })
    .catch(error => console.error('Erro ao buscar votos:', error));
}

setInterval(fetchData, 1000);

fetch(`${domain}/clear-chat?words=${optA},${optB},${optC},${optD}`)
  .then(() => setTimeout(fetchData, 500));
