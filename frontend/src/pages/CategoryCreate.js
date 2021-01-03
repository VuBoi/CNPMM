import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core/";
// 
import ErrorMessage from "../components/Message/ErrorMessage";
import FormContainer from "../components/Container/FormContainer";
import { CATEGORY_CREATE_RESET } from '../constants/category.constant';
// 
import { createCategory, listCategory } from '../actions/category.action';

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

export default function CategoryCreate(props){
    const [name, setName] = useState("");

    const categoryCreate = useSelector(state => state.categoryCreate);
    const { loading: loadingCreate, success: successCreate, error: errorCreate } = categoryCreate;

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
            dispatch({type: CATEGORY_CREATE_RESET})
            props.history.push('/categoriesListManage');           
        }
        dispatch((listCategory()));
        return () => {
            //
        }
    }, [successCreate, dispatch, props.history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createCategory({
            name,
        }));
    }
  return (
    <Container>
      <Link to="/categoriesListManage">
        <Button variant="contained" color="primary">Go Back</Button>
      </Link>
          <FormContainer>
            <h1>Create Category</h1>
            {errorCreate && (<ErrorMessage message={errorCreate} reset={CATEGORY_CREATE_RESET} />)}
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