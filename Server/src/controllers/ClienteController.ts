import models from "../models";
const ClienteModel = models.cliente;
const RevisaoModel = models.revisao;

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

    async update(req, res) {
        let { cpf, nome, telefone, endereco } = req.body;

        cpf = (cpf || "").toString().trim();
        nome = (nome || "").toString().trim();
        telefone = (telefone || "").toString().trim();
        endereco = (endereco || "").toString().trim();

        if (cpf === "") {
            return res
                .status(400)
                .json({ error: ["Forneça identificação do cliente"] });
        }

        return await ClienteModel.findOne({ where: { cpf } })
            .then(async (cliente) => {
                if (cliente) {
                    await cliente.update({ nome, telefone, endereco });
                    return res
                        .status(200)
                        .json({ nome, telefone, endereco, cpf });
                }
                return res
                    .status(400)
                    .json({ error: ["cliente não identificado"] });
            })
            .catch((err) => {
                try {
                    return res.status(400).json({
                        error: err.errors.map((item) => item.message),
                        type: "validation",
                    });
                } catch (e) {
                    return res.status(400).json({ error: [e.message] });
                }
            });
    }

    async remove(req, res) {
        let { cpf } = req.body;
        cpf = (cpf || "").toString();
        if (cpf === "") {
            return res
                .status(400)
                .json({ error: ["Forneça identificação do cliente"] });
        }

        return await ClienteModel.findOne({ where: { cpf } })
            .then(async (cliente) => {
                if (cliente) {
                    const revisao = await RevisaoModel.findOne({
                        where: { cpf: cpf },
                    });
                    if (!revisao) {
                        await cliente.destroy();
                        return res.status(200).json({ cpf });
                    } else {
                        return res.status(400).json({
                            error: [
                                "Não pode ser excluido por estar em revisão",
                            ],
                        });
                    }
                } else {
                    return res
                        .status(400)
                        .json({ error: ["Revisão inexistente"] });
                }
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

    //MISC
    async find(req, res) {
        let { cpf } = req.body;
        cpf = (cpf || "").toString();
        if (cpf === "") {
            return res
                .status(400)
                .json({ error: ["Forneça identificação do cliente"] });
        }

        return await ClienteModel.findOne({ where: { cpf } })
            .then(async (cliente) => {
                if (cliente) {
                    let { cpf, nome, telefone, endereco } = cliente;
                    return res
                        .status(200)
                        .json({ cpf, nome, telefone, endereco });
                }
                return res
                    .status(400)
                    .json({ error: ["Cliente não identificado"] });
            })
            .catch((err) => {
                try {
                    return res.status(400).json({
                        error: err.errors.map((item) => item.message),
                        type: "validation",
                    });
                } catch (e) {
                    return res.status(400).json({ error: [e.message] });
                }
            });
    }

    async list(req, res) {
        let { limit, offset } = req.body;
        return await ClienteModel.findAndCountAll({
            attributes: ["cpf", "nome", "telefone", "endereco"],
            order: [["nome", "ASC"]],
            offset,
            limit,
        })
            .then((cliente) => {
                return res.status(200).json({
                    clientes: cliente.rows.map((item) => item.get()),
                    count: cliente.count,
                });
            })
            .catch((e) => {
                return res.status(400).json({ error: [e.message] });
            });
    }
}
