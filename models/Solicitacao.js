const mongoose = require("mongoose");

const SolicitacaoSchema = new mongoose.Schema({
    fabrica: { type: String, required: true },
    quantidade: { type: Number, required: true },
    status: { Type: String, enum: ["pendente", "atendido"], default: "pendente" },
    dataCriacao: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Solicitacao", SolicitacaoSchema);