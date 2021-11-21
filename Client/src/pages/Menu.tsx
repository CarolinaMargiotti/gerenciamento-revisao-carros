import React from "react";
import { Nav, NavItem, NavbarBrand, NavLink } from "reactstrap";

function Menu() {
    return (
        <Nav>
            <NavbarBrand>
                <h4>Administração de veiculos</h4>
            </NavbarBrand>
            <NavItem>
                <NavLink href="/cliente">Cliente</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/veiculo">Veiculo</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/revisao">Revisao</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/servico">Servico</NavLink>
            </NavItem>
        </Nav>
    );
}
export default Menu;
