import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import LoginForm from "./forms/LoginForm";
import InstitutionsTable from "./tables/InstitutionsTable";

const Navigation = () => {
    const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true" || false
  );

  const toggle = () => setIsOpen(!isOpen);

  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", true);
    alert("Logged in."); // Debugging purposes
  };

  const logout = async () => {
    try {      
      const res = await axios.post(`${BASE_URL}/api/v1/logout`, {
        headers: {
          'Authorization' : `Bearer ${sessionStorage.getItem("token")}`
        }
      });

      if (res.status === 200) {
        setIsLoggedIn(false);
        sessionStorage.clear();
        alert("Logged out."); // Debugging purposes
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Render a NavLink based on whether a user is logged in or out
  const authLink = isLoggedIn ? (
    <>
      <NavItem>
        <NavLink href="/institutions">Institutions</NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={logout} style={{ cursor: "pointer" }}>
          Logout
        </NavLink>
      </NavItem>
    </>
  ) : (
    <NavLink href="/login">Login</NavLink>
  );

  const authResources = isLoggedIn ? (
    <Route path="/institutions" element={<InstitutionsTable />} />
  ) : (
    <></>
  );

  return (
    <Router>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Student Management System</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {authLink}
          </Nav>
        </Collapse>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/login" element={<LoginForm login={login} />} />
          {authResources}
        </Routes>
      </Container>
    </Router>
  );
};

export default Navigation;