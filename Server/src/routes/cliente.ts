import express from "express";
const router = express.Router();
import controllers from "../controllers";
const ClienteController = controllers.ClienteController;
const { create } = new ClienteController();

router.post("/create", create);

export default router;
