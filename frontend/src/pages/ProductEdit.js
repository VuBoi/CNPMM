import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
// 
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Input,
} from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";
// 
import FormContainer from "../components/Container/FormContainer";
import Loading from '../components/Loading/Loading';
import { PRODUCT_UPDATE_RESET } from '../constants/product.constant';
import ErrorMessage from "../components/Message/ErrorMessage";
import DefaultLoading from '../components/Loading/DefaultLoading';
import WarningMessage from '../components/Message/WarningMessage';

// 
import { detailsProduct, updateProduct } from '../actions/product.action';
import { listCategory } from '../actions/category.action';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: "#fff",
  },
}));

export default function ProductEdit(props){
  const classes = useStyles();
  // 
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate; 
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const categoryList = useSelector(state =>state.categoryList);
  const { categories } = categoryList;
  // 
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [category, setCategory] = useState("None");
  const [countInStock, setCountInStock] = useState(0);
  const [tag, setTag] = useState("None");
  const [description, setDescription] = useState("");
  // 
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productsListManage');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
      dispatch((listCategory()));
    }
    else {
      setName(product.name);
      setImage(product.image);
      setPrice(product.price);
      setSalePrice(product.salePrice);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setTag(product.tag);
    }
  },[product, dispatch, productId, successUpdate, props.history]);

  // Modal
  const [openMessage, setMessage] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    if (salePrice > price) {
      setMessage(true);    
    }
    else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          image,
          price,
          salePrice,
          category,
          countInStock,
          description,
          tag
        })
      );
    }
  };
  // 
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Vu Boi ' + userInfo.token,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <Container>
      {openMessage && <WarningMessage message={"Sale Price Not Greater Than Price!"} setMessage={setMessage}/>}
      { errorUpdate && <ErrorMessage message={errorUpdate} reset={PRODUCT_UPDATE_RESET}/>}
      <Link to="/productsListManage">
        <Button variant="contained" color="primary">Go Back</Button>
      </Link>
          <FormContainer>
            <h1>Edit Product</h1>
            {loading ? (<Loading />) :
                  error ? (<ErrorMessage message={error} />) : (
            <Form onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="image"
                label="Image"
                name="image"
                autoComplete="image"
                autoFocus
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

                <InputLabel htmlFor="imageFile">
                  <Input
                    style={{ display: "none" }}
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    onChange={uploadFileHandler}
                    {...loadingUpload && <DefaultLoading/>}
                    {...errorUpload && (<ErrorMessage message={errorUpload}/>)}
                  />
                  <Button color="secondary" fullWidth variant="contained" component="span" onChange={uploadFileHandler}>
                    <AddIcon/> Upload Image
                  </Button>
                </InputLabel>       

              <TextField
                variant="outlined"
                type="number"
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                autoFocus
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <TextField
                variant="outlined"
                type="number"
                margin="normal"
                fullWidth
                id="salePrice"
                label="salePrice"
                name="salePrice"
                autoComplete="salePrice"
                autoFocus
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
              />
              <TextField
                variant="outlined"
                type="number"
                margin="normal"
                required
                fullWidth
                id="countInStock"
                label="CountInStock"
                name="countInStock"
                autoComplete="countInStock"
                autoFocus
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                autoFocus
                value={description}
                multiline
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Tag
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setTag(e.target.value)}
                  label="Tag"
                  value={tag}
                >
                  <MenuItem value="None"><em>None</em></MenuItem>
                  <MenuItem value="Sale">Sale</MenuItem>
                  <MenuItem value="Hot">Hot</MenuItem>
                  <MenuItem value="Popular">Popular</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label" required>
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  value={category}
                  required
                >
                  {
                    categories.map(category => (
                      <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loadingUpdate}
              >
                {loadingUpdate ? (
                  <CircularProgress
                    color="inherit"
                    className={classes.prgressColor}
                  />
                ) : (
                  <>Update</>
                )}
              </Button>
            </Form>
            )}
          </FormContainer>
    </Container>
  );
};