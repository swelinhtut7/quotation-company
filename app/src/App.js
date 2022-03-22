import { useState} from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import Quotation from "./components/Quotation";
import QuotationManagement from "./components/QuotationManagement";
import ProductManagement from "./components/ProductManagement";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login } from "./components/Login";
import { Link } from 'react-router-dom';
import "./styles/login.css"

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [user, setUser] = useState();

  const handleLogin = (data) => {
    console.log("handleLogin", data);
    fetch(`${API_URL}/users/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          window.alert("Error:" + data.error);
        } else {
          window.alert("Welcome " + data.name);
          console.log(data);
          setUser(data);
        }
      });
  };

  return (
    <Router>
      <Navbar variant="dark" className='nav-bar'>
        <Container>
          <Navbar.Brand href="#home">VMS Company</Navbar.Brand>
          <Nav className="nav">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/quotation">Quotation</Nav.Link>
            <Nav.Link as={Link} href="/quotation-management">Quotation Management</Nav.Link>
            <Nav.Link as={Link} href="/product-management"> Product </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/product-management" element={<ProductManagement />}/>
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/quotation-management" element={<QuotationManagement />} />
        <Route path="/"
          element={
            <Container>
              {user ? (
                <div className="welcome">Hello {user.name}. Welcome From VMS Company.</div>
              ) : (
                <Login onLogin={handleLogin} />
              )}
            </Container>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
