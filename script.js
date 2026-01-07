let WEBHOOK = "";

async function connect() {
  WEBHOOK = document.getElementById("webhook").value;
  if (!WEBHOOK) return alert("Webhook inválida");

  const res = await fetch(WEBHOOK);
  const data = await res.json();

  document.getElementById("info").innerHTML = `
    Name: ${data.name || "None"}<br>
    Channel ID: ${data.channel_id || "None"}
  `;

  document.getElementById("name").value = data.name || "";
}

async function sendSpam() {
  const msg = document.getElementById("msg").value;
  const count = Number(document.getElementById("count").value);
  const delay = Number(document.getElementById("delay").value);

  for (let i = 0; i < count; i++) {
    await fetch(WEBHOOK, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ content: msg })
    });
    await new Promise(r => setTimeout(r, delay));
  }
}

async function rapidSpam() {
  const msg = document.getElementById("rapid").value;
  for (let i = 0; i < 20; i++) {
    fetch(WEBHOOK, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ content: msg })
    });
  }
}

async function updateWebhook() {
  const name = document.getElementById("name").value;
  const avatar = document.getElementById("avatar").value;

  await fetch(WEBHOOK, {
    method: "PATCH",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ name, avatar })
  });

  alert("Webhook actualizada");
}

async function deleteWebhook() {
  if (!confirm("Eliminar webhook permanentemente?")) return;
  await fetch(WEBHOOK, { method: "DELETE" });
  alert("Webhook eliminada");
  location.reload();
       }
