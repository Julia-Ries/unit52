import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav,  NavLink} from "reactstrap";
import './Navbar.css';


function NavBar(){



  return (
    <Navbar   expand="lg" className="bg-body-tertiary Navigation navbar">
      <Nav  >
      <NavLink className="me-auto" tag={Link} to="/">Translation App </NavLink> 
      
        

          <NavLink tag={Link} to="/detect">Detect Language</NavLink>

     
          <NavLink tag={Link} to="/supportedlanguages">Supported Languages</NavLink>
  
      </Nav>  
    </Navbar>
);


}

export default NavBar;