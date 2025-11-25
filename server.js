const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3001;

// Dados em memória (MVP apenas)
let prontuario = {};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint para salvar o prontuário
app.post("/prontuario", (req, res) => {
  prontuario = req.body;
  console.log("Prontuário recebido:", prontuario);
  res.status(200).json({ message: "Prontuário salvo com sucesso!" });
});

// Endpoint para obter o prontuário
app.get("/prontuario", (req, res) => {
  if (Object.keys(prontuario).length === 0) {
    return res.status(404).json({ error: "Nenhum prontuário disponível" });
  }
  res.json(prontuario);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor do Prontuário rodando em http://localhost:${PORT}`);
});
