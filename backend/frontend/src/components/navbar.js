import React, { useState, useEffect, useRef } from "react";
import {Navbar, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

function Navigation(){
    const navStyle = { display: "block", padding: " 0.5rem 1rem" }
    return(
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="mr-auto">
                <Link to="/chart" style={navStyle}>Chart</Link>
                {/* <Nav.Link href="/chart">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
        </Navbar>
    )
}

export default Navigation;