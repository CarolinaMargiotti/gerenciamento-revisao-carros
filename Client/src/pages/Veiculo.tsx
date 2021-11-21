import React, { useState } from "react";
import Hooks from "../hooks";

function Veiculo() {
    const { createVeiculo } = Hooks();
    const [numeroPlaca, setNumeroPlaca] = useState("");
    const [modelo, setModelo] = useState("");
    const [ano, setAno] = useState(2021);
    const [valor, setValor] = useState(0.0);
    const [cpf, setCpf] = useState("");

    const handle = async (e: any) => {
        e.preventDefault();
        await createVeiculo(numeroPlaca, modelo, ano, valor, cpf);
    };

    return (
        <div>
            <h4>Veiculo</h4>
            <div>
                <label>Numero placa</label>
                <input
                    type="text"
                    value={numeroPlaca}
                    onChange={(e) => setNumeroPlaca(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Modelo</label>
                <input
                    type="text"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Ano</label>
                <input
                    type="text"
                    value={ano}
                    onChange={(e) => setAno(+e.target.value)}
                ></input>
            </div>
            <div>
                <label>Valor</label>
                <input
                    type="text"
                    value={valor}
                    onChange={(e) => setValor(+e.target.value)}
                ></input>
            </div>
            <div>
                <label>CPF</label>
                <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                ></input>
            </div>
            <button onClick={(e) => handle(e)}>Criar</button>
        </div>
    );
}

export default Veiculo;
