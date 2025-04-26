const correctAnswer = "A";

document.querySelectorAll(".option-btn").forEach(button => {
  button.addEventListener("click", () => {
    const selected = button.id.slice(-1); // pega o último carácter (A, B, C, D)
    const result = document.getElementById("result");

    if (selected === correctAnswer) {
      result.textContent = "Correto! 🎉";
      result.style.color = "#00ff00";
    } else {
      result.textContent = "Errado! ❌";
      result.style.color = "#ff4040";
    }
  });
});
