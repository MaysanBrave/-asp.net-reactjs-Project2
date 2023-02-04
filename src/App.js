import React from "react";
import Header from "./components/Header";
import { Redirect, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import EditProduct from "./components/EditProduct";
import Footer from "./components/Footer";
import Products from "./components/Products";
import { DataProvider } from "./components/DataProvider";
import Details from "./components/Details/Details";
import Cart from "./components/Cart";
import Login from "./components/Signin/Login";
import Error from "./components/Error";
import ProgressOrders from "./components/ProgressOrders";
import AddProduct from "./components/AddProduct";
import About from "./components/About";
import { useState } from "react";
import ProductsHandler from "./components/ProductsHandler";
import OrderDetails from "./components/OrderDetail";
import ProgressProducts from "./components/ProgressProducts";

function App() {
  const [search, setSearch] = useState("");

  return (
    <DataProvider>
      <>
        <Switch>
          <Route exact path="/error404" component={Error} />
          <Route>
            <Header setSearch={setSearch} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/products"
                component={() => <ProductsHandler search={search} />}
              />
              <Route exact path="/products/:id" component={Details} />
              <Route exact path="/orders/:id" component={OrderDetails} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/about" component={About} />
              <Route exact path="/orders" component={ProgressOrders} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/edit-product/:id" component={EditProduct} />
              <Route
                exact
                path="/progress-product"
                component={ProgressProducts}
              />
              <Redirect to="/error404" />
              <Products />
            </Switch>
            <Footer />
          </Route>
        </Switch>
      </>
    </DataProvider>
  );
}

export default App;
