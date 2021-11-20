import express from "express";
const router = express.Router();
import controllers from "../controllers";
const RevisaoController = controllers.RevisaoController;
const { create, update, remove, find, list } = new RevisaoController();

//http://localhost:3100/revisao/create {"data":"2021-05-01","numeroPlaca":"abcd-1234","cpf":"12345678","status":true,"relatorio":"","servicos":[1]}
router.post("/create", create);

//http://localhost:3100/revisao/create {"id":1,"data":"2021-05-01","status":true,"relatorio":"","servicos":[1]}
router.put("/update", update);

//http://localhost:3100/revisao/remove {"id":1}
router.delete("/remove", remove);

//http://localhost:3100/revisao/find {"id":1}
router.get("/find", find);

//http://localhost:3100/revisao/list {"offset":0,"limit":15}
router.get("/list", list);

router.use((req, res) => {
    res.status(400).json({ error: ["Operação desconhecida com o serviço"] });
});

export default router;
