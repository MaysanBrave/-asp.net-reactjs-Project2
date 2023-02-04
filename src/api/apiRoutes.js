const API_BASE_PATH = "https://localhost:44350/api";

const ROUTES = {
  //Customer - Home - Page
  homeGetAllProducts: `${API_BASE_PATH}/home/getAllProducts`,
  addToCart: `${API_BASE_PATH}/home/addToCart`,
  getCartItems: `${API_BASE_PATH}/home/getCartItems`,
  removeFromCart: `${API_BASE_PATH}/home/removeFromCart`,
  increaseCartQuantity: `${API_BASE_PATH}/home/increaseCartQuantity`,
  decreaseCartQuantity: `${API_BASE_PATH}/home/decreaseCartQuantity`,
  checkout: `${API_BASE_PATH}/home/checkout`,
  getMyOrders: `${API_BASE_PATH}/home/getMyOrders`,
  getMyOrderDetails: `${API_BASE_PATH}/home/getMyOrderDetails`,

  //AUTH
  login: `${API_BASE_PATH}/auth/login`,
  register: `${API_BASE_PATH}/auth/register`,
  getAllUsers: `${API_BASE_PATH}/auth/getAllUsers`,

  //Admin - Home

  //Categories
  addCategory: `${API_BASE_PATH}/manageCategories/addCategory`,
  updateCategory: `${API_BASE_PATH}/manageCategories/updateCategory`,
  getAllCategories: `${API_BASE_PATH}/manageCategories/getAllCategories`,
  getCategoryDetails: `${API_BASE_PATH}/manageCategories/getCategoryDetails`,
  deleteCategory: `${API_BASE_PATH}/manageCategories/deleteCategory`,
  //Products
  addProduct: `${API_BASE_PATH}/manageProducts/addProduct`,
  updateProduct: `${API_BASE_PATH}/manageProducts/updateProduct`,
  getAllProducts: `${API_BASE_PATH}/manageProducts/getAllProducts`,
  getProductDetails: `${API_BASE_PATH}/manageProducts/getProductDetails`,
  deleteProduct: `${API_BASE_PATH}/manageProducts/deleteProduct`,

  //Manage Products
  getAllOrders: `${API_BASE_PATH}/manageOrders/getAllOrders`,
  updateOrder: `${API_BASE_PATH}/manageOrders/updateOrder`,
  getOrderDetails: `${API_BASE_PATH}/manageOrders/getOrderDetails`,
  deleteOrder: `${API_BASE_PATH}/manageOrders/deleteOrder`,
};
export default ROUTES;
