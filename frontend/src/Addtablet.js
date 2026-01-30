import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { addTablet } from './api';

const AddTablet = () => {
  const [dateofmfc, setDateofMfc] = useState('');
  const [dateofexp, setDateofExp] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  const [ productname, setProductname] = useState('');
  const [ productcategorey, setProductcategorey] = useState('');
  const [file, setFile] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const tabletData = {
      dateofmfc,
      dateofexp,
      stock,
       productname,
       productcategorey,
      price
    };

    try {
      const result = await addTablet(file, tabletData);
      console.log("Server Response:", result);

      if (result.success) {
        alert("Tablet added successfully!");
        clearForm();
        navigate('/home');
      } else {
        alert("Error adding tablet.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const clearForm = () => {
    setFile(null);
    setDateofMfc('');
    setDateofExp('');
    setStock('');
    setProductname('');
    setProductcategorey('');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Add Tablet</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tablet Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter tablet name" value={ productname} onChange={(e) => setProductname(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date of Manufacturing</Form.Label>
                  <Form.Control type="date" value={dateofmfc} onChange={(e) => setDateofMfc(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date of Expiry</Form.Label>
                  <Form.Control type="date" value={dateofexp} onChange={(e) => setDateofExp(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tablet Category</Form.Label>
                  <Form.Control type="text" placeholder="Enter tablet category" value={productcategorey} onChange={(e) => setProductcategorey(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" placeholder="Enter stock quantity" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>price</Form.Label>
                  <Form.Control type="number" placeholder="Enter the price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tablet Image</Form.Label>
                  <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTablet;
