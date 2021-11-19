import express from "express";
const router = express.Router();
import controllers from "../controllers";
const ClienteController = controllers.ClienteController;
const { create, update, remove, find, list } = new ClienteController();

//http://localhost:3100/cliente/create {"cpf":"12345678","nome":"vini fofinho porco","telefone":"000000000","endereco":"minha casa"}
router.post("/create", create);

//http://localhost:3100/cliente/create {"cpf":"12345678","nome":"vini fofinho","telefone":"111111111","endereco":"gaiola"}
router.put("/update", update);

//http://localhost:3100/cliente/remove {"cpf":"12345678"}
router.delete("/remove", remove);

//http://localhost:3100/cliente/find {"cpf":"12345678"}
router.get("/find", find);

//http://localhost:3100/cliente/list {"offset":0,"limit":15}
router.get("/list", list);

export default router;
