import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import history from "./history";
import Veiculo from "./pages/Veiculo";
import Revisao from "./pages/Revisao";
import Servico from "./pages/Servico";
import Cliente from "./pages/Cliente";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/veiculo" element={<Veiculo />} />
                    <Route path="/cliente" element={<Cliente />} />
                    <Route path="/servico" element={<Servico />} />
                    <Route path="/revisao" element={<Revisao />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
