import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    Row,
    Col,
    Image,
    Container,
} from "react-bootstrap";
import { Link } from 'react-router-dom';
// 
import { Button } from "@material-ui/core/";
import DeleteIcon from '@material-ui/icons/Delete';
// 
import { FAVORITE_DELETE_RESET } from '../constants/favorite.constant';
import { listMyFavorites, deleteFavorite } from '../actions/favorite.action';
// 
import ErrorMessage from "../components/Message/ErrorMessage";
import Loading from '../components/Loading/Loading';
import SuccessMessage from "../components/Message/SuccessMessage";
import DefaultLoading from '../components/Loading/DefaultLoading';
import PaginationRounded from '../components/Pagination/Pagination';
import '../assets/css/Table.css';


export default function Favorite(props) {
    // 
    const myFavoriteList = useSelector((state) => state.myFavoriteList);
    const { loading, error, favorites } = myFavoriteList;
    // 
    const favoriteDelete = useSelector((state) => state.favoriteDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = favoriteDelete;
    //
    // Pagination
    // const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    // GetDataCurrentPage
    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentPosts = favorites.slice(indexOfFirstPost, indexOfLastPost);
    //ChangePage
    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    // 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listMyFavorites());

    }, [dispatch, successDelete])


    const deleteFavoriteHandler = (favorite) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteFavorite(favorite._id));
        }
    };

    return (
        <Container>
            <h1>My Favorite List</h1><hr />
            <PaginationRounded
                perPage={perPage}
                totalPosts={favorites.length}
                currentPage={currentPage}
                handleChangePage={handleChangePage} />
            { successDelete && <SuccessMessage message={"Delete Favorite Success !"} reset={FAVORITE_DELETE_RESET} />}

            { loadingDelete && <DefaultLoading />}
            { errorDelete && <ErrorMessage message={errorDelete} reset={FAVORITE_DELETE_RESET} />}
            {
                loading ? (<Loading />) :
                    error ? (<ErrorMessage message={error} />) : (
                        <Row>
                            <Col>
                                <Table striped bordered responsive className="table-productlist">
                                    <thead>
                                        <tr>
                                            <th>IMAGE</th>     
                                            <th>NAME</th>                                    
                                            <th>PRICE</th>
                                            <th>CATEGORY</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPosts.map((favorite) => (
                                            <tr key={favorite._id}>
                                                <td className="table-image"><Link to={'/products/' + favorite.productId}><Image src={favorite.image} alt={favorite.name} fluid rounded /></Link></td>
                                                <td className="table-name">{favorite.name}</td>
                                                <td className="table-name">{favorite.price}</td>
                                                <td className="table-name">{favorite.category}</td>
                                                <td className="table-action-user">
                                                    <Button variant="contained" color="secondary" onClick={(e) => deleteFavoriteHandler(favorite)}><DeleteIcon />
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