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
import RegistrationForm from "./forms/RegistrationForm";
import DataTable from "./tables/DataTable";
import UpdateData from "./APIposts/Update";

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
        <NavLink href="/teams">Teams</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/players">Players</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/coaches">Coaches</NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={logout} style={{ cursor: "pointer" }}>
          Logout
        </NavLink>
      </NavItem>
    </>
  ) : (
    <>
    <NavItem>
      <NavLink href="/register">Register</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="/login">Login</NavLink>
    </NavItem>
    </>
    
  );

  const teamFields = ["name", "city", "conference", "division", "stadium", "coach", "edit"]
  const playerFields = ["firstName", "lastName", "position", "age", "team", "edit"]
  const coachFields = ["firstName", "lastName", "age", "careerWins", "careerLosses", "team", "edit"]

  const authResources = isLoggedIn ? (
    <>
    <Route path="/teams" element={<DataTable fields={teamFields} category = {"teams"}/>} />
    <Route path="/players" element={<DataTable fields={playerFields} category = {"players"}/>} />
    <Route path="/coaches" element={<DataTable fields={coachFields} category = {"coaches"}/>} />
    </>
  ) : (
    <></>
  );



  return (
    <Router>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">NBA Statistics Database</NavbarBrand>
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
          <Route path="/register" element={<RegistrationForm />} />
          {authResources}
          {/* <Route path="/edit/:id" element={<UpdateData />} /> */}
        </Routes>
      </Container>
    </Router>
  );
};

export default Navigation;