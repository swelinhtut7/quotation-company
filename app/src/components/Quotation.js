import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form, } from "react-bootstrap";
import { useLocalStorage } from "react-use";
import QuotationTable from "./QuotationTable";
import '../styles/quotation.css';
import { Alert } from 'react-alert'

function Quotation() {
  const API_URL = process.env.REACT_APP_API_URL;
  const itemRef = useRef();
  const priceRef = useRef();
  const qtyRef = useRef();

  const [localDataItems, setLocalDataItems] = useLocalStorage("data-items", JSON.stringify([]));

  const [dataItems, setDataItems] = useState(JSON.parse(localDataItems));
  const [productOptions, setProductOptions] = useState([]);
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        data = data.filter((e) => "code" in e);
        console.log(data);
        const z = data.map((v) => (
          <option key={v._id} value={v._id}>{v.name}</option>
        ));
        setProducts(data);
        setProductOptions(z);
      });
  }, []);

   const saveinsertItem=()=>{

    const newQuotation = {
      Date: new Date(),
      Qty: qtyRef.current.value,
      Item: itemRef.current.value,
      Price: priceRef.current.value,
      Amount: (priceRef.current.value * qtyRef.current.value)
    };
    console.log(newQuotation);

    fetch(`${API_URL}/quotations`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(newQuotation), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((json) => {
        // Successfully added the product
        console.log("POST", json);
        products.push(json);
      });
  }
  
  const InsertDate = () => {
    let count = dataItems.length;
    console.log("Added", count);
    for (var i = 0; i < count; i++) {
      console.log(dataItems[i]);
    
      const newQuotation = {
        Date: new Date(),
        Qty: dataItems[i].qty,
        Item: dataItems[i].name,
        Price: dataItems[i].price,
        Amount: (dataItems[i].price * dataItems[i].qty),
      };
      console.log(newQuotation);

      fetch(`${API_URL}/quotations`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(newQuotation), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully added the product
          console.log("POST", json);
          products.push(json);
        });
  }}

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v._id);
    console.log(item);
    var itemObj = {
      _id: item._id,
      code: item.code,
      name: item.name,
      price: priceRef.current.value,
      qty: qtyRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);
    setLocalDataItems(JSON.stringify(dataItems));
    console.log("after", dataItems);
  }

  const updateDataItems = (dataItems) => {
    setDataItems([...dataItems]);
    setLocalDataItems(JSON.stringify(dataItems));
  };

  const clearDataItems = () => {
    setDataItems([]);
    setLocalDataItems(JSON.stringify([]));
  };

  function ConfirmMessage() {
    alert("Your Data is saved in Quotation Table.")
}

  const productChange = () => {
    console.log("productChange", itemRef.current.value);
    let item = products.find((v) => itemRef.current.value === v._id);
    console.log("productChange", item);
    priceRef.current.value = item.price;
    console.log(priceRef.current.value);
  };
  return (
    <Container className='item-form'>
      <Row>
        <Col md={4} className='item'>
          <Row>
            <Col className='label'>
              Item
              <Form.Select ref={itemRef} onChange={productChange}> {productOptions}</Form.Select>
            </Col>
          </Row>
          <Row>
            <Col className='label'>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={priceRef}
                value={price}
                onChange={(e) => setPrice(priceRef.current.value)} />
            </Col>
          </Row>
          <Row>
            <Col className='label'>
              <Form.Label >Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
            <Button variant="primary" onClick={() => {InsertDate(); ConfirmMessage();}}> Save </Button>
          </div>
          {/* {JSON.stringify(dataItems)} */}
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            updateDataItems={updateDataItems}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Quotation;