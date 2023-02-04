import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { DataContext } from "../DataProvider";
import DetailsThumb from "./DetailsThumb";
import Colors from "./Colors";

export default function Details() {
  const { id } = useParams();
  const value = useContext(DataContext);
  const [products] = value.products;
  const addCart = value.addCart;
  const [index, setIndex] = useState(0);
  const imgDiv = useRef();
  const details = products.filter((product) => product.productId == id);
  useEffect(() => {}, []);
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    imgDiv.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  return (
    <section>
      {details.map((product) => (
        <div className="details" key={product.pid}>
          <div
            className="details-img"
            onMouseMove={handleMouseMove}
            style={{
              backgroundImage: `url(https://localhost:44350/images/uploads/productImages/${product.productImage})`,
            }}
            ref={imgDiv}
            onMouseLeave={() =>
              (imgDiv.current.style.backgroundPosition = `center`)
            }
          />
          <div className="details-content">
            <h2 title={product.productName}>{product.productName}</h2>
            <p>{product.productDesc}</p>
            {/* <p>{product.content}</p> */}
            <h3>&#36; {product.productPrice}</h3>
            <Link
              to="/cart"
              className="details-addtocart"
              onClick={() => addCart(product.productId)}
            >
              Add to Cart
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
