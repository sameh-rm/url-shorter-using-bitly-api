import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
const Header = () => {
  const userInfo = useSelector((state) => state.user.login.userInfo);

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Shorty</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="">Link</Nav.Link>
              {userInfo && userInfo.token ? (
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.3">
                    My Urls
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/users/urls">Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
