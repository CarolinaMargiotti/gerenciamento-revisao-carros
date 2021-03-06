import Sequelize from "sequelize";
import Database from "../database";

const veiculo: any = Database.define(
    "veiculo",
    {
        numeroPlaca: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: { args: true, msg: "Essa placa ja existe no sistema" },
        },
        cpf: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: "cliente",
                key: "cpf",
            },
        },
        modelo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ano: {
            type: Sequelize.INTEGER,
        },
        valor: {
            type: Sequelize.FLOAT,
        },
    },
    {
        freezeTableName: true,
    }
);

export default veiculo;
