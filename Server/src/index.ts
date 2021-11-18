import express from "express";
import router from "./routes";
const app = express();
import cors from "cors";
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT: string = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}...`);
});

app.use("/", router);

app.use((req, res) => {
    res.status(400).json({ error: ["URL desconhecida"] });
});
