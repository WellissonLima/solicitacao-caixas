const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true }, // Para WhatsApp
    tipo: { type: String, enum: ["fabrica", "higienizacao"], required: true }, // Tipo de usuário
});

module.exports = mongoose.model("User", UserSchema);