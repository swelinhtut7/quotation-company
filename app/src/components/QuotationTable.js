import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import '../styles/quotation.css';

function QuotationTable({ data, clearDataItems, updateDataItems }) {
  // const [dataItems, setDataItems] = useState(data);
  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    const z = data.map((v, i) => {
      let amount = v.qty * v.price;
      sum += amount;
      return (
        <tr key={i}>
          <td>
            <FaTrashAlt className="Trash" onClick={() => deleteItem(v.code)} style={{ width: "50px" }} />
          </td>
          <td>{v.qty}</td>
          <td>{v.name}</td>
          <td>{formatNumber(v.price)}</td>
          <td>{formatNumber(amount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotal(sum);
  }, [data]);

  const deleteItem = (code) => {
    var z = data.filter((value, index, arr) => value.code != code);
    updateDataItems(z);
  };

  const clearTable = () => {
    clearDataItems();
    setDataRows([]);
  };

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="quotation-table">
      <h1 className="header">Quotation Table</h1>
      <Button onClick={clearTable} variant="outline-dark">
        Clear
      </Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th style={{ width: "40px" }}>&nbsp;</th>
            <th>Qty</th>
            <th>Item</th>
            <th>Price/Unit</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
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
    </div>
  );
}

export default QuotationTable;
