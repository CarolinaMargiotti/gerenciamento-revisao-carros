import models from "../models";
import veiculo from "../models/veiculo";
const VeiculoModel = models.veiculo;
const RevisaoModel = models.revisao;

export default class VeiculoController {
    //BASIC

    async create(req, res) {
        let { numeroPlaca, modelo, ano, valor, cpf } = req.body;

        numeroPlaca = (numeroPlaca || "").toString().trim();
        modelo = (modelo || "").toString().trim();
        ano = (ano || "").toString().trim();
        valor = (valor || "").toString().trim();
        cpf = (cpf || "").toString().trim();

        return await VeiculoModel.create({
            numeroPlaca,
            modelo,
            ano,
            valor,
            cpf,
        })
            .then((r) => {
                const { numeroPlaca, modelo, ano, valor, cpf } = r.get();
                return res
                    .status(200)
                    .json({ numeroPlaca, modelo, ano, valor, cpf });
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
        let { numeroPlaca, modelo, ano, valor, cpf } = req.body;
        numeroPlaca = (numeroPlaca || "").toString();
        modelo = (modelo || "").toString().trim();
        ano = (ano || "").toString().trim();
        valor = (valor || "").toString().trim();
        cpf = (cpf || "").toString().trim();

        if (numeroPlaca === "") {
            return res
                .status(400)
                .json({ error: ["Forneça identificação do veiculo"] });
        }

        return await VeiculoModel.findOne({ where: { numeroPlaca } })
            .then(async (veiculo) => {
                if (veiculo) {
                    await veiculo.update({ modelo, ano, valor, cpf });
                    return res
                        .status(200)
                        .json({ numeroPlaca, modelo, ano, valor, cpf });
                }
                return res
                    .status(400)
                    .json({ error: ["Veiculo não identificado"] });
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
        let { numeroPlaca } = req.body;
        numeroPlaca = (numeroPlaca || "").toString();
        if (numeroPlaca === "") {
            return res
                .status(400)
                .json({ error: ["Forneça identificação do veiculo"] });
        }

        return await VeiculoModel.findOne({ where: { numeroPlaca } })
            .then(async (veiculo) => {
                if (veiculo) {
                    const revisao = await RevisaoModel.findOne({
                        where: { numeroPlaca },
                    });
                    if (!revisao) {
                        await veiculo.destroy();
                        return res.status(200).json({ numeroPlaca });
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
        let { numeroPlaca } = req.body;
        numeroPlaca = (numeroPlaca || "").toString();
        if (numeroPlaca === "") {
            return res
                .status(400)
                .json({ error: ["Forneça identificação do veiculo"] });
        }

        return await VeiculoModel.findOne({ where: { numeroPlaca } })
            .then(async (veiculo) => {
                if (veiculo) {
                    let { numeroPlaca, modelo, ano, valor, cpf } = veiculo;
                    return res
                        .status(200)
                        .json({ numeroPlaca, modelo, ano, valor, cpf });
                }
                return res
                    .status(400)
                    .json({ error: ["Veiculo não identificado"] });
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
        return await VeiculoModel.findAndCountAll({
            attributes: ["numeroPlaca", "cpf", "modelo", "ano", "valor"],
            order: [["numeroPlaca", "ASC"]],
            offset,
            limit,
        })
            .then((veiculo) => {
                return res.status(200).json({
                    vacinas: veiculo.rows.map((item) => item.get()),
                    count: veiculo.count,
                });
            })
            .catch((e) => {
                return res.status(400).json({ error: [e.message] });
            });
    }
}
