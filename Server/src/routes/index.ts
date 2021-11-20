import express from "express";
const router = express.Router();
import veiculo from "./veiculo";
import cliente from "./cliente";
import servico from "./servico";
import revisao from "./revisao";

router.use("/veiculo", veiculo);
router.use("/cliente", cliente);
router.use("/servico", servico);
router.use("/revisao", revisao);

router.use((req, res) => {
    res.status(400).json({ error: ["Operação desconhecida"] });
});

export default router;
