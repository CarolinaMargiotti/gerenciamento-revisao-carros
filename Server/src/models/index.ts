import database from "../database";

import cliente from "./Cliente";
import revisao from "./revisao";
import servico from "./Servico";
import veiculo from "./veiculo";

// servico.hasMany(revisao, {
//     foreignKey: {
//         name: "id",
//         allowNull: false,
//     },
//     sourceKey: "id",
//     onDelete: "cascade",
//     onUpdate: "cascade",
//     hooks: true, //usado para forçar o cascade no onDelete
// });

veiculo.hasMany(revisao, {
    foreignKey: {
        name: "numeroPlaca",
        allowNull: false,
    },
    sourceKey: "numeroPlaca",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true, //usado para forçar o cascade no onDelete
});

cliente.hasMany(veiculo, {
    foreignKey: {
        name: "cpf",
        allowNull: false,
    },
    sourceKey: "cpf",
    onDelete: "cascade",
    onUpdate: "cascade",
    hooks: true, //usado para forçar o cascade no onDelete
});

database.sync();

export default {
    cliente: cliente,
    revisao: revisao,
    servico: servico,
    veiculo: veiculo,
};
