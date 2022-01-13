import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { formatNumber } from "../utils/utils";
import { API_URL } from "../utils/constant";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.carts,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };

  render() {
    const totalBayar = this.props.carts.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);
    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :{" "}
              <strong className="float-right me-2">
                {" "}
                Rp. {formatNumber(totalBayar)}
              </strong>
            </h4>
            <Button
              variant="primary"
              block="true"
              className="mb-2 mt-4 me-2"
              size="lg"
              onClick={() => this.submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
