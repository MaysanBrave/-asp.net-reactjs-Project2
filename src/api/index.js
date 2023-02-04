import axios from "axios";
// Home - Customer

const getHeaders = () => {
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      authorization: token,
    },
  };
  return config;
};

export const authLogin = async (url, data) => {
  try {
    let response = await axios.post(url, data);
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const authRegister = async (url, data) => {
  try {
    let response = await axios.post(url, data);
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

// USER -HOME
export const homeGetAllProducts = async (url) => {
  try {
    let response = await axios.get(url);
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

//Get Orders Details -Admin
export const getOrdersDetails = async (url, id) => {
  try {
    let response = await axios.get(url + "?orderId=" + id);
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const getAllCategories = async (url) => {
  try {
    let response = await axios.get(url);
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const addProduct = async (url, data) => {
  try {
    let response = await axios.post(url, data);
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const updateProduct = async (url, data) => {
  try {
    let response = await axios.put(url, data);
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const deleteProduct = async (url, id) => {
  try {
    let response = await axios.delete(url + "?productId=" + id);
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const getCartItems = async (url) => {
  try {
    let response = await axios.get(url, getHeaders());
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const addToCart = async (url, productID, productQty) => {
  try {
    let response = await axios.get(
      url + "?productId=" + productID + "&productQty=" + productQty,
      getHeaders()
    );
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const removeFromCart = async (url, cartId) => {
  try {
    let response = await axios.get(url + "?cartId=" + cartId, getHeaders());
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const increaseCartQuantity = async (url, cartId) => {
  try {
    let response = await axios.get(url + "?cartId=" + cartId, getHeaders());
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const decreaseCartQuantity = async (url, cartId) => {
  try {
    let response = await axios.get(url + "?cartId=" + cartId, getHeaders());
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};

export const checkout = async (url) => {
  try {
    let response = await axios.get(url, getHeaders());
    return response;
  } catch (err) {
    let errorMessage = err.message;
    return { errorMessage };
  }
};
