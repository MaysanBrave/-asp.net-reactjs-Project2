import React, { createContext, useState, useEffect } from "react";
import Dataservices from "./Dataservices";
import { addToCart } from "../api/index";
import ROUTES from "../api/apiRoutes";
export const DataContext = createContext();

export const DataProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  // const [currentUser,setCurrentUser] = useState(localStorage.getItem("productUser674") ? JSON.parse(localStorage.getItem("productUser674")) : null)
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("role"));
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  const getData = async () => {
    Dataservices.getAllUsers().then((res) => {
      setUsers(res.data);
    });
    Dataservices.getAllProducts().then((res) => {
      setProducts(res.data.products);
    });
    Dataservices.getAllOrders().then((res) => {
      setOrders(res.data.orders);
    });
  };

  useEffect(() => {
    getData();
  }, [cart]);

  const addCart = async (id) => {
    let response = await addToCart(ROUTES.addToCart, id, "1");
    if (response.data.message === "Hi, item is out of stock") {
      alert(response.data.message);
      return;
    }
    if (response.data.message === "Product is added into cart") {
      alert("Product is added into cart");
      // const data = products.filter((product) => {
      //   return product.cartId === id;
      // });
      // setCart([...cart, ...data]);
      // const check = cart.every((item) => {
      //   return item.cartId !== id;
      // });
      // if (check) {
      //   const data = products.filter((product) => {
      //     return product.cartId === id;
      //   });
      //   setCart([...cart, ...data]);
      // } else {
      //   alert("Product has been added to cart.");
      // }
    }
  };

  useEffect(() => {
    const storageCart = JSON.parse(localStorage.getItem("storageCart"));

    if (storageCart) {
      setCart(storageCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("storageCart", JSON.stringify(cart));
  }, [cart, products]);

  const value = {
    products: [products, setProducts],
    users: [users, setUsers],
    cart: [cart, setCart],
    // currentUser: [currentUser, setCurrentUser],
    currentUser: currentUser,
    addCart: addCart,
    setCart: setCart,
    setCurrentUser: setCurrentUser,
    orders: [orders, setOrders],
    setOrders: setOrders,
    setProducts: setProducts,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
