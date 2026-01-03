async function askAI() {
  const prompt = document.getElementById("prompt").value;
  const resBox = document.getElementById("response");

  resBox.textContent = "Saifi AI thinking...";

  const res = await fetch("https://YOUR-WORKER-URL", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  resBox.textContent = data.reply;
}
