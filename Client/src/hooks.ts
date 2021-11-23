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
            console.log(e);

            console.log(e.response);
            alert(e.response.data.error[0]);
        }
    };

    const updateVeiculo = async (
        numeroPlaca: string,
        modelo: string,
        ano: number,
        valor: number
    ) => {
        try {
            await api.put("/veiculo/update", {
                numeroPlaca,
                modelo,
                ano,
                valor,
            });
        } catch (e: any) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const listVeiculo = async (offset: number, limit: number) => {
        try {
            const { data } = await api.get("veiculo/list", {
                params: {
                    limit,
                    offset,
                },
            });
            return data.veiculos;
        } catch (e: any) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const removeVeiculo = async (numeroPlaca: string) => {
        try {
            await api.delete("/veiculo/remove", {
                method: "delete",
                params: {
                    numeroPlaca,
                },
            });
        } catch (e: any) {
            console.log(e.message);
            alert(e.response.data.error[0]);
        }
    };

    const findVeiculo = async (numeroPlaca: string) => {
        try {
            const data = await (
                await api.get("veiculo/find", { params: { numeroPlaca } })
            ).data;
            return data;
        } catch (e: any) {
            console.log(e.message);
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

    const findCliente = async (cpf: string) => {
        try {
            const data = await (
                await api.get("cliente/find", { params: { cpf } })
            ).data;
            return data;
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return {
        createVeiculo,
        updateVeiculo,
        listVeiculo,
        removeVeiculo,
        findVeiculo,
        createCliente,
        listCliente,
        removeCliente,
        updateCliente,
        findCliente,
    };
};

export default Hooks;
