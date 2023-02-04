import React, { useContext, useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Dataservices from "./Dataservices";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { DataContext } from "./DataProvider";

import { getAllCategories, updateProduct } from "../api/index";
import Routes from "../api/apiRoutes";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";

export default function AddProduct() {
  const { id } = useParams();
  const value = useContext(DataContext);
  const [products] = value.products;
  const [productUrl, setProductUrl] = useState("");
  const details = products.filter((product) => product.productId == id);
  const [values, setValues] = React.useState({
    imgUrl: "",
    title: "",
    description: "",
    price: "",
  });
  // const [productTitle, setProductTitle] = useState('');
  // const [productDescription, setProductDescription] = useState('');
  // const [productPrice, setProductPrice] = useState('');
  // const [productContent, setProductContent] = useState('');
  // const [baseImage, setBaseImage] = useState("");

  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const getCategories = async () => {
    let response = await getAllCategories(Routes.getAllCategories);
    setCategories(response.data.categories);
  };

  useEffect(() => {
    getCategories();
    // setProductName(details[0].title)
    // setProductDescription(details[0].description)
    // setProductPrice(details[0].price)
    setProductUrl(
      "https://localhost:44350/images/uploads/productImages/" +
        details[0].productImage
    );
    // setProductContent(details[0].content)

    setProductName(details[0].productName);
    setCategory(details[0].fkCategoryId);
    setProductPrice(details[0].productPrice);
    setProductQty(details[0].productQty);
    setProductDescription(details[0].productDesc);
  }, []);

  const styles = {
    largeIcon: {
      width: 30,
      height: 30,
      marginRight: 3,
    },
    backgroundImage: {
      width: "500px",
      borderRadius: 0,
      backgroundColor: "none",
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const rr = {pid:details[0].pid,title:productTitle,image:"image",description:productDescription,content:"ssss",price:productPrice,count:"1"}

    let form = new FormData();
    form.append("ProductId", details[0].productId);
    form.append("FkCategoryId", category);
    form.append("ProductName", productName);
    form.append("ProductPrice", productPrice);
    form.append("ProductQty", productQty);
    form.append("ProductImage", productImage);
    form.append("ProductDesc", productDescription);
    Dataservices.updateProduct(form);
    // let response = await updateProduct(Routes.updateProduct, form);
    // console.log(response);
    history.push("/progress-product");
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    // setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <section>
      <div
        className="landing-box"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          textAlign: "start",
        }}
      >
        <div>
          <img
            style={styles.backgroundImage}
            src={productUrl ? productUrl : "bg.png"}
            alt="landing-pic"
          />
        </div>
        <div>
          <h1>Edit Product</h1>
          <p>Add some information for the product you want to create.</p>
          <br />
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <Select
              style={{ width: 300 }}
              id="demo-simple-select"
              value={category}
              label="Select Category"
              variant="filled"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.categoryId}
                  value={category.categoryId}
                  // style={getStyles(category.categoryName, category, theme)}
                >
                  {category.categoryName}
                </MenuItem>
              ))}
              {/* <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>

            <TextField
              value={productName}
              fullWidth
              id="produtImage"
              label="Product Name"
              variant="outlined"
              onChange={(event) => setProductName(event.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Product Price"
              value={productPrice}
              onChange={(event) => setProductPrice(event.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Product Quantity"
              value={productQty}
              onChange={(event) => setProductQty(event.target.value)}
            />
            <Button variant="outlined" component="label">
              Product Image
              <input
                type="file"
                hidden
                onChange={(e) => setProductImage(e.target.files[0])}
              />
            </Button>
            <br />

            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Product Description"
              multiline
              rows={4}
              value={productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
            />

            <button
              type="submit"
              className="form-btn"
              style={{ fontSize: "18px" }}
            >
              Update Product
            </button>
            <br />
          </form>
        </div>
      </div>
    </section>
  );
}
