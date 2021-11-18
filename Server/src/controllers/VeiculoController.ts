import models from "../models";
const veiculo = models.veiculo;

export default class VeiculoController {
    async create(req, res) {
        let { numeroPlaca, modelo, ano, valor } = req.body;

        numeroPlaca = (numeroPlaca || "").toString().trim();
        modelo = (modelo || "").toString().trim();

        return await veiculo
            .create({ numeroPlaca, modelo, ano, valor })
            .then((r) => {
                const { numeroPlaca, modelo, ano, valor } = r.get();
                return res
                    .status(200)
                    .json({ numeroPlaca, modelo, ano, valor });
            })
            .catch((err) => {
                try {
                    return res.status(400).json({
                        error: err,
                        type: "validation",
                    });
                } catch (e) {
                    return res.status(400).json({ error: [e.message] });
                }
            });
    }
}
