import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    Row,
    Col,
    Image,
    Container,
} from "react-bootstrap";
// 
import { Button } from "@material-ui/core/";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// 
import { PRODUCT_DELETE_RESET } from '../constants/product.constant';
import { deleteProduct, listProduct } from '../actions/product.action';
// 
import ErrorMessage from "../components/Message/ErrorMessage";
import Loading from '../components/Loading/Loading';
import SuccessMessage from "../components/Message/SuccessMessage";
import DefaultLoading from '../components/Loading/DefaultLoading';
import PaginationRounded from '../components/Pagination/Pagination';
import '../assets/css/Table.css';


export default function ProductListManage(props) {
    // 
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate } = productCreate;
    // 
    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete, } = productDelete;
    //
    // Pagination
    // const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    // GetDataCurrentPage
    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
    //ChangePage
    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    // 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProduct());

    }, [dispatch, successDelete])


    const deleteProductHandler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteProduct(product._id));
        }
    };
    const createProductHandler = () => {
        props.history.push("/productsCreate")
    };

    return (
        <Container>
            <h1>Products List</h1><hr />
            <Button variant="contained" color="primary" onClick={createProductHandler}>
                Create Product
            </Button><hr />
            <PaginationRounded 
                perPage={perPage} 
                totalPosts={products.length} 
                currentPage={currentPage}
                handleChangePage={handleChangePage}/>
            { successDelete && <SuccessMessage message={"Delete Product Success !"} reset={PRODUCT_DELETE_RESET} />}

            { loadingDelete && <DefaultLoading />}
            { errorDelete && <ErrorMessage message={errorDelete} reset={PRODUCT_DELETE_RESET} />}

            { loadingCreate && <DefaultLoading />}
            { errorCreate && <ErrorMessage message={errorCreate} />}
            {
                loading ? (<Loading />) :
                    error ? (<ErrorMessage message={error} />) : (
                            <Row>
                                <Col>
                                    <Table striped bordered responsive className="table-productlist">
                                        <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>IMAGE</th>
                                                <th>PRICE</th>
                                                <th>QUANTITY</th>
                                                <th>CATEGORY</th>
                                                <th>TAG</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPosts.map((product) => (
                                                <tr key={product._id}>
                                                    <td className="table-name">{product.name}</td>
                                                    <td className="table-image"><Image src={product.image} alt={product.name} fluid rounded /></td>
                                                    <td>{product.price}</td>
                                                    <td>{product.countInStock}</td>
                                                    <td>{product.category}</td>
                                                    <td>{product.tag}</td>
                                                    <td className="table-action-user">
                                                        <Button variant="contained" color="primary"><LinkContainer to={"/products/" + product._id + "/edit"}><EditIcon /></LinkContainer></Button>
                                                        <Button variant="contained" color="secondary" onClick={(e) => deleteProductHandler(product)}><DeleteIcon />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>                
                    )
            }
        </Container>
    )
}