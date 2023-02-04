import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { DataContext } from "./DataProvider";
import Swal from "sweetalert2";
import Dataservices from "./Dataservices";

import {
  getCartItems,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
  checkout,
} from "../api/index";
import Routes from "../api/apiRoutes";

export default function Cart() {
  const value = useContext(DataContext);
  const [cart, setCart] = value.cart;
  const [total, setTotal] = useState(0);
  const [allItemCost, setAllItemCost] = useState(0);

  const history = useHistory();

  const setCartItems = async () => {
    let response = await getCartItems(Routes.getCartItems);
    if (response.errorMessage != null || response.data.exception != null) {
      return;
    }
    console.log(response.data);
    if (response.data.unauthorizedAccess) {
      alert("Please login to continue");
      history.push("/");
      return;
    }

    setCart(response.data.getCartItems);
    console.log(response);
  };

  useEffect(() => {
    setCartItems();

    const getTotal = () => {
      let result = cart.reduce((prev, item) => {
        return prev + item.productPrice * item.cartQty;
      }, 0);

      setAllItemCost(result);
      let flag = false;
      if (result < 1000 && flag === false) {
        flag = true;
        result = result + 100;
        setTotal(result);
      } else if (result > 1000 && flag === true) {
        flag = false;
        result = result - 100;
        setTotal(result);
      } else {
        setTotal(result);
      }
    };

    getTotal();
  }, []);

  const increaseProduct = async (id) => {
    let response = await increaseCartQuantity(Routes.increaseCartQuantity, id);
    if (response.data.message === "Hi, item is out of stock") {
      alert(response.data.message);
      return;
    }
    cart.forEach((item) => {
      if (item.cartId === id) {
        item.cartQty += 1;
      }
    });
    setCart([...cart]);
  };

  const decreaseProduct = async (id) => {
    let response = await increaseCartQuantity(Routes.decreaseCartQuantity, id);
    if (
      response.data.message ===
      "Hi, quantity can not be decrease, minimum should be 1 for product"
    ) {
      alert(response.data.message);
      return;
    }
    cart.forEach((item) => {
      if (item.cartId === id) {
        item.cartQty === 1 ? (item.cartQty = 1) : (item.cartQty -= 1);
      }
    });
    setCart([...cart]);
  };

  const placeOrder = () => {
    Dataservices.createOrder().then((res) => {
      console.log(res);
      if (res.data.message === "Your order has been confirmed successfully") {
        alert(res.data.message);
        value.setCart([]);
      }
    });
  };

  const removeProduct = async (id) => {
    let response = await removeFromCart(Routes.removeFromCart, id);
    console.log(response);
    if (!response.data.isItemRemoved) {
      alert("Something went wrong please try again later");
      return;
    }

    const removeItem = Swal.fire({
      position: "center",
      icon: "success",
      title: "Product has been removed Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    if (removeItem) {
      // if (window.confirm("Are you sure to remove this product ?")) {
      cart.forEach((item, index) => {
        if (item.cartId === id) {
          cart.splice(index, 1);
          item.cartQty = 1;
        }
      });
      setCart([...cart]);
    }
  };

  if (cart.length === 0)
    return <section id="cart-section">Cart is Empty ...!!! </section>;

  return (
    <section>
      <div className="cart">
        <div className="cart-box">
          {cart.map((product) => (
            <div className="card" key={product.productId}>
              <div
                className="card-img"
                style={{
                  backgroundImage: `url(https://localhost:44350/images/uploads/productImages/${product.productImage})`,
                }}
              />

              <div className="card-content">
                <p title={product.productName}>{product.productName}</p>
                <h3>&#36; {product.productPrice}</h3>

                <div className="amount">
                  <button
                    className="count"
                    onClick={() => decreaseProduct(product.cartId)}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span>{product.cartQty}</span>
                  <button
                    className="count"
                    onClick={() => increaseProduct(product.cartId)}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>

                <button
                  className="delete"
                  onClick={() => removeProduct(product.cartId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout">
          <p className="heading">Price Details</p>

          <div className="price">
            <p>Price: </p>
            <p>&#36; {allItemCost.toLocaleString()}</p>
          </div>

          <div className="delivery">
            <p>Delivery Charges: </p>
            {allItemCost < 1000 ? <p>&#36; 100</p> : <p>Free</p>}
          </div>

          <div className="total">
            <p>Total: </p>
            <p>&#36; {total.toLocaleString()}</p>
          </div>

          {value.currentUser ? (
            <Link to="/" onClick={placeOrder} className="checkout-btn">
              Place Order
            </Link>
          ) : (
            <Link to="/login" className="checkout-btn">
              Place Order
            </Link>
          )}
          <small>*Free Delivery for orders above &#36;1000 </small>
        </div>
      </div>
    </section>
  );
}
