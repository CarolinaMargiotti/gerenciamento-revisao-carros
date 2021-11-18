import express from "express";
const router = express.Router();
import VeiculoController from "../controllers";
const { create } = new VeiculoController();

router.post("/create", create);

router.use((req, res) => {
    res.status(400).json({ error: ["Operação desconhecida com o veiculo"] });
});

export default router;
