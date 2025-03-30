const express = require("express");
const Solicitacao = require("../models/Solicitacao");

const router = express.Router();

// 🟢 Criar uma nova solicitação
router.post("/", async (req, res) => {
  try {
    const { fabrica, quantidade } = req.body;
    const novaSolicitacao = new Solicitacao({ fabrica, quantidade });

    await novaSolicitacao.save();
    res.status(201).json({ message: "Solicitação criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar solicitação.", error });
  }
});

// 🔵 Listar todas as solicitações
router.get("/", async (req, res) => {
  try {
    const solicitacoes = await Solicitacao.find();
    res.json(solicitacoes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar solicitações.", error });
  }
});

// 🟡 Atualizar status da solicitação
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const solicitacao = await Solicitacao.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!solicitacao) {
      return res.status(404).json({ message: "Solicitação não encontrada." });
    }

    res.json({ message: "Status atualizado com sucesso!", solicitacao });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar status.", error });
  }
});

module.exports = router;
