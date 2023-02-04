import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Routes from "../api/apiRoutes";
import { getOrdersDetails } from "../api/index";
import { API_BASE_IMAGE_URL } from "../config";

export default function OrderDetails() {
  // const value = useContext(DataContext);
  const { id } = useParams();
  // const [orders] = value.orders;
  // const details = orders.filter((order) => order.id === id)
  // const [cart,setCart] = useState([]);

  const [orderDetails, setOrderDetails] = useState([]);

  const getOrderAllDetails = async () => {
    let response = await getOrdersDetails(Routes.getOrderDetails, id);
    setOrderDetails(response.data.orderDetails);
  };
  useEffect(() => {
    // setCart(details[0].order)
    getOrderAllDetails();
  }, []);

  return (
    <section>
      <div className="cart">
        <div className="cart-box">
          {orderDetails?.map((product) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
