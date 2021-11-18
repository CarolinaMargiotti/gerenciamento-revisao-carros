import models from "../models";
const ClienteModel = models.cliente;

export default class ClienteController {
    //BASIC

    async create(req, res) {
        let { cpf, nome, telefone, endereco } = req.body;

        cpf = (cpf || "").toString().trim();
        nome = (nome || "").toString().trim();
        telefone = (telefone || "").toString().trim();
        endereco = (endereco || "").toString().trim();

        return await ClienteModel.create({
            cpf,
            nome,
            telefone,
            endereco,
        })
            .then((r) => {
                const { cpf, nome, telefone, endereco } = r.get();
                return res.status(200).json({ cpf, nome, telefone, endereco });
            })
            .catch((err) => {
                try {
                    return res.status(400).json({
                        error: err.message,
                        type: "validation",
                    });
                } catch (e) {
                    return res.status(400).json({ error: [e.message] });
                }
            });
    }
}
