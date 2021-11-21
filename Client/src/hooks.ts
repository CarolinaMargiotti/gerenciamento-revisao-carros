import api from "./api";

const Hooks = () => {
    //Veiculo
    const createVeiculo = async (
        numeroPlaca: string,
        modelo: string,
        ano: number,
        valor: number,
        cpf: string
    ) => {
        try {
            await api.post("/veiculo/create", {
                numeroPlaca,
                modelo,
                ano,
                valor,
                cpf,
            });
        } catch (e: any) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    return {
        createVeiculo,
    };
};

export default Hooks;
