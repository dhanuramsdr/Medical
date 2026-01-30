import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Carousel, Table, Button } from "react-bootstrap";
import { createBill, getOinment, getSyrup, getTablet } from "./api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



function Billsection() {
  const [tablets, setTablets] = useState([]);
  const [ointments, setOintments] = useState([]);
  const [syrups, setSyrups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [billItems, setBillItems] = useState([]);
  const [billNumber, setBillNumber] = useState(`BILL-${Date.now()}`);
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTablets(await getTablet());
        setOintments(await getOinment());
        setSyrups(await getSyrup());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addToBill = (item) => {
    setBillItems((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (existingItem) {
        return prevItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    setBillItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeItem = (id) => {
    setBillItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const calculateTotal = () => {
    return billItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleBill = async () => {
    if (!patientName) {
      alert("Please enter the patient's name");
      return;
    }

    const billData = {
      billNumber,
      patientName,
      items: billItems.map(({ _id, productname, quantity, price }) => ({
        _id,
        productname,
        quantity,
        price,
      })),
      total: calculateTotal(),
    };

    try {
      await createBill(billData);
      alert("Bill stored successfully!");
      setBillItems([]);
      setBillNumber(`BILL-${Date.now()}`);
      setPatientName("");
    } catch (error) {
      console.error("Error saving bill:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Bill Number: ${billNumber}`, 20, 10);
    doc.text(`Patient Name: ${patientName}`, 20, 20);
  
    autoTable(doc, { // Use autoTable function with the doc instance
      startY: 30,
      head: [["S.No", "Medicine", "Quantity", "Price", "Total"]],
      body: billItems.map((item, index) => [
        index + 1,
        item.productname,
        item.quantity,
        item.price,
        item.quantity * item.price,
      ]),
    });
  
    doc.text(`Grand Total: ${calculateTotal()}`, 20, doc.lastAutoTable.finalY + 10);
    doc.save(`${billNumber}.pdf`);
  };
  

  const renderProducts = (products, title) => (
    <Col xs={12} md={4}>
      <h5>{title}</h5>
      <Carousel interval={null} className="small-carousel">
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Card className="small-card">
              <Card.Img variant="top" src={product.image} className="small-img" />
              <Card.Body>
                <Card.Title>{product.productname}</Card.Title>
                <Card.Text>Category: {product.productcategorey}</Card.Text>
                <Button onClick={() => addToBill(product)}>Add to Bill</Button>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </Col>
  );

  return (
    <div className="container">
      <h3 className="mt-4 text-center">Products Section</h3>

      {/* Patient and Bill Number Input */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter patient's name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Bill Number</Form.Label>
            <Form.Control type="text" value={billNumber} readOnly />
          </Form.Group>
        </Col>
      </Row>

      {/* Search Bar */}
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Row>
        {renderProducts(tablets, "Tablets")}
        {renderProducts(ointments, "Ointments")}
        {renderProducts(syrups, "Syrups")}
      </Row>

      <h3 className="mt-4 text-center">Billing Section</h3>
      <Table bordered>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Medicine</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billItems.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.productname}</td>
              <td>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                />
              </td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <Button variant="danger" onClick={() => removeItem(item._id)}>Remove</Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="text-end">Total</td>
            <td>{calculateTotal()}</td>
            <td>
              <Button variant="primary" onClick={handleBill}>Save Bill</Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Generate PDF Button */}
      <div className="text-center mt-3">
        <Button variant="success" onClick={generatePDF}>Download PDF</Button>
      </div>

      <style>
        {`
          /* Change the color of carousel control arrows to black */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(100%); /* This makes the arrows black */
}

/* Optional: Increase visibility by adding a slight background */
.carousel-control-prev,
.carousel-control-next {
  background-color: rgba(0, 0, 0, 0.1); /* Light black transparent background */
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

/* Optional: Make arrows larger */
.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 30px;
  height: 30px;
}

        `}
      </style>
    </div>
  );
}

export default Billsection;




//billing

// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Form, Carousel, Table, Button } from "react-bootstrap";
// import { getOinment, getSyrup, getTablet } from "./api";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// function Billsection() {
//   const [tablets, setTablets] = useState([]);
//   const [ointments, setOintments] = useState([]);
//   const [syrups, setSyrups] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [billItems, setBillItems] = useState([]);
//   const [patientName, setPatientName] = useState("");
//   const [billNo] = useState(`BILL-${Date.now()}`);
//   const [billDate] = useState(new Date().toLocaleDateString());

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setTablets(await getTablet());
//         setOintments(await getOinment());
//         setSyrups(await getSyrup());
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const addToBill = (item) => {
//     setBillItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i._id === item._id);
//       if (existingItem) {
//         return prevItems.map((i) =>
//           i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prevItems, { ...item, quantity: 1 }];
//     });
//   };

//   const updateQuantity = (id, qty) => {
//     setBillItems((prevItems) =>
//       prevItems.map((item) =>
//         item._id === id ? { ...item, quantity: qty } : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setBillItems((prevItems) => prevItems.filter((item) => item._id !== id));
//   };

//   const calculateTotal = () => {
//     return billItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const saveBill = async () => {
//     const billData = { billNo, billDate, patientName, items: billItems };
//     console.log("Saving bill:", billData);
//     // Add API call to save the bill
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text(`Bill No: ${billNo}`, 10, 10);
//     doc.text(`Date: ${billDate}`, 10, 20);
//     doc.text(`Patient Name: ${patientName}`, 10, 30);
//     doc.autoTable({
//       startY: 40,
//       head: [["#", "Medicine", "Quantity", "Price", "Total"]],
//       body: billItems.map((item, index) => [
//         index + 1,
//         item.productname,
//         item.quantity,
//         item.price,
//         item.price * item.quantity,
//       ]),
//     });
//     doc.save(`${billNo}.pdf`);
//   };

//   const renderProducts = (products, title) => (
//     <Col xs={12} md={4}>
//       <h5>{title}</h5>
//       <Carousel interval={null} className="small-carousel">
//         {products.map((product) => (
//           <Carousel.Item key={product._id}>
//             <Card className="small-card">
//               <Card.Img variant="top" src={product.image} className="small-img" />
//               <Card.Body>
//                 <Card.Title>{product.productname}</Card.Title>
//                 <Card.Text>Category: {product.productcategorey}</Card.Text>
//                 <Button onClick={() => addToBill(product)}>Add to Bill</Button>
//               </Card.Body>
//             </Card>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     </Col>
//   );

//   return (
//     <div className="container">
//       <Form.Group className="mb-4">
//         <Form.Control
//           type="text"
//           placeholder="Search for a product..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </Form.Group>
//       <Row>
//         {renderProducts(tablets, "Tablets")}
//         {renderProducts(ointments, "Ointments")}
//         {renderProducts(syrups, "Syrups")}
//       </Row>

//       {/* Billing Section */}
//       <h3 className="mt-4">Billing Section</h3>
//       <p>Bill No: {billNo}</p>
//       <p>Date: {billDate}</p>
//       <Form.Group>
//         <Form.Label>Patient Name:</Form.Label>
//         <Form.Control
//           type="text"
//           value={patientName}
//           onChange={(e) => setPatientName(e.target.value)}
//         />
//       </Form.Group>
//       <Table bordered>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Medicine</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Total</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {billItems.map((item, index) => (
//             <tr key={item._id}>
//               <td>{index + 1}</td>
//               <td>{item.productname}</td>
//               <td>
//                 <Form.Control
//                   type="number"
//                   value={item.quantity}
//                   onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
//                 />
//               </td>
//               <td>{item.price}</td>
//               <td>{item.price * item.quantity}</td>
//               <td>
//                 <Button variant="danger" onClick={() => removeItem(item._id)}>
//                   Remove
//                 </Button>
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan="4" className="text-end">Total</td>
//             <td>{calculateTotal()}</td>
//           </tr>
//         </tbody>
//       </Table>

//       <Button className="me-2" onClick={saveBill}>Save Bill</Button>
//       <Button variant="secondary" onClick={generatePDF}>Generate PDF</Button>
//     </div>
//   );
// }

// export default Billsection;
