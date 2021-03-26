import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

export default function NavBar() {
  return (
    <div>
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Covid-19 tracker</Navbar.Brand>
          <Nav className="mr-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Enter country"
              className="mr-sm-2"
            />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </>
    </div>
  );
}
