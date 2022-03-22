import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import Moment from 'moment';
import "../styles/Management.css";
import { Link } from 'react-router-dom';

export default function QuotationManagement() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [quotations, setQuotations] = useState([]);
  const [quotationRows, setQuotationRows] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    fetch(`${API_URL}/quotations`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.map((e, i) => {
          let amount = e.Amount;
          sum += amount;
          return (
            <tr key={i}>
              <td>{Moment(e.Date).format('DD-MM-YYYY')}</td>
              <td>{e.Qty}</td>
              <td>{e.Item}</td>
              <td>{formatNumber(e.Price)}</td>
              <td>{formatNumber(e.Amount)}</td>
              <td><FaTrashAlt onClick={() => { handleDelete(e); }} className="Trash" /></td>
            </tr>
          );
        });

        setQuotations(data);
        setQuotationRows(rows);
        setTotal(sum);
      });
  }, []);

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Delete the Quotation
  const handleDelete = (quotation) => {
    console.log(quotation);
    if (window.confirm(`Are you sure to delete quotation ${quotation.Item}?`)) {
      fetch(`${API_URL}/quotations/${quotation._id}`, {
        method: "DELETE",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully deleted
          console.log("DELETE Result", json);
          for (let i = 0; i < quotations.length; i++) {
            if (quotations[i]._id === quotation._id) {
              quotations.splice(i, 1);
              break;
            }
          }

          const rows = quotations.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.Date}</td>
                <td>{e.Qty}</td>
                <td>{e.Item}</td>
                <td>{e.Price}</td>
                <td>{e.Amount}</td>
                <td><FaTrashAlt onClick={() => { handleDelete(e); }} className="Trash" /></td>
              </tr>
            );
          });

          setQuotations(quotations);
          setQuotationRows(rows);
          window.location.reload();
        });
    }
  };

  return (
    <>
      <Container>
        <h1 className="header" style={{top: "40px"}}>Quotation Management</h1>
        <Link to='/quotation' ><Button className='create'>Create Quotation</Button></Link>
        <Table bordered hover className="table">
          <thead>
            <tr className="tableHeader">
              <th>Date</th>
              <th>Qty</th>
              <th>Item</th>
              <th>Price</th>
              <th>Amount</th>
              <th style={{ width: "80px" }}>&nbsp;</th>
            </tr>
          </thead>
          <tbody>{quotationRows}</tbody>
          <tfoot>
          <tr>
            <td colSpan={4} style={{fontWeight: "bold"}}>
              Total
            </td>
            <td>
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot>
        </Table>
      </Container>
    </>
  );
}
