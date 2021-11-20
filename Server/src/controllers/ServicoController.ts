import models from "../models";
const ServicoModel = models.servico;
const RevisaoModel = models.revisao;
import { Op } from "sequelize";

export default class ServicoController {
    //BASIC

    async create(req, res) {
        let { nome, descricao } = req.body;

        nome = nome || "";
        descricao = descricao || "";

        return await ServicoModel.create({
            nome,
            descricao,
        })
            .then((r) => {
                const { nome, descricao } = r.get();
                return res.status(200).json({ nome, descricao });
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
        let { id, nome, descricao } = req.body;

        id = id || "";
        nome = nome || "";
        descricao = descricao || "";

        if (id === "") {
            return res
                .status(400)
                .json({ error: ["Forneça identificação do servico"] });
        }

        return await ServicoModel.findOne({ where: { id } })
            .then(async (servico) => {
                if (servico) {
                    await servico.update({ nome, descricao });
                    return res.status(200).json({ nome, descricao });
                }
                return res
                    .status(400)
                    .json({ error: ["Serviço não identificado"] });
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
        let { id } = req.body;
        id = (id || "").toString();

        if (id === "") {
            return res
                .status(400)
                .json({ error: ["Forneça identificação do servico"] });
        }

        return await ServicoModel.findOne({ where: { id } })
            .then(async (servico) => {
                if (servico) {
                    const revisao = await RevisaoModel.findOne({
                        where: { servicos: { [Op.contains]: [id] } },
                    });

                    if (!revisao) {
                        await servico.destroy();
                        return res.status(200).json({ id });
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

    // MISC
    async find(req, res) {
        let { id } = req.body;
        id = (id || "").toString();
        if (id === "") {
            return res
                .status(400)
                .json({ error: ["Forneça identificação do serviço"] });
        }

        return await ServicoModel.findOne({ where: { id } })
            .then(async (servico) => {
                if (servico) {
                    let { id, nome, descricao } = servico;
                    return res.status(200).json({ id, nome, descricao });
                }
                return res
                    .status(400)
                    .json({ error: ["Serviço não identificado"] });
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
        return await ServicoModel.findAndCountAll({
            attributes: ["id", "nome", "descricao"],
            order: [["id", "ASC"]],
            offset,
            limit,
        })
            .then((servico) => {
                return res.status(200).json({
                    servicos: servico.rows.map((item) => item.get()),
                    count: servico.count,
                });
            })
            .catch((e) => {
                return res.status(400).json({ error: [e.message] });
            });
    }
}
