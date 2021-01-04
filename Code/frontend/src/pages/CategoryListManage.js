import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    Row,
    Col,
    Container,
} from "react-bootstrap";
// 
import { Button } from "@material-ui/core/";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// 
import { CATEGORY_DELETE_RESET } from '../constants/category.constant';
import { deleteCategory, listCategory } from '../actions/category.action';
// 
import ErrorMessage from "../components/Message/ErrorMessage";
import Loading from '../components/Loading/Loading';
import SuccessMessage from "../components/Message/SuccessMessage";
import DefaultLoading from '../components/Loading/DefaultLoading';
import '../assets/css/Table.css';


export default function CategoryListManage(props) {
    // 
    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const { loading: loadingCreate, error: errorCreate } = categoryCreate;
    // 
    const categoryDelete = useSelector((state) => state.categoryDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete, } = categoryDelete;
    // 
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(listCategory());
    }, [dispatch, successDelete]);

    const deleteCategoryHandler = (category) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteCategory(category._id));
        }
    };
    const createcategoryHandler = () => {
        props.history.push("/categoriesCreate")
    };

    return (
        <Container>
            <h1>Categories List</h1><hr />
            <Button variant="contained" color="primary" onClick={createcategoryHandler}>
                Create category
            </Button><hr />
            { successDelete && <SuccessMessage message={"Delete category Success !"} reset={CATEGORY_DELETE_RESET} />}
            
            { loadingDelete && <DefaultLoading />}
            { errorDelete && <ErrorMessage message={errorDelete} reset={CATEGORY_DELETE_RESET} />}

            { loadingCreate && <DefaultLoading />}
            { errorCreate && <ErrorMessage message={errorCreate} />}
            {
                loading ? (<Loading />) :
                    error ? (<ErrorMessage message={error} />) : (
                            <Row>
                                <Col>
                                    <Table striped bordered className="table-productlist">
                                        <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((category) => (
                                                <tr key={category._id}>
                                                    <td className="table-categoryinfo">
                                                        {category.name}
                                                    </td>                                                 
                                                    <td className="table-action-user">
                                                        <Button variant="contained" color="inherit"><LinkContainer to={"/categories/" + category._id + "/edit"}><EditIcon /></LinkContainer></Button>
                                                        <Button variant="contained" color="secondary" onClick={(e) => deleteCategoryHandler(category)}><DeleteIcon />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table></Col>
                            </Row>
                        )
            }
        </Container>
    )
}