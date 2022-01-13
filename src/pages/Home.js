import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import { API_URL } from "../utils/constant";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categorySelected: "Makanan",
      carts: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categorySelected)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error : ", error);
      });

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const carts = res.data;
        this.setState({ carts });
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.carts !== prevState.carts) {
      axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          const carts = res.data;
          this.setState({ carts });
        })
        .catch((error) => {
          console.log("Error : ", error);
        });
    }
  }

  changeCategory = (value) => {
    this.setState({
      categorySelected: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  addToCart = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const cartItem = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", cartItem)
            .then((res) => {
              swal({
                title: "Success Add To Cart!",
                text: `Success Add Menu to Cart! ${cartItem.product.nama}`,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error : ", error);
            });
        } else {
          const cartItem = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, cartItem)
            .then((res) => {
              swal({
                title: "Success Add To Cart!",
                text: `Success Add Menu to Cart! ${cartItem.product.nama}`,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error : ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  render() {
    const { menus, categorySelected, carts } = this.state;
    return (
      <div className="mt-2">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              categorySelected={categorySelected}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      addToCart={this.addToCart}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil carts={carts} {...this.props} />
          </Row>
        </Container>
      </div>
    );
  }
}
