import Sequelize from "sequelize";
import Database from "../database";

const revisao: any = Database.define(
    "revisao",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        data: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cpf: {
            type: Sequelize.STRING,
            allowNull: false,
            refenreces: {
                model: "cliente",
                key: "cpf",
            },
        },
        numeroPlaca: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: "veiculo",
                key: "numeroPlaca",
            },
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        relatorio: {
            type: Sequelize.STRING,
            alllowNull: true,
        },
        servicos: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

export default revisao;
