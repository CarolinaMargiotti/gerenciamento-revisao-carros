import Sequelize from "sequelize";
import Database from "../database";

const servico: any = Database.define(
    "servico",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        descricao: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);

export default servico;
