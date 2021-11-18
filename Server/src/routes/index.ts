import express from "express";
const router = express.Router();
import veiculo from "./veiculo";

router.use("/veiculo", veiculo);

router.use((req, res) => {
    res.status(400).json({ error: ["Operação desconhecida"] });
});

export default router;
