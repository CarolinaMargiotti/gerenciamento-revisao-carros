import Sequelize from "sequelize";
import Database from "../database";

const cliente: any = Database.define(
    "cliente",
    {
        cpf: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            unique: {
                args: true,
                msg: "Cliente ja cadastrado",
            },
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        telfone: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        endereco: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true,
    }
);

export default cliente;
