import { Sequelize } from "sequelize";
require("dotenv").config();

let data: any;
(() => {
    try {
        data = new Sequelize(process.env.BD_URL, {
            logging: false,
        });

        data.authenticate()
            .then(() => {
                console.log("Conexão realizada com o SGBD");
            })
            .catch((error) => {
                console.log(
                    "Não foi possivel conectar com o SGBD",
                    error.message
                );
            });
    } catch (e) {
        console.log(e.message);
    }
})();

export default data;
