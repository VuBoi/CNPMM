import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
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
import ErrorMessage from "../components/Message/ErrorMessage";
import FormContainer from "../components/Container/FormContainer";
import DefaultLoading from '../components/Loading/DefaultLoading';
import { PRODUCT_CREATE_RESET } from '../constants/product.constant';
// 
import { createProduct, listProduct } from '../actions/product.action';
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

export default function ProductCreate(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [category, setCategory] = useState("None");
  const [countInStock, setCountInStock] = useState(0);
  const [tag, setTag] = useState("None");
  const [description, setDescription] = useState("");

  const productCreate = useSelector(state => state.productCreate);
  const { loading: loadingCreate, success: successCreate, error: errorCreate } = productCreate;
  const categoryList = useSelector(state => state.categoryList);
  const { categories } = categoryList;

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      props.history.push('/productsListManage');
    }
    dispatch((listProduct()));
    dispatch((listCategory()));
    return () => {
      //
    }
  }, [successCreate, dispatch, props.history])


  const submitHandler = (e) => {
    e.preventDefault();
    if (salePrice > price) {
      <ErrorMessage message={"Sale Price Not Greater Than Price !, Please Enter Again."}/>
    }
    else {
      dispatch(createProduct({
        name,
        image,
        price,
        salePrice,
        category,
        countInStock,
        description,
        tag
      }));
    }
  }
  //Cach Upload LocalHost
  // const userSignin = useSelector(state => state.userSignin);
  // const {userInfo} = userSignin;
  // const uploadFileHandler = async(e) =>{
  //   const file = e.target.files[0];
  //     const bodyFormData = new FormData();
  //     bodyFormData.append('image', file);
  //     setLoadingUpload(true);
  //     try {
  //         const { data } = await Axios.post('/api/uploads', bodyFormData, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data',
  //                 Authorization: 'Vu Boi ' + userInfo.token,
  //             },
  //         });
  //         setImage(data);
  //         setLoadingUpload(false);
  //     } catch (error) {
  //         setErrorUpload(error.message);
  //         setLoadingUpload(false);
  //     }
  // }
  // 
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  //
  const url = 'https://api.cloudinary.com/v1_1/vuboi/image/upload';
  const preset = 'imagetlcn'
  //  
  const uploadFileHandler = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', preset)
    setLoadingUpload(true)
    try {
      const res = await axios.post(url, data);
      const imageUrl = res.data.secure_url;
      setImage(imageUrl)
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <Container>
      <Link to="/productsListManage">
        <Button variant="contained" color="primary">Go Back</Button>
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {errorCreate && (<ErrorMessage message={errorCreate} reset={PRODUCT_CREATE_RESET} />)}
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
              {...loadingUpload && <DefaultLoading />}
              {...errorUpload && (<ErrorMessage message={errorUpload} />)}
            />
            <Button color="secondary" fullWidth variant="contained" component="span" onChange={uploadFileHandler}>
              <AddIcon /> Upload Image
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
            disabled={loadingCreate}
          >
            {loadingCreate ? (
              <CircularProgress
                color="inherit"
                className={classes.prgressColor}
              />
            ) : (
                <>Create</>
              )}
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};