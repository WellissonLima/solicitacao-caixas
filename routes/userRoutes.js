const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// 🟢 Rota para registrar um novo usuário
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha, telefone, tipo } = req.body;

    // Verifica se o usuário já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Usuário já cadastrado." });
    }

    // Criptografa a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = new User({ nome, email, senha: senhaHash, telefone, tipo });
    await novoUsuario.save();

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário.", error });
  }
});

// 🔵 Rota para login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login.", error });
  }
});

module.exports = router;
