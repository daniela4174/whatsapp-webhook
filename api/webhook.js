const express = require("express");
const app = express();

app.use(express.json());

// Rota para verificação do webhook (GET)
app.get("/api/webhook", (req, res) => {
  const VERIFY_TOKEN = "vxh7"; // o mesmo que você colocou no Meta
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado com sucesso!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Rota para receber mensagens (POST)
app.post("/api/webhook", (req, res) => {
  console.log("Mensagem recebida:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

module.exports = app;
