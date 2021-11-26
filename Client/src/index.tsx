import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
    <div>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </div>,
    document.getElementById("root")
);
