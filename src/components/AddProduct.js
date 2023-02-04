import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "./DataProvider";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useHistory } from "react-router-dom";
import { getAllCategories, addProduct } from "../api/index";
import Routes from "../api/apiRoutes";
import Dataservices from "./Dataservices";

export default function AddProduct() {
  const [values, setValues] = React.useState({
    imgUrl: "",
    title: "",
    description: "",
    price: "",
  });

  const history = useHistory();
  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const value = useContext(DataContext);
  //const [setProducts] = value.products;

  const [productUrl, setProductUrl] = useState("");
  // const [productContent, setProductContent] = useState('');
  // const [baseImage, setBaseImage] = useState("");
  // const value = useContext(DataContext)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
    let form = new FormData();
    form.append("FkCategoryId", category);
    form.append("ProductName", productName);
    form.append("ProductPrice", productPrice);
    form.append("ProductQty", productQty);
    form.append("ProductImage", productImage);
    form.append("ProductDesc", productDescription);

    // const rr = {pid:Date.now(),title:productTitle,image:productUrl,description:productDescription,content:"ssss",price:productPrice,count:""}
    Dataservices.createProduct(form).then((res) => {
      setProductDescription("");
      setProductName("");
      setProductPrice("");
      setProductQty("");
      setProductImage("");
      setProductUrl("");
      setProductDescription("");
      history.push("/product-progress");
    });

    // let response = await addProduct(Routes.addProduct, form);
    history.push("/progress-product");
    // value.setProducts((prev) => [
    //   ...prev,
    //   {
    //     category,
    //     productName,
    //     productPrice,
    //     productQty,
    //     productImage,
    //     productDescription,
    //   },
    // ]);
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

  const getCategories = async () => {
    let response = await getAllCategories(Routes.getAllCategories);
    setCategories(response.data.categories);
  };
  useEffect(() => {
    getCategories();
  }, []);

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
          <h1>Add New Product</h1>
          <p>Add some information for the product you want to create.</p>
          <br />
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
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
                id="productTitle"
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

              {/* <TextField fullWidth id="productContent" label="Content" variant="outlined" value={productContent} onChange={event => setProductContent(event.target.value)} /> */}
              {/* <FormControl fullWidth sx={{m: 1}} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}> */}
              {/* <TextField sx={{width: '25ch'}} id="outlined-basic" label="Price" variant="outlined"
                                           onChange={event => setProductPrice(event.target.value)} style={{
                                    margin: '15px 0 0 0',
                                    padding: '0'
                                }}
                                value={productPrice}
                                /> */}
              <button
                type="submit"
                className="form-btn"
                style={{ fontSize: "18px" }}
              >
                Add Product
              </button>
              <br />
            </FormControl>
          </form>
        </div>
      </div>
    </section>
  );
}
