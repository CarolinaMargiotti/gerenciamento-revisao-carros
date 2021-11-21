import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Veiculo from "./pages/Veiculo";
import Revisao from "./pages/Revisao";
import Servico from "./pages/Servico";
import Cliente from "./pages/Cliente";
import { Container } from "reactstrap";
import Menu from "./pages/Menu";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Container>
                    <Menu />
                    <Routes>
                        <Route path="/veiculo" element={<Veiculo />} />
                        <Route path="/cliente" element={<Cliente />} />
                        <Route path="/servico" element={<Servico />} />
                        <Route path="/revisao" element={<Revisao />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
