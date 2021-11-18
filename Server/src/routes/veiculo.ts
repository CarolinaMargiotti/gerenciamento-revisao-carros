import express from "express";
const router = express.Router();
import controllers from "../controllers";
const VeiculoController = controllers.VeiculoController;
const { create, update, find, remove, list } = new VeiculoController();

// localhost:3100/veiculo/create  {"numeroPlaca":"abcd-1234","modelo":"2002","ano":"2002","valor":"150","cpf":"12345678"}
router.post("/create", create);

//localhost:3100/veiculo/update {"numeroPlaca":"abcd-1234","modelo":"2002","ano":"2002","valor":"150","cpf":"12345678"}
router.put("/update", update);

//localhost:3100/veiculo/find {"numeroPlaca":"abcd-1234"}
router.get("/find", find);

//localhost:3100/veiculo/remove {"numeroPlaca":"abcd-1234"}
router.delete("/remove", remove);

router.get("/list", list);

router.use((req, res) => {
    res.status(400).json({ error: ["Operação desconhecida com o veiculo"] });
});

export default router;
