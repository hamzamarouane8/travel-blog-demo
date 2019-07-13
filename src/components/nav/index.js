import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

const assets = {
  logo: require("../../images/logo.png"),
}

export const NavBar = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <NavBarNav>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src={assets.logo} alt=""/></NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/contact">Contact</Link>
            </NavItem>
            <NavItem>
              <Link to="/blog">Blog</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </NavBarNav>
  )
}

const NavBarNav = styled.div`

.navbar-brand{
  img{
    width:60px!important;
  }
}

.navbar-light .navbar-nav .nav-link{
    color:#fff!important;
    font-weight:700;
    font-size:18px;
    transition: all 0.3s ease 0s;
    margin-left:40px;
}

.navbar-light .navbar-nav .nav-link:hover{
  color:#f06666!important;
}

.navbar{
  background:none!important;
}
`