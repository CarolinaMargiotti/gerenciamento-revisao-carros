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
    ListGroup,
    ListGroupItem,
} from "reactstrap";

function Servico() {
    const {
        createRevisao,
        updateRevisao,
        removeRevisao,
        listRevisao,
        findRevisao,
        listServico,
        findByDataRevisao,
        findCliente,
        findVeiculo,
    } = Hooks();
    const [revisoes, setRevisoes] = useState([]);
    const [data, setData] = useState("");
    const [numeroPlaca, setNumeroPlaca] = useState("");
    const [cpf, setCPF] = useState("");
    const [status, setStatus] = useState(true);
    const [relatorio, setRelatorio] = useState("");
    const [servicos, setServicos] = useState<
        Array<{ id: number; nome: string }>
    >([]);

    const [cpfErro, setCpfErro] = useState(true);
    const [numeroPlacaErro, setNumeroPlacaErro] = useState(true);
    const [dataErro, setDataErro] = useState(true);

    const [editDataErro, setEditDataErro] = useState(false);

    const [servicosPselecionar, setServicosPselecionar] = useState([]);

    const [revisaoProcurado, setRevisaoProcurado] = useState<{
        id: number;
        cpf: string;
        numeroPlaca: string;
        data: string;
        status: boolean;
        relatorio: string;
        servicos: Array<number>;
    }>({
        id: 0,
        cpf: "",
        numeroPlaca: "",
        data: "",
        status: true,
        relatorio: "",
        servicos: [],
    });

    const [revisoesProcurads, setRevisoesProcuradas] = useState([]);
    const [totalEncontrado, setTotalEncontrado] = useState(0);
    const [revisaoProcurar, setRevisaoProcurar] = useState(0);

    const [dataProcurar, setDataProcurar] = useState("");
    const [mostrar, setMostrar] = useState(false);

    const [offset, setOffset] = useState(0);
    // eslint-disable-next-line
    const [limit, setLimit] = useState(12);

    const [showModal, setShowModal] = useState(false);
    const [modalDataValores, setModalDataValores] = useState<{
        id: number;
        data: string;
        status: boolean;
        relatorio: string;
        servicos: Array<{ id: number; nome: string }>;
    }>({
        id: 0,
        data: "",
        status: true,
        relatorio: "",
        servicos: [],
    });

    useEffect(() => {
        retrieveRevisao();
        retrieveServico();
    }, [offset]);

    const retrieveServico = async () => {
        const data = await listServico(offset, limit);
        if (data.length === 0) {
            setOffset(Math.max(offset - limit, 0));
        }

        setServicosPselecionar(data);
    };

    const retrieveRevisao = async () => {
        const data = await listRevisao(offset, limit);
        if (data.length === 0) {
            setOffset(Math.max(offset - limit, 0));
        }
        setRevisoes(data);
    };

    const handle = async (e: any) => {
        e.preventDefault();

        const serv: Array<number> = [];
        servicos.forEach((element) => {
            serv.push(element.id);
        });

        await createRevisao(data, numeroPlaca, cpf, true, "", serv);
        retrieveRevisao();
    };

    const editar = async (e: any) => {
        const { id, data, relatorio, servicos } = modalDataValores;
        e.preventDefault();

        const serv: Array<number> = [];
        servicos.forEach((element) => {
            serv.push(element.id);
        });

        await updateRevisao(id, data, status, relatorio, serv);
        retrieveRevisao();
        desativarModal(e);
    };

    const remover = async (e: any, id: number) => {
        e.preventDefault();
        await removeRevisao(id);
        retrieveRevisao();
    };

    const limpar = (e: any) => {
        e.preventDefault();
        setData("");
        setCPF("");
        setNumeroPlaca("");
        setRelatorio("");
        setServicos([]);
    };

    const treatServicoSelect = (value: HTMLCollectionOf<HTMLOptionElement>) => {
        const serv: Array<{ id: number; nome: string }> = [];
        for (let index = 0; index < value.length; index++) {
            const element = value.item(index);
            if (element) serv.push({ id: +element.value, nome: element.text });
        }
        setServicos(serv);
    };

    const treatServicoSelectModal = (
        value: HTMLCollectionOf<HTMLOptionElement>
    ) => {
        const serv: Array<{ id: number; nome: string }> = [];
        for (let index = 0; index < value.length; index++) {
            const element = value.item(index);
            if (element) serv.push({ id: +element.value, nome: element.text });
        }
        setModalDataValores({
            id: modalDataValores.id,
            data: modalDataValores.data,
            status: modalDataValores.status,
            relatorio: modalDataValores.relatorio,
            servicos: serv,
        });
    };

    const ativarModal = (
        e: any,
        id: number,
        data: string,
        status: boolean,
        relatorio: string,
        servicos: Array<number>
    ) => {
        e.preventDefault();

        let serv: Array<{ id: number; nome: string }> = [];
        servicos.forEach((servico) => {
            let nome: string = "";
            servicosPselecionar.forEach(
                (element: { id: number; nome: string }) => {
                    if (servico == element.id) nome = element.nome;
                }
            );
            serv.push({ id: servico, nome: nome });
        });

        const formatado = data.substr(0, 10);

        setModalDataValores({
            id,
            data: formatado,
            status,
            relatorio,
            servicos: serv,
        });
        setShowModal(true);
    };

    const desativarModal = (e: any) => {
        e.preventDefault();
        setShowModal(false);
        setModalDataValores({
            id: 0,
            data: "",
            status: true,
            relatorio: "",
            servicos: [],
        });
    };

    const procurar = async () => {
        limparProcurado();
        const data = await findRevisao(revisaoProcurar);

        if (data) {
            setRevisaoProcurado({
                id: data.id,
                cpf: data.cpf,
                numeroPlaca: data.numeroPlaca,
                data: data.data,
                status: data.status,
                relatorio: data.relatorio,
                servicos: data.servicos,
            });
            setMostrar(true);
            setRevisaoProcurar(revisaoProcurar);
        }
    };

    const procurarPorData = async () => {
        limparProcurado();
        const data = await findByDataRevisao(dataProcurar);

        if (data) {
            setRevisoesProcuradas(data.revisoes);
            setTotalEncontrado(data.count);
            setDataProcurar(dataProcurar);
        }
    };

    const limparPorData = () => {
        setRevisoesProcuradas([]);
        setDataProcurar("");
        setTotalEncontrado(0);
    };

    const limparProcurado = () => {
        setMostrar(false);
        setRevisaoProcurar(0);
        setRevisaoProcurado({
            id: 0,
            cpf: "",
            numeroPlaca: "",
            data: "",
            status: true,
            relatorio: "",
            servicos: [],
        });
    };

    const formatData = (value: string) => {
        const data = new Date(value);
        let formatado = data.toLocaleDateString("pt-br");
        return formatado.substr(0, 10);
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

    const checkNumeroPlaca = async () => {
        const res = await findVeiculo(numeroPlaca);

        if (!res) {
            setNumeroPlacaErro(true);
            return;
        }
        setNumeroPlacaErro(false);
    };

    const checkDataErro = async () => {
        setDataErro(data.length === 0);
    };

    const checkEditDataErro = () => {
        setEditDataErro(modalDataValores.data.length === 0);
    };

    return (
        <div>
            <Modal isOpen={showModal}>
                <ModalHeader>Editar Revisão</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Data</Label>
                            <Input
                                type="date"
                                value={modalDataValores.data}
                                onChange={(e) =>
                                    setModalDataValores({
                                        id: modalDataValores.id,
                                        data: e.target.value,
                                        status: modalDataValores.status,
                                        relatorio: modalDataValores.relatorio,
                                        servicos: modalDataValores.servicos,
                                    })
                                }
                                onBlur={() => checkEditDataErro()}
                                valid={!editDataErro}
                                invalid={editDataErro}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Status</Label>
                            <Input
                                type="select"
                                value={modalDataValores.status + ""}
                                onChange={(e) =>
                                    setModalDataValores({
                                        id: modalDataValores.id,
                                        data: modalDataValores.data,
                                        status: e.target.value === "true",
                                        relatorio: modalDataValores.relatorio,
                                        servicos: modalDataValores.servicos,
                                    })
                                }
                            >
                                <option value={"true"}>Agendado</option>
                                <option value="false">Cancelado</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Relatório</Label>
                            <Input
                                type="textarea"
                                value={modalDataValores.relatorio}
                                onChange={(e) => {
                                    setModalDataValores({
                                        id: modalDataValores.id,
                                        data: modalDataValores.data,
                                        status: modalDataValores.status,
                                        relatorio: e.target.value,
                                        servicos: modalDataValores.servicos,
                                    });
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <FormGroup>
                                <div className="row">
                                    <Label className="col col-auto">
                                        Serviços
                                    </Label>
                                    <Button
                                        className="col col-auto"
                                        onClick={(e) => {
                                            setServicos([]);
                                        }}
                                    >
                                        Limpar Seleção
                                    </Button>
                                </div>
                            </FormGroup>
                            <ListGroup>
                                {modalDataValores.servicos.length >= 1 &&
                                    modalDataValores.servicos.map(
                                        (item: any, index) => (
                                            <ListGroupItem>
                                                {item.nome}
                                            </ListGroupItem>
                                        )
                                    )}
                            </ListGroup>
                            <br />
                            <select
                                className="form-select"
                                multiple
                                onChange={(e) => {
                                    treatServicoSelectModal(
                                        e.target.selectedOptions
                                    );
                                }}
                            >
                                {servicosPselecionar.map(
                                    (item: any, index: number) => (
                                        <option value={item.id}>
                                            {item.nome}
                                        </option>
                                    )
                                )}
                            </select>

                            <small>
                                Segure Ctrl e clique para selecionar ou remover
                                items.
                            </small>
                            <br />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={(e) => editar(e)}
                        disabled={editDataErro}
                    >
                        Editar
                    </Button>
                    <Button onClick={(e) => desativarModal(e)}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <h4 className="mt-3 mb-5">Revisão</h4>
            <h5>Cadastro de revisões</h5>
            <Form>
                <FormGroup>
                    <Label>Numero da placa</Label>
                    <Input
                        type="text"
                        value={numeroPlaca}
                        onChange={(e) => setNumeroPlaca(e.target.value)}
                        onBlur={() => checkNumeroPlaca()}
                        valid={!numeroPlacaErro}
                        invalid={numeroPlacaErro}
                    ></Input>
                    <small
                        className="text-danger"
                        style={{
                            visibility: numeroPlacaErro ? "visible" : "hidden",
                        }}
                    >
                        Placa não registrada.
                    </small>
                </FormGroup>
                <FormGroup>
                    <Label>CPF</Label>
                    <Input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCPF(e.target.value)}
                        onBlur={() => checkCPF()}
                        valid={!cpfErro}
                        invalid={cpfErro}
                    ></Input>
                    <small
                        className="text-danger"
                        style={{
                            visibility: cpfErro ? "visible" : "hidden",
                        }}
                    >
                        Cliente não registrado.
                    </small>
                </FormGroup>
                <FormGroup>
                    <Label>Data</Label>
                    <Input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        onBlur={() => checkDataErro()}
                        valid={!dataErro}
                        invalid={dataErro}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <FormGroup>
                        <div className="row">
                            <Label className="col col-auto">Serviços</Label>
                            <Button
                                className="col col-auto"
                                onClick={(e) => {
                                    setServicos([]);
                                }}
                            >
                                Limpar Seleção
                            </Button>
                        </div>
                    </FormGroup>
                    <ListGroup>
                        {servicos.length >= 1 &&
                            servicos.map((item: any, index) => (
                                <ListGroupItem className="bg-primary text-white">
                                    {item.nome}
                                </ListGroupItem>
                            ))}
                    </ListGroup>
                    <br />
                    <select
                        className="form-select"
                        multiple
                        onChange={(e) => {
                            treatServicoSelect(e.target.selectedOptions);
                        }}
                    >
                        {servicosPselecionar.map((item: any, index: number) => (
                            <option value={item.id}>{item.nome}</option>
                        ))}
                    </select>

                    <small>
                        Segure Ctrl e clique para selecionar ou remover items.
                    </small>
                    <br />
                </FormGroup>
                <FormGroup>
                    <Container>
                        <div className="row">
                            <Button
                                className="col col-auto"
                                color="primary"
                                onClick={(e) => handle(e)}
                                disabled={
                                    numeroPlacaErro || cpfErro || dataErro
                                }
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
                    <h5>Procurar por id de revisão</h5>
                    <Form className="row">
                        <div className="col col-auto">
                            <FormGroup>
                                <Input
                                    type="text"
                                    value={+revisaoProcurar}
                                    onChange={(e) =>
                                        setRevisaoProcurar(+e.target.value)
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
                                    <th>Numero de placa</th>
                                    <th>CPF</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Relatorio</th>
                                    <th>Serviços</th>
                                    <th>Editar</th>
                                    <th>Deletar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{revisaoProcurado.id}</td>
                                    <td>{revisaoProcurado.numeroPlaca}</td>
                                    <td>{revisaoProcurado.cpf}</td>
                                    <td>{formatData(revisaoProcurado.data)}</td>
                                    <td>
                                        {revisaoProcurado.status
                                            ? "Agendado"
                                            : "Cancelado"}
                                    </td>
                                    <td>{revisaoProcurado.relatorio}</td>
                                    <td>{revisaoProcurado.servicos}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            onClick={(e) =>
                                                ativarModal(
                                                    e,
                                                    revisaoProcurado.id,
                                                    revisaoProcurado.data,
                                                    revisaoProcurado.status,
                                                    revisaoProcurado.relatorio,
                                                    revisaoProcurado.servicos
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
                                                remover(e, revisaoProcurado.id)
                                            }
                                        >
                                            Deletar
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    )}

                    <h5>Procurar por data de revisão</h5>
                    <Form className="row">
                        <div className="col col-auto">
                            <FormGroup>
                                <Input
                                    type="date"
                                    value={dataProcurar}
                                    onChange={(e) =>
                                        setDataProcurar(e.target.value)
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
                                            onClick={() => procurarPorData()}
                                        >
                                            Procurar
                                        </Button>
                                        <div className="col col-auto" />
                                        <Button
                                            className="col col-auto"
                                            size="sm"
                                            onClick={() => limparPorData()}
                                        >
                                            Limpar
                                        </Button>

                                        <Label className="col col-auto">
                                            Total encontrado: {totalEncontrado}
                                        </Label>
                                    </div>
                                </Container>
                            </FormGroup>
                        </div>
                    </Form>
                    {totalEncontrado > 0 && (
                        <Table
                            striped
                            className="border border-1 border-dark table-hover"
                        >
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>ID</th>
                                    <th>Numero de placa</th>
                                    <th>CPF</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Relatorio</th>
                                    <th>Serviços</th>
                                    <th>Editar</th>
                                    <th>Deletar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revisoesProcurads !== undefined &&
                                    revisoesProcurads.map(
                                        (item: any, index: number) => (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.numeroPlaca}</td>
                                                <td>{item.cpf}</td>
                                                <td>{formatData(item.data)}</td>
                                                <td>
                                                    {item.status
                                                        ? "Agendado"
                                                        : "Cancelado"}
                                                </td>
                                                <td>{item.relatorio}</td>
                                                <td>{item.servicos}</td>
                                                <td>
                                                    <Button
                                                        size="sm"
                                                        onClick={(e) =>
                                                            ativarModal(
                                                                e,
                                                                item.id,
                                                                item.data,
                                                                item.status,
                                                                item.relatorio,
                                                                item.servicos
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
                                                            remover(e, item.id)
                                                        }
                                                    >
                                                        Deletar
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                            </tbody>
                        </Table>
                    )}
                </div>

                <h5>Tabela de revisões</h5>

                <Table
                    striped
                    className="border border-1 border-dark table-hover"
                >
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>ID</th>
                            <th>Numero de placa</th>
                            <th>CPF</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Relatorio</th>
                            <th>Serviços</th>
                            <th>Editar</th>
                            <th>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {revisoes !== undefined &&
                            revisoes.map((item: any, index: number) => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.numeroPlaca}</td>
                                    <td>{item.cpf}</td>
                                    <td>{formatData(item.data)}</td>
                                    <td>
                                        {item.status ? "Agendado" : "Cancelado"}
                                    </td>
                                    <td>{item.relatorio}</td>
                                    <td>{item.servicos}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            onClick={(e) =>
                                                ativarModal(
                                                    e,
                                                    item.id,
                                                    item.data,
                                                    item.status,
                                                    item.relatorio,
                                                    item.servicos
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
