const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001; // Vercel injeta a porta automaticamente

// Dados em memória (AVISO: Serão apagados quando a função serverless reiniciar)
let prontuario = {};

app.use(cors());
app.use(express.json());
// Nota: Na Vercel, arquivos estáticos geralmente ficam na pasta 'public' na raiz
app.use(express.static(path.join(__dirname, "public")));

app.post("/prontuario", (req, res) => {
  prontuario = req.body;
  console.log("Prontuário recebido:", prontuario);
  res.status(200).json({ message: "Prontuário salvo com sucesso!" });
});

app.get("/prontuario", (req, res) => {
  // Verificação simples se está vazio
  if (!prontuario || Object.keys(prontuario).length === 0) {
    return res
      .status(404)
      .json({ error: "Nenhum prontuário disponível (Memória limpa ou vazia)" });
  }
  res.json(prontuario);
});

// A Vercel precisa que você EXPORTE a aplicação
module.exports = app;

// O app.listen só deve rodar se você estiver testando localmente no seu PC
// Se o arquivo for executado diretamente, ele sobe o servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando localmente na porta ${PORT}`);
  });
}
