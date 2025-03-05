require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// conectar o MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("🔥 Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

//configuração básica do servidor
app.use(cors());
app.use(express.json()); // Permite receber JSON no corpo das requisições

app.get("/", (req, res) => {
    res.send("API de Solicitação de Caixas funcionando!");
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
})