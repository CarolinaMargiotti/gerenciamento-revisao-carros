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

function Cliente() {
    const {
        createCliente,
        listCliente,
        removeCliente,
        updateCliente,
        findCliente,
    } = Hooks();
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [offset, setOffset] = useState(0);
    const [cpfErro, setCpfErro] = useState(true);
    const [telErro, setTelErro] = useState(true);
    const [nomeErro, setNomeErro] = useState(true);
    const [enderecoErro, setEnderecoErro] = useState(true);

    const [editNomeErro, setEditNomeErro] = useState(false);
    const [editEnderecoErro, setEditEnderecoErro] = useState(false);
    const [editTelErro, setEditTelErro] = useState(false);
    // eslint-disable-next-line
    const [limit, setLimit] = useState(12);
    const [clientes, setClientes] = useState([]);

    const [clienteProcurado, setClienteProcurado] = useState({
        cpf: "",
        nome: "",
        telefone: "",
        endereco: "",
    });
    const [cpfProcurar, setCpfProcurar] = useState("");
    const [mostrar, setMostrar] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalDataValores, setModalDataValores] = useState({
        cpf: "",
        nome: "",
        telefone: "",
        endereco: "",
    });

    useEffect(() => {
        retrieveClientes();
    }, [offset]);

    const retrieveClientes = async () => {
        const data = await listCliente(offset, limit);
        if (data.length === 0) {
            setOffset(Math.max(offset - limit, 0));
        }
        setClientes(data);
    };

    const handle = async (e: any) => {
        e.preventDefault();

        await createCliente(cpf, nome, telefone, endereco);
        retrieveClientes();
    };

    const limpar = () => {
        setNome("");
        setTelefone("");
        setCpf("");
        setEndereco("");
        checkCPF();
        checkEndereco();
        checkNome();
        checkTel();
    };

    const remover = async (e: any, cpf: string) => {
        e.preventDefault();
        await removeCliente(cpf);
        retrieveClientes();
    };

    const editar = async (e: any) => {
        const { cpf, nome, telefone, endereco } = modalDataValores;
        e.preventDefault();
        await updateCliente(cpf, nome, telefone, endereco);
        retrieveClientes();
        desativarModal(e);
    };

    const ativarModal = async (
        e: any,
        cpf: string,
        nome: string,
        telefone: string,
        endereco: string
    ) => {
        e.preventDefault();
        setModalDataValores({
            cpf: cpf,
            nome: nome,
            telefone: telefone,
            endereco: endereco,
        });
        setShowModal(true);
    };

    const desativarModal = (e: any) => {
        e.preventDefault();
        setShowModal(false);
        setModalDataValores({
            cpf: "",
            nome: "",
            telefone: "",
            endereco: "",
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

    const procurar = async () => {
        limparProcurado();
        const data = await findCliente(cpfProcurar);
        if (data) {
            setClienteProcurado({
                cpf: data.cpf,
                nome: data.nome,
                telefone: data.telefone,
                endereco: data.endereco,
            });
            setMostrar(true);
            setCpfProcurar(cpfProcurar);
        }
    };

    const limparProcurado = () => {
        setMostrar(false);
        setCpfProcurar("");
        setClienteProcurado({
            cpf: "",
            nome: "",
            telefone: "",
            endereco: "",
        });
    };

    const checkCPF = () => {
        setCpfErro(cpf.length !== 11);
    };

    const checkTel = () => {
        setTelErro(telefone.length !== 11);
    };
    const checkNome = () => {
        setNomeErro(nome.length === 0);
    };

    const checkEndereco = () => {
        setEnderecoErro(endereco.length === 0);
    };

    const checkEditNome = () => {
        setEditNomeErro(modalDataValores.nome.length === 0);
    };

    const checkEditTel = () => {
        setEditTelErro(modalDataValores.telefone.length !== 11);
    };
    const checkEditEndereco = () => {
        setEditEnderecoErro(modalDataValores.endereco.length === 0);
    };

    return (
        <div>
            <Modal isOpen={showModal}>
                <ModalHeader>Editar Cliente</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Nome</Label>
                            <Input
                                type="text"
                                value={modalDataValores.nome}
                                onChange={(e) =>
                                    setModalDataValores({
                                        nome: e.target.value,
                                        cpf: modalDataValores.cpf,
                                        telefone: modalDataValores.telefone,
                                        endereco: modalDataValores.endereco,
                                    })
                                }
                                onBlur={() => checkEditNome()}
                                valid={!editNomeErro}
                                invalid={editNomeErro}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Telefone</Label>
                            <Input
                                type="number"
                                value={modalDataValores.telefone}
                                onChange={(e) =>
                                    setModalDataValores({
                                        telefone: e.target.value,
                                        cpf: modalDataValores.cpf,
                                        nome: modalDataValores.nome,
                                        endereco: modalDataValores.endereco,
                                    })
                                }
                                onBlur={() => checkEditTel()}
                                valid={!editTelErro}
                                invalid={editTelErro}
                            ></Input>
                            <small
                                style={{
                                    visibility: editTelErro
                                        ? "visible"
                                        : "hidden",
                                }}
                                className="text-danger"
                            >
                                Telefone invalido, muito curto.
                            </small>
                        </FormGroup>
                        <FormGroup>
                            <Label>Endereço</Label>
                            <Input
                                type="text"
                                value={modalDataValores.endereco}
                                onChange={(e) =>
                                    setModalDataValores({
                                        endereco: e.target.value,
                                        cpf: modalDataValores.cpf,
                                        nome: modalDataValores.nome,
                                        telefone: modalDataValores.telefone,
                                    })
                                }
                                onBlur={() => checkEditEndereco()}
                                invalid={editEnderecoErro}
                                valid={!editEnderecoErro}
                            ></Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={(e) => editar(e)}
                        disabled={
                            editTelErro || editNomeErro || editEnderecoErro
                        }
                    >
                        Editar
                    </Button>
                    <Button onClick={(e) => desativarModal(e)}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <h4 className="mt-3 mb-5">Cliente</h4>

            <h5>Cadastro de cliente</h5>
            <Form>
                <FormGroup>
                    <Label>CPF</Label>
                    <Input
                        type="number"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        onBlur={() => checkCPF()}
                        valid={!cpfErro}
                        invalid={cpfErro}
                    />
                    <small
                        style={{
                            visibility: cpfErro ? "visible" : "hidden",
                        }}
                        className="text-danger"
                    >
                        CPF invalido, muito curto.
                    </small>
                </FormGroup>
                <FormGroup>
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        onBlur={() => checkNome()}
                        valid={!nomeErro}
                        invalid={nomeErro}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Telefone</Label>
                    <Input
                        type="number"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        onBlur={() => checkTel()}
                        valid={!telErro}
                        invalid={telErro}
                    />
                    <small
                        style={{
                            visibility: telErro ? "visible" : "hidden",
                        }}
                        className="text-danger"
                    >
                        Telefone invalido, muito curto.
                    </small>
                </FormGroup>
                <FormGroup>
                    <Label>Endereço</Label>
                    <Input
                        type="text"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        onBlur={() => checkEndereco()}
                        valid={!enderecoErro}
                        invalid={enderecoErro}
                    />
                </FormGroup>
                <FormGroup>
                    <Container>
                        <div className="row">
                            <Button
                                className="col col-auto bg-primary border-primary"
                                onClick={(e) => handle(e)}
                                disabled={
                                    cpfErro ||
                                    telErro ||
                                    nomeErro ||
                                    enderecoErro
                                }
                            >
                                Criar
                            </Button>

                            <div className="col col-auto" />
                            <Button
                                size="sm"
                                className="col col-auto"
                                onClick={() => limpar()}
                            >
                                Limpar
                            </Button>
                        </div>
                    </Container>
                </FormGroup>
            </Form>

            <div className="mt-5 mb-5">
                <h5>Procurar por CPF</h5>
                <Form className="row">
                    <div className="col col-auto">
                        <FormGroup>
                            <Input
                                type="text"
                                value={cpfProcurar}
                                onChange={(e) => setCpfProcurar(e.target.value)}
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
                                <th>CPF</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Endereço</th>
                                <th>Editar</th>
                                <th>Deletar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{clienteProcurado.cpf}</td>
                                <td>{clienteProcurado.nome}</td>
                                <td>{clienteProcurado.telefone}</td>
                                <td>{clienteProcurado.endereco}</td>
                                <td>
                                    <Button
                                        size="sm"
                                        onClick={(e) =>
                                            ativarModal(
                                                e,
                                                clienteProcurado.cpf,
                                                clienteProcurado.nome,
                                                clienteProcurado.telefone,
                                                clienteProcurado.endereco
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
                                            remover(e, clienteProcurado.cpf)
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

            <h5>Tabela de clientes</h5>
            <Table striped className="border border-1 border-dark table-hover">
                <thead className="bg-primary text-white">
                    <tr>
                        <th>CPF</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes !== undefined &&
                        clientes.map((item: any, index: number) => (
                            <tr>
                                <td>{item.cpf}</td>
                                <td>{item.nome}</td>
                                <td>{item.telefone}</td>
                                <td>{item.endereco}</td>
                                <td>
                                    <Button
                                        size="sm"
                                        onClick={(e) =>
                                            ativarModal(
                                                e,
                                                item.cpf,
                                                item.nome,
                                                item.telefone,
                                                item.endereco
                                            )
                                        }
                                    >
                                        Editar
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        size="sm"
                                        onClick={(e) => remover(e, item.cpf)}
                                    >
                                        Deletar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
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

export default Cliente;
