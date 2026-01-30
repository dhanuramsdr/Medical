import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Image, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import './Sample.css'; // Assume you have your custom CSS file imported
import welcomeBackImage from './img/welcome-back.jpeg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent default form submission
  
    try {
      console.log("name,email,password",name,email,password);
      
      const result = await axios.post(
        "http://127.0.0.1:6050/api/v1/user/register",
        { name, email, password },  // ✅ Ensure correct request body
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        
        }
      );
  
      console.log("Result:", result.data);
      console.log("name,email,password",name,email,password);
      
      navigate("/");
    } catch (error) {
      console.error("Request Failed:", error.response ? error.response.data : error.message);
    }
  };
  

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="mt-3 align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row className="justify-content-center">
        <Col xl={6} className="mx-auto">
          <Card className="border-0">
            <Card.Body>
              <Image src={welcomeBackImage} alt="Welcome Back" fluid />
              <Form className="blue-border-form" onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col sm={12}>
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={12}>
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={12}>
                    <label>Password</label>
                    <div className="password-input">
                      <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <span className="password-toggle" onClick={togglePasswordVisibility}>
                        {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={12}>
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm your password" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={12}>
                    <Button type="submit" className="btn btn-primary">Submit</Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
