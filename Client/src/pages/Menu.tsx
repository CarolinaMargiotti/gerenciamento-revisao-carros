import React from "react";
import { Nav, NavItem, NavbarBrand, NavLink } from "reactstrap";

function Menu() {
    return (
        <Nav className="border-bottom border-primary border-3 align-items-center">
            <NavbarBrand className="m-2">
                <NavLink href="/">
                    <h4 style={{ userSelect: "none" }}>Revisão de veiculos</h4>
                </NavLink>
            </NavbarBrand>
            <NavItem>
                <NavLink href="/cliente">Cliente</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/veiculo">Veiculo</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/revisao">Revisão</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/servico">Serviço</NavLink>
            </NavItem>
        </Nav>
    );
}
export default Menu;
