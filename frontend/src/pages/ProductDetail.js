import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Col, Row, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// 
import { detailsProduct, saveProductReview } from '../actions/product.action';
import { addToCart } from '../actions/cart.action';
// 
import CardProductDetail from '../components/CardProduct/CardProductDetail';
import InfoProduct from '../components/CardProduct/InfoProduct';
import Loading from '../components/Loading/Loading';
import ErrorMessage from "../components/Message/ErrorMessage";
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
// 
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/product.constant';
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

export default function ProductDetail(props) {
    const classes = useStyles();
    // 
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    // 
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const productReviewSave = useSelector((state) => state.productReviewSave);
    const { loading: loadingCreateReview, success: productSaveSuccess } = productReviewSave;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    // 
    const dispatch = useDispatch();
    useEffect(() => {
        if (productSaveSuccess) {
            alert('Review submitted successfully.');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
          }
        //   
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, [dispatch, props.match.params.id, productSaveSuccess])
    // 
    const addToCartHandler = () => {
        dispatch(addToCart(props.match.params.id, Number(qty)));
        props.history.push("/cart");
    }
    // 
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(
          saveProductReview(props.match.params.id, {
            name: userInfo.name,
            rating: rating,
            comment: comment,
          })
        );
      };
    //   
    return (
        loading ? <Loading/> :
            error ? <ErrorMessage message={error} /> :
                <div className="product-detail">
                    <Container>
                    <Link to="/productsList">
                        <Button variant="contained" color="primary" style={{marginBottom:"10px"}}>Go Back</Button>
                    </Link>
                        <Row>
                            <Col sm={12} md={6} lg={4}>
                                <CardProductDetail
                                    product={product}
                                    addToCartHandler={addToCartHandler}
                                    setQty={setQty}
                                    qty={qty}>
                                </CardProductDetail>
                            </Col>
                            <Col md={{order:6}}>
                                <Row>
                                    <InfoProduct 
                                     product={product}
                                    />
                                </Row>
                            </Col>
                        </Row>
                        <hr />
                      <Row>                    
                          {
                            userInfo ? 
                            (
                              <Container>
                                 <h3>Write a customer review</h3><br></br>
                                   <Form onSubmit={submitHandler}>
                                   <FormControl variant="outlined" className={classes.formControl}>
                                          <InputLabel id="demo-simple-select-outlined-label">
                                            Rating
                                          </InputLabel>
                                          <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            onChange={(e) => setRating(e.target.value)}
                                            label="Rating"
                                            value={rating}
                                          >
                                            <MenuItem value="1"><em>1- Poor</em></MenuItem>
                                            <MenuItem value="2">2- Fair</MenuItem>
                                            <MenuItem value="3">3- Good</MenuItem>
                                            <MenuItem value="4">4- Very Good</MenuItem>
                                            <MenuItem value="5">5- Excelent</MenuItem>
                                          </Select>
                                        </FormControl>
                                        {/*  */}
                                        <TextField
                                          variant="outlined"
                                          type="text"
                                          margin="normal"
                                          required
                                          fullWidth
                                          id="comment"
                                          label="Comment"
                                          name="comment"
                                          autoComplete="comment"
                                          autoFocus
                                          value={comment}
                                          multiline
                                          rows={8}
                                          onChange={(e) => setComment(e.target.value)}
                                        />
                                         <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={loadingCreateReview}
                                          >
                                            {loadingCreateReview ? (
                                              <CircularProgress
                                                color="inherit"
                                                className={classes.prgressColor}
                                              />
                                            ) : (
                                                <>Submit</>
                                              )}
                                          </Button>
                                   </Form>
                              </Container>
                             
                            ):
                            (
                            <div>
                              Please <Link to="/signin">Sign-in</Link> to write a review.
                            </div>
                            )
                          }
                      </Row>
                    </Container>
                </div>
    )
}
