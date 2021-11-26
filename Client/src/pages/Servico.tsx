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

function Servico() {
    const {
        createServico,
        listServico,
        removeServico,
        updateServico,
        findServico,
    } = Hooks();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [servicos, setServicos] = useState([]);

    const [servicoProcurado, setServicoProcurado] = useState({
        id: 0,
        nome: "",
        descricao: "",
    });
    const [servicoProcurar, setServicoProcurar] = useState(0);
    const [mostrar, setMostrar] = useState(false);

    const [offset, setOffset] = useState(0);
    // eslint-disable-next-line
    const [limit, setLimit] = useState(12);

    const [showModal, setShowModal] = useState(false);
    const [modalDataValores, setModalDataValores] = useState({
        id: 0,
        nome: "",
        descricao: "",
    });

    useEffect(() => {
        retrieveServico();
    }, [offset]);

    const retrieveServico = async () => {
        const data = await listServico(offset, limit);
        if (data.length === 0) {
            setOffset(Math.max(offset - limit, 0));
        }

        setServicos(data);
    };

    const handle = async (e: any) => {
        e.preventDefault();

        await createServico(nome, descricao);
        retrieveServico();
    };

    const editar = async (e: any) => {
        const { id, nome, descricao } = modalDataValores;
        e.preventDefault();

        await updateServico(id, nome, descricao);
        retrieveServico();
        desativarModal(e);
    };

    const remover = async (e: any, id: number) => {
        e.preventDefault();
        await removeServico(id);
        retrieveServico();
    };

    const limpar = (e: any) => {
        e.preventDefault();
        setNome("");
        setDescricao("");
    };

    const ativarModal = (
        e: any,
        id: number,
        nome: string,
        descricao: string
    ) => {
        e.preventDefault();
        setModalDataValores({
            id,
            nome,
            descricao,
        });
        setShowModal(true);
    };

    const desativarModal = (e: any) => {
        e.preventDefault();
        setShowModal(false);
        setModalDataValores({
            id: 0,
            nome: "",
            descricao: "",
        });
    };

    const procurar = async () => {
        limparProcurado();
        const data = await findServico(servicoProcurar);
        if (data) {
            setServicoProcurado({
                id: data.id,
                nome: data.nome,
                descricao: data.descricao,
            });
            setMostrar(true);
            setServicoProcurar(servicoProcurar);
        }
    };

    const limparProcurado = () => {
        setMostrar(false);
        setServicoProcurar(0);
        setServicoProcurado({ id: 1, nome: "", descricao: "" });
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

    return (
        <div>
            <Modal isOpen={showModal}>
                <ModalHeader>Editar serviço</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Nome</Label>
                            <Input
                                type="text"
                                value={modalDataValores.nome}
                                onChange={(e) =>
                                    setModalDataValores({
                                        id: modalDataValores.id,
                                        nome: e.target.value,
                                        descricao: modalDataValores.descricao,
                                    })
                                }
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Descrição</Label>
                            <Input
                                type="text"
                                value={modalDataValores.descricao}
                                onChange={(e) =>
                                    setModalDataValores({
                                        id: modalDataValores.id,
                                        nome: modalDataValores.nome,
                                        descricao: e.target.value,
                                    })
                                }
                            ></Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e) => editar(e)}>
                        Editar
                    </Button>
                    <Button onClick={(e) => desativarModal(e)}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <h4 className="mt-3 mb-5">Serviço</h4>
            <h5>Cadastro de serviços</h5>
            <Form>
                <FormGroup>
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Descrição</Label>
                    <Input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Container>
                        <div className="row">
                            <Button
                                className="col col-auto"
                                onClick={(e) => handle(e)}
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
                    <h5>Procurar por id de serviço</h5>
                    <Form className="row">
                        <div className="col col-auto">
                            <FormGroup>
                                <Input
                                    type="text"
                                    value={+servicoProcurar}
                                    onChange={(e) =>
                                        setServicoProcurar(+e.target.value)
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
                        <Table className="border border-dark border-1">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Editar</th>
                                    <th>Deletar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{servicoProcurado.id}</td>
                                    <td>{servicoProcurado.nome}</td>
                                    <td>{servicoProcurado.descricao}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            onClick={(e) =>
                                                ativarModal(
                                                    e,
                                                    servicoProcurado.id,
                                                    servicoProcurado.nome,
                                                    servicoProcurado.descricao
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
                                                remover(e, servicoProcurado.id)
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
                <h5>Tabela de serviços</h5>
                <Table
                    striped
                    className="border border-dark border-1 table-hover"
                >
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Editar</th>
                            <th>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos !== undefined &&
                            servicos.map((item: any, index: number) => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.descricao}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            onClick={(e) =>
                                                ativarModal(
                                                    e,
                                                    item.id,
                                                    item.nome,
                                                    item.descricao
                                                )
                                            }
                                        >
                                            Editar
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            size="sm"
                                            onClick={(e) => remover(e, item.id)}
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

export default Servico;
