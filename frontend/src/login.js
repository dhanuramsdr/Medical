import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import symbole from './img/welcom.jpeg';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const result = await axios.post(
        "http://127.0.0.1:6050/api/v1/user/login", 
        { email, password },  // Correct placement of request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("result", result);
      console.log("email,password",email,password);
      
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  

  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col xs={12} md={6}>
          <Card style={{ border: '2px solid #007bff', borderRadius: '20px' }}>
            <Card.Body className="text-center">
              <div style={{ marginBottom: '20px' }}>
                <Image src={symbole} style={{ width: '300px', margin: 'auto' }} fluid alt="welcome" />
              </div>
              <Form style={{ padding: '20px', textAlign: 'left' }} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
                <div className="mt-3">
                  <p>If you are not registered yet, please select the register button</p>
                  <Button variant="outline-primary">
                    <Link to="/Register" style={{ textDecoration: 'none', color: 'inherit' }}>Register</Link>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
