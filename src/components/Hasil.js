import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { formatNumber } from "../utils/utils";
import TotalBayar from "./TotalBayar";

export default class Hasil extends Component {
  render() {
    const { carts } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {carts.length !== 0 && (
          <ListGroup variant="flush">
            {carts.map((cartItem) => (
              <ListGroup.Item key={cartItem.id}>
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant="success">
                        {cartItem.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{cartItem.product.nama}</h5>
                    <p>Rp. {formatNumber(cartItem.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {formatNumber(cartItem.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        <TotalBayar carts={carts} {...this.props} />
      </Col>
    );
  }
}
