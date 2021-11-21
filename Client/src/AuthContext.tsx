import React, { createContext } from "react";
import hooks from "./hooks";

const Context = createContext({});

function AuthProvider({ children }: any): any {
    const { createVeiculo } = hooks();
    return (
        <Context.Provider
            value={{
                createVeiculo,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };
