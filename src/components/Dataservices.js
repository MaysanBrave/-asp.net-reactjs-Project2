import http from "./http-common";
import axios from "axios";
import ROUTES from "../api/apiRoutes";
const API_BASE_PATH = "https://localhost:44350/api";

const getHeaders = () => {
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      authorization: token,
    },
  };
  return config;
};

class DataServices {
  async getAllUsers() {
    return axios.get(`${API_BASE_PATH}/auth/getAllUsers`);
  }

  async getAllProducts() {
    return axios.get(ROUTES.getAllProducts);
  }
  async getAllOrders() {
    // return http.get("/orders");
    return axios.get(ROUTES.getAllOrders);
  }
  async createOrder() {
    //return http.post("/order", order);
    return axios.get(ROUTES.checkout, getHeaders());
  }
  async createProduct(product) {
    // return http.post("/product", product);
    return axios.post(ROUTES.addProduct, product);
  }
  async updateProduct(product) {
    //return http.put("/product", product);
    return axios.put(ROUTES.updateProduct, product);
  }
  async updateOrder(order) {
    // return http.put("/order", order);
    return axios.put(ROUTES.updateOrder, order);
  }
  async deleteOrder(id) {
    // return http.delete(`/order/${id}`);
    return axios.delete(ROUTES.deleteOrder + "?orderId=" + id);
  }
  async deleteProduct(id) {
    // return http.delete(`/product/${id}`);
    return axios.delete(ROUTES.deleteProduct + "?productId=" + id);
  }
}

export default new DataServices();
