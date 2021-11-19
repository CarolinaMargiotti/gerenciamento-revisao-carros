import express from "express";
const router = express.Router();
import controllers from "../controllers";
const ServicoController = controllers.ServicoController;
const { create, update, remove, find, list } = new ServicoController();

//http://localhost:3100/servico/create {"nome":"troca de óleo","descricao":"faz uma troca de oleo"}
router.post("/create", create);

//http://localhost:3100/servico/update {"id":1,"nome":"reparo de janela","descricao":"repara uma janela"}
router.put("/update", update);

//http://localhost:3100/servico/remove {"id":1}
router.delete("/remove", remove);

//http://localhost:3100/servico/find {"id":1}
router.get("/find", find);

//http://localhost:3100/servico/list {"offset":0,"limit":15}
router.get("/list", list);

router.use((req, res) => {
    res.status(400).json({ error: ["Operação desconhecida com o serviço"] });
});

export default router;
