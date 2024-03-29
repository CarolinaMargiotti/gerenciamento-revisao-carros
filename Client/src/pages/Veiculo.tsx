import React, { useEffect, useState } from "react";
import Hooks from "../hooks";
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Input,
    Table,
    Form,
    FormGroup,
    Container,
    Label,
} from "reactstrap";

function Veiculo() {
    const {
        createVeiculo,
        listVeiculo,
        removeVeiculo,
        findCliente,
        updateVeiculo,
        findVeiculo,
    } = Hooks();
    const [numeroPlaca, setNumeroPlaca] = useState("");
    const [modelo, setModelo] = useState("");
    const [ano, setAno] = useState(2021);
    const [valor, setValor] = useState("0");
    const [cpf, setCpf] = useState("");
    const [veiculos, setVeiculos] = useState([]);

    const [cpfErro, setCpfErro] = useState(true);
    const [valorErro, setValorErro] = useState(true);
    const [modeloErro, setModeloErro] = useState(true);
    const [anoErro, setAnoErro] = useState(false);
    const [numeroPlacaErro, setNumeroPlacaErro] = useState(true);

    const [valorEditErro, setEditValorErro] = useState(false);
    const [modeloEditErro, setEditModeloErro] = useState(false);
    const [anoEditErro, setEditAnoErro] = useState(false);

    const [veiculoProcurado, setVeiculoProcurado] = useState({
        numeroPlaca: "",
        modelo: "",
        ano: 2021,
        valor: "0",
        cpf: "",
    });
    const [veiculoProcurar, setVeiculoProcurar] = useState("");
    const [mostrar, setMostrar] = useState(false);

    const [offset, setOffset] = useState(0);
    // eslint-disable-next-line
    const [limit, setLimit] = useState(12);

    const [showModal, setShowModal] = useState(false);
    const [modalDataValores, setModalDataValores] = useState({
        numeroPlaca: "",
        modelo: "",
        ano: 2021,
        valor: "0",
    });

    useEffect(() => {
        retrieveVeiculos();
    }, [offset]);

    const retrieveVeiculos = async () => {
        const data = await listVeiculo(offset, limit);
        if (data.length === 0) {
            setOffset(Math.max(offset - limit, 0));
        }

        setVeiculos(data);
    };

    const handle = async (e: any) => {
        e.preventDefault();

        await createVeiculo(numeroPlaca, modelo, ano, valor, cpf);
        retrieveVeiculos();
    };

    const editar = async (e: any) => {
        const { numeroPlaca, modelo, ano, valor } = modalDataValores;
        e.preventDefault();

        await updateVeiculo(numeroPlaca, modelo, ano, valor);
        retrieveVeiculos();
        desativarModal(e);
    };

    const remover = async (e: any, numeroPlaca: string) => {
        e.preventDefault();
        await removeVeiculo(numeroPlaca);
        retrieveVeiculos();
    };

    const limpar = (e: any) => {
        e.preventDefault();
        setNumeroPlaca("");
        setModelo("");
        setAno(2021);
        setValor("0");
        setCpf("");
        checkNumeroPlaca();
        checkModelo();
        checkAno();
        checkValor();
        checkCPF();
    };

    const ativarModal = (
        e: any,
        numeroPlaca: string,
        modelo: string,
        ano: number,
        valor: string
    ) => {
        e.preventDefault();
        setModalDataValores({
            numeroPlaca: numeroPlaca,
            modelo: modelo,
            ano: ano,
            valor: valor,
        });
        setShowModal(true);
    };

    const desativarModal = (e: any) => {
        e.preventDefault();
        setShowModal(false);
        setModalDataValores({
            numeroPlaca: "",
            modelo: "",
            ano: 2021,
            valor: "0",
        });
    };

    const procurar = async () => {
        limparProcurado();
        const data = await findVeiculo(veiculoProcurar);
        if (data) {
            setVeiculoProcurado({
                numeroPlaca: data.numeroPlaca,
                modelo: data.modelo,
                ano: data.ano,
                valor: data.valor,
                cpf: data.cpf,
            });
            setMostrar(true);
            setVeiculoProcurar(veiculoProcurar);
        }
    };

    const limparProcurado = () => {
        setMostrar(false);
        setVeiculoProcurar("");
        setVeiculoProcurado({
            numeroPlaca: "",
            modelo: "",
            ano: 2021,
            valor: "0",
            cpf: "",
        });
    };

    const anterior = (e: any) => {
        e.preventDefault();
        const newOffset = Math.max(offset - limit, 0);
        setOffset(newOffset);
    };

    const proximo = (e: any) => {
        e.preventDefault();
        const newOffset = offset + limit;
        setOffset(newOffset);
    };

    const checkCPF = async () => {
        const res = await findCliente(cpf);

        if (!res) {
            setCpfErro(true);
            return;
        }

        setCpfErro(false);
    };

    const checkValor = () => {
        const va = Number(valor);
        setValorErro(isNaN(va));
    };

    const checkNumeroPlaca = () => {
        setNumeroPlacaErro(numeroPlaca.length !== 8);
    };

    const checkModelo = () => {
        setModeloErro(modelo.length === 0);
    };

    const checkAno = () => {
        setAnoErro(ano <= 1500);
    };

    const checkEditValor = () => {
        const va = Number(modalDataValores.valor);
        setEditValorErro(isNaN(va));
    };

    const checkEditModelo = () => {
        setEditModeloErro(modalDataValores.modelo.length !== 0);
    };

    const checkEditAno = () => {
        setEditAnoErro(modalDataValores.ano <= 1500);
    };

    function hasErrors() {
        return cpfErro || valorErro || numeroPlacaErro || modeloErro || anoErro;
    }

    return (
        <div>
            <Modal isOpen={showModal}>
                <ModalHeader>Editar Veiculo</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Modelo</Label>
                            <Input
                                type="text"
                                value={modalDataValores.modelo}
                                onChange={(e) =>
                                    setModalDataValores({
                                        numeroPlaca:
                                            modalDataValores.numeroPlaca,
                                        modelo: e.target.value,
                                        ano: modalDataValores.ano,
                                        valor: modalDataValores.valor,
                                    })
                                }
                                onBlur={() => checkEditModelo()}
                                valid={modeloEditErro}
                                invalid={!modeloEditErro}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Ano</Label>
                            <Input
                                type="number"
                                value={modalDataValores.ano}
                                onChange={(e) =>
                                    setModalDataValores({
                                        numeroPlaca:
                                            modalDataValores.numeroPlaca,
                                        modelo: modalDataValores.modelo,
                                        ano: +e.target.value,
                                        valor: modalDataValores.valor,
                                    })
                                }
                                onBlur={() => checkEditAno()}
                                valid={!anoEditErro}
                                invalid={anoEditErro}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Valor</Label>
                            <Input
                                type="text"
                                value={modalDataValores.valor}
                                onChange={(e) =>
                                    setModalDataValores({
                                        numeroPlaca:
                                            modalDataValores.numeroPlaca,
                                        modelo: modalDataValores.modelo,
                                        ano: modalDataValores.ano,
                                        valor: e.target.value,
                                    })
                                }
                                onBlur={() => checkEditValor()}
                                valid={!valorEditErro}
                                invalid={valorEditErro}
                            ></Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={(e) => editar(e)}
                        disabled={valorEditErro}
                    >
                        Editar
                    </Button>
                    <Button onClick={(e) => desativarModal(e)}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <h4 className="mt-3 mb-5">Veiculo</h4>
            <h5>Cadastro de veiculo</h5>
            <Form>
                <FormGroup>
                    <Label>Numero placa</Label>
                    <Input
                        type="text"
                        value={numeroPlaca}
                        onChange={(e) => setNumeroPlaca(e.target.value)}
                        onBlur={() => checkNumeroPlaca()}
                        invalid={numeroPlacaErro}
                        valid={!numeroPlacaErro}
                    ></Input>
                    <small
                        className="text-danger"
                        style={{
                            visibility: numeroPlacaErro ? "visible" : "hidden",
                        }}
                    >
                        Numero de placa invalido.
                    </small>
                </FormGroup>
                <FormGroup>
                    <Label>Modelo</Label>
                    <Input
                        type="text"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        onBlur={() => checkModelo()}
                        valid={!modeloErro}
                        invalid={modeloErro}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Ano</Label>
                    <Input
                        type="number"
                        value={ano}
                        onChange={(e) => setAno(+e.target.value)}
                        onBlur={() => checkAno()}
                        valid={!anoErro}
                        invalid={anoErro}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Valor</Label>
                    <Input
                        type="text"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        onBlur={() => checkValor()}
                        valid={!valorErro}
                        invalid={valorErro}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label>CPF</Label>
                    <Input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        onBlur={() => checkCPF()}
                        valid={!cpfErro}
                        invalid={cpfErro}
                    ></Input>
                    <small
                        style={{ visibility: cpfErro ? "visible" : "hidden" }}
                        className="text-danger"
                    >
                        CPF não cadastrado
                    </small>
                </FormGroup>
                <FormGroup>
                    <Container>
                        <div className="row">
                            <Button
                                color="primary"
                                className="col col-auto"
                                onClick={(e) => handle(e)}
                                disabled={hasErrors()}
                            >
                                Criar
                            </Button>

                            <div className="col col-auto" />
                            <Button
                                size="sm"
                                className="col col-auto"
                                onClick={(e) => limpar(e)}
                            >
                                Limpar
                            </Button>
                        </div>
                    </Container>
                </FormGroup>

                <div className="mt-5 mb-5">
                    <h5>Procurar por numero da placa</h5>
                    <Form className="row">
                        <div className="col col-auto">
                            <FormGroup>
                                <Input
                                    type="text"
                                    value={veiculoProcurar}
                                    onChange={(e) =>
                                        setVeiculoProcurar(e.target.value)
                                    }
                                ></Input>
                            </FormGroup>
                        </div>
                        <div className="col col-auto">
                            <FormGroup>
                                <Container>
                                    <div className="row">
                                        <Button
                                            className="col col-auto"
                                            size="sm"
                                            onClick={() => procurar()}
                                        >
                                            Procurar
                                        </Button>
                                        <div className="col col-auto" />
                                        <Button
                                            className="col col-auto"
                                            size="sm"
                                            onClick={() => limparProcurado()}
                                        >
                                            Limpar
                                        </Button>
                                    </div>
                                </Container>
                            </FormGroup>
                        </div>
                    </Form>
                    {mostrar && (
                        <Table className="border border-1 border-dark">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>Numero da Placa</th>
                                    <th>CPF</th>
                                    <th>Modelo</th>
                                    <th>Ano</th>
                                    <th>Valor</th>
                                    <th>Editar</th>
                                    <th>Deletar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{veiculoProcurado.numeroPlaca}</td>
                                    <td>{veiculoProcurado.cpf}</td>
                                    <td>{veiculoProcurado.modelo}</td>
                                    <td>{veiculoProcurado.ano}</td>
                                    <td>{veiculoProcurado.valor}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            onClick={(e) =>
                                                ativarModal(
                                                    e,
                                                    veiculoProcurado.numeroPlaca,
                                                    veiculoProcurado.modelo,
                                                    veiculoProcurado.ano,
                                                    veiculoProcurado.valor
                                                )
                                            }
                                        >
                                            Editar
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            size="sm"
                                            onClick={(e) =>
                                                remover(
                                                    e,
                                                    veiculoProcurado.numeroPlaca
                                                )
                                            }
                                        >
                                            Deletar
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                </div>

                <h5>Tabela de veiculos</h5>
                <Table
                    striped
                    className="border border-1 border-dark table-hover"
                >
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Numero da Placa</th>
                            <th>CPF</th>
                            <th>Modelo</th>
                            <th>Ano</th>
                            <th>Valor</th>
                            <th>Editar</th>
                            <th>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {veiculos !== undefined &&
                            veiculos.map((item: any, index: number) => (
                                <tr>
                                    <td>{item.numeroPlaca}</td>
                                    <td>{item.cpf}</td>
                                    <td>{item.modelo}</td>
                                    <td>{item.ano}</td>
                                    <td>{item.valor}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            onClick={(e) =>
                                                ativarModal(
                                                    e,
                                                    item.numeroPlaca,
                                                    item.modelo,
                                                    item.ano,
                                                    item.valor
                                                )
                                            }
                                        >
                                            Editar
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            size="sm"
                                            onClick={(e) =>
                                                remover(e, item.numeroPlaca)
                                            }
                                        >
                                            Deletar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Form>

            <FormGroup>
                <Container>
                    <div className="row pb-3">
                        <Button
                            className="col col-auto"
                            size="sm"
                            onClick={(e) => anterior(e)}
                        >
                            Anterior
                        </Button>
                        <div className="col col-auto" />
                        <Button
                            className="col col-auto"
                            size="sm"
                            onClick={(e) => proximo(e)}
                        >
                            Próximo
                        </Button>
                    </div>
                </Container>
            </FormGroup>
        </div>
    );
}

export default Veiculo;
