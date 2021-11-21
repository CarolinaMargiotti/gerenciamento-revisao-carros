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

    //Cliente
    const createCliente = async (
        cpf: string,
        nome: string,
        telefone: string,
        endereco: string
    ) => {
        try {
            await api.post("/cliente/create", {
                cpf,
                nome,
                telefone,
                endereco,
            });
            alert("sucesso");
        } catch (e: any) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const listCliente = async (offset: number, limit: number) => {
        try {
            const { data } = await api.get("cliente/list", {
                params: {
                    limit,
                    offset,
                },
            });
            return data.clientes;
        } catch (e: any) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const removeCliente = async (cpf: string) => {
        try {
            await api.delete("/cliente/remove", {
                method: "delete",
                params: {
                    cpf,
                },
            });
        } catch (e: any) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const updateCliente = async (
        cpf: string,
        nome: string,
        telefone: string,
        endereco: string
    ) => {
        try {
            await api.put("/cliente/update", {
                cpf,
                nome,
                telefone,
                endereco,
            });
        } catch (e: any) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    return {
        createVeiculo,
        createCliente,
        listCliente,
        removeCliente,
        updateCliente,
    };
};

export default Hooks;
