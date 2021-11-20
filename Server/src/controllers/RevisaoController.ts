import models from "../models";
const VeiculoModel = models.veiculo;
const RevisaoModel = models.revisao;
const revisaoModel = models.revisao;
const ClienteModel = models.cliente;
import { Op } from "sequelize";

export default class RevisaoController {
    async create(req, res) {
        let { data, cpf, numeroPlaca, status, relatorio, servicos } = req.body;

        data = (data || "").toString().trim();
        numeroPlaca = (numeroPlaca || "").toString().trim();
        cpf = (cpf || "").toString().trim();
        status = (status || "").toString().trim();
        relatorio = (relatorio || "").toString().trim();

        if (!cpf) {
            return res.status(400).json({ error: ["Forneça um CPF"] });
        }

        if (!numeroPlaca) {
            return res
                .status(400)
                .json({ error: ["Forneça uma placa de veiculo"] });
        }

        const veiculo = VeiculoModel.findOne({ where: numeroPlaca });
        const cliente = ClienteModel.findOne({ where: cpf });

        servicos.forEach((servico) => {
            const servicoFound = revisaoModel.findOne({
                where: { id: servico },
            });

            if (!servicoFound) {
                return res
                    .status(400)
                    .json({ error: ["Serviço não registrado"] });
            }
        });

        if (!veiculo) {
            return res
                .status(400)
                .json({ error: ["Placa não tem veiculo registrado"] });
        }

        if (!cliente) {
            return res.status(400).json({ error: ["CPF não registrado"] });
        }

        return await RevisaoModel.create({
            data,
            cpf,
            numeroPlaca,
            status,
            relatorio,
            servicos,
        })
            .then((r) => {
                const { data, cpf, numeroPlaca, status, relatorio, servicos } =
                    r.get();
                return res.status(200).json({
                    data,
                    cpf,
                    numeroPlaca,
                    status,
                    relatorio,
                    servicos,
                });
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
        let { id, data, status, relatorio, servicos } = req.body;

        id = (id || "").toString().trim();
        data = (data || "").toString().trim();
        servicos = (servicos || "").toString().trim();

        if (!id) {
            return res.status(400).json({ error: ["Forneça a identificacao"] });
        }

        servicos.forEach((servico) => {
            const servicoFound = revisaoModel.findOne({
                where: { id: servico },
            });

            if (!servicoFound) {
                return res
                    .status(400)
                    .json({ error: ["Serviço não registrado"] });
            }
        });

        return await RevisaoModel.findOne({ where: { id } })
            .then(async (revisao) => {
                if (revisao) {
                    await revisao.update({ data, status, relatorio, servicos });
                    return res
                        .status(200)
                        .json({ data, status, relatorio, servicos });
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
                .json({ error: ["Forneça identificação da revisão"] });
        }

        return await RevisaoModel.findOne({ id })
            .then(async (revisao) => {
                if (revisao) {
                    await revisao.destroy();
                    return res.status(200).json({ id });
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
                .json({ error: ["Forneça identificação da revisão"] });
        }

        return await revisaoModel
            .findOne({ where: { id } })
            .then(async (revisao) => {
                if (revisao) {
                    let { id, data, status, relatorio, servicos } = revisao;
                    return res
                        .status(200)
                        .json({ id, data, status, relatorio, servicos });
                }
                return res
                    .status(400)
                    .json({ error: ["Revisão não identificada"] });
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
        return await revisaoModel
            .findAndCountAll({
                attributes: ["id", "data", "status", "relatorio", "servicos"],
                order: [["id", "ASC"]],
                offset,
                limit,
            })
            .then((revisao) => {
                return res.status(200).json({
                    Revisoes: revisao.rows.map((item) => item.get()),
                    count: revisao.count,
                });
            })
            .catch((e) => {
                return res.status(400).json({ error: [e.message] });
            });
    }
}
