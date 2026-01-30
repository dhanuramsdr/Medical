import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { deletetOinment, getOinment } from "./api";

import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const Oinmentlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const navigate=useNavigate()
const navigates=useNavigate()


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const tablets = await getOinment();
        console.log(tablets);
        
        if (tablets.length > 0) {
          setProducts(tablets);
        } else {
          setError("No products found.");
        }
      } catch (error) {
        console.error("Error fetching tablets:", error);
        setError("Error fetching tablets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleEdit = (id) => {
    console.log("Edit product with ID:", id);

    navigate(`/updateoinment/${id}`)

    // Implement edit functionality
  };

  const handleDelete =async (id) => {
try {
  console.log("Delete product with ID:", id);
  
  const result=await deletetOinment(id)
  console.log("result for delete",result);
  navigates('/home')
} catch (error) {
  
}    
    
  };


  return (
    <>
    <Container className="py-4">
      <h2 className="text-center mb-4">Oinments</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} md={4} sm={6} lg={3} className="mb-4">
              <Card className="shadow-sm" style={{ border: "solid 5px Purple" }}>
              <Card.Img
  variant="top"
  src={product.image} // Use the direct image URL from API
  alt={product.productname}
  style={{ height: "200px", objectFit: "cover" }}
/>

                <Card.Body>
                     <div>
                                                          <FiEdit2
                                                            className="text-primary me-2"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleEdit(product._id)}
                                                          />
                                                          <RiDeleteBin7Line 
                                                            className="text-danger"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleDelete(product._id)}
                                                          />
                                                        </div>
               
                     <Card.Text>
                                      <strong>Name: </strong>{product.productname}
                                    </Card.Text>
                                    <Card.Text>
                                      <strong>Product categorey: </strong>{product.productcategoreydc}
                                    </Card.Text>
                                    <Card.Text>
                                      <strong>Price: </strong>${product.price}
                                    </Card.Text>
                                    <Card.Text>
                                      <strong>Stock: </strong>{product.stock}
                                    </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          !loading && <h5 className="text-center w-100">No oinment found.</h5>
        )}
      </Row>
    </Container></>
  );
};

export default Oinmentlist;
