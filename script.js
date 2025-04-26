const correctAnswer = "A"; // Resposta certa
const streamId = "748c0ff7"; // substitui pelo teu se necessário
const socket = new WebSocket(`wss://io.socialstream.ninja?streamId=${streamId}`);

document.querySelectorAll(".option-btn").forEach(button => {
  button.addEventListener("click", () => {
    const selected = button.id.slice(-1);
    showResult(selected);
  });
});

socket.addEventListener("open", () => {
  console.log("Ligado ao WebSocket para o Quiz!");
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "chat-message") {
    const message = data.message.trim().toUpperCase();
    if (["A", "B", "C", "D"].includes(message)) {
      showResult(message);
    }
  }
});

function showResult(selected) {
  const result = document.getElementById("result");

  if (selected === correctAnswer) {
    result.textContent = "Correto! 🎉";
    result.style.color = "#00ff00";
  } else {
    result.textContent = "Errado! ❌";
    result.style.color = "#ff4040";
  }
}
