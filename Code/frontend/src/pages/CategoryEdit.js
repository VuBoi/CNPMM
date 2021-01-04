import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// 
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core/";
// 
import FormContainer from "../components/Container/FormContainer";
import Loading from '../components/Loading/Loading';
import { CATEGORY_UPDATE_RESET } from '../constants/category.constant';
import ErrorMessage from "../components/Message/ErrorMessage";
// 
import { detailsCategory, updateCategory } from '../actions/category.action';

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

export default function CategoryEdit(props){
  const classes = useStyles();
  // 
  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = categoryDetails;
  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate; 
  // 
  const categoryId = props.match.params.id;
  const [name, setName] = useState("");
  // 
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/categoriesListManage');
    }
    if (!category || category._id !== categoryId || successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      dispatch(detailsCategory(categoryId));
    }
    else {
      setName(category.name);
    }
  },[category, dispatch, categoryId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
      })
    );
  };
  // 
  return (
    <Container>
      { errorUpdate && <ErrorMessage header="Something went wrong"
        message={errorUpdate} variant="danger"  reset={CATEGORY_UPDATE_RESET}/>}
      <Link to="/categoriesListManage">
        <Button variant="contained" color="primary">Go Back</Button>
      </Link>
          <FormContainer>
            <h1>Edit Category</h1>
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