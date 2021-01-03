import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
// 
import '../assets/css/ProductList.css';
// 
import { addToCart } from '../actions/cart.action';
import { listProduct } from '../actions/product.action';
import { createFavorite } from '../actions/favorite.action';
// 
import FilterBox from '../components/Filter/FilterBox';
import CardProductList from '../components/CardProduct/CardProductList';
import Loading from '../components/Loading/Loading';
import ErrorMessage from "../components/Message/ErrorMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import PaginationRounded from '../components/Pagination/Pagination';
// 
import { FAVORITE_CREATE_RESET, FAVORITE_DELETE_IDPR_RESET } from '../constants/favorite.constant';
import { listMyFavorites, deleteProductIdFavorite } from '../actions/favorite.action';

export default function ProductList(props) {
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;
    const [category, setCategory] = useState("None");
    const qty = 1;

    const addToCartHandler = (productId, qty) => {
        dispatch(addToCart(productId, qty));
    }
    // 
    const favoriteCreate = useSelector((state) => state.favoriteCreate);
    const { success: successCreate, error: errorCreate } = favoriteCreate;
    // 
    const favoriteDeleteProductId = useSelector((state) => state.favoriteDeleteProductId);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = favoriteDeleteProductId;
    // 
    const myFavoriteList = useSelector((state) => state.myFavoriteList);
    const { favorites } = myFavoriteList;
    // 
    const addFavoriteHandler = (id, img, name, price, category) => {
        dispatch(createFavorite({
            productId: id,
            image: img,
            name,
            price,
            category,
        }));
    }
    // 
    const deleteFavoriteHandler = (productId) => {
        dispatch(deleteProductIdFavorite(productId));
    };
    // 
    // 
    const [sort, setSort] = useState([]);
    const handleSort = (value) => {
        sort.includes(value)
            ? setSort(sort.filter((s) => s !== value))
            : setSort((sort) => sort.concat(value));
    };
    // Sort Product
    const productsItem = products.filter(product => product.category === category);
    const [price, setPrice] = useState("");
    var _products = [];
    if (category === 'None') {
        _products = products
    }
    else {
        _products = productsItem;
    }
    for (var sortItem of sort) {
        if (sortItem === 'name') {
            _products = [..._products].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
        }
        else {
            _products = products;
        }
    }
    if (price === 'min') {
        _products = [..._products].sort((a, b) => (a.price - b.price));
    }
    else if (price === 'max') {
        _products = [..._products].sort((a, b) => (b.price - a.price));
    }
    // 
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(9);
    // console.log(currentPage);
    // GetDataCurrentPage
    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentPosts = _products.slice(indexOfFirstPost, indexOfLastPost);
    //ChangePage
    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProduct());
        dispatch(listMyFavorites());
        if (category !== 'None') {
            setCurrentPage(1);
        }
        return () => {
            //
        };
    }, [dispatch, category])
    return (
        <>
            {successCreate && <SuccessMessage message="Add Favorite Success !" reset={FAVORITE_CREATE_RESET} />}
            {successDelete && <SuccessMessage message="Remove Favorite Success !" reset={FAVORITE_DELETE_IDPR_RESET} />}
            {errorCreate && <ErrorMessage message={errorCreate} reset={FAVORITE_CREATE_RESET} />}
            {

                <div className="product-list">
                    <Container>
                        <div className="maintext"><h4>All Books Here</h4><p>Here is a list of all our book, choose the one that best for you !</p></div>
                        <PaginationRounded
                            perPage={perPage}
                            totalPosts={_products.length}
                            currentPage={currentPage}
                            handleChangePage={handleChangePage} />
                        <Row>
                            <Col md={9}>
                                {
                                    loading ? <Loading /> :
                                        error ? <ErrorMessage message={error} /> :
                                            (
                                                _products.length > 0 ?
                                                    <Row>
                                                        <CardProductList products={currentPosts} addToCartHandler={addToCartHandler} addFavoriteHandler={addFavoriteHandler} qty={qty} favorites={favorites} deleteFavoriteHandler={deleteFavoriteHandler} />
                                                    </Row> :
                                                    <h4 style={{ textAlign: "center" }}>Updating......</h4>
                                            )

                                }
                            </Col>
                            <Col md={3}>
                                <Card style={{ padding: "10px" }}>
                                    <FilterBox
                                        setCategory={setCategory}
                                        category={category}
                                        handleSort={handleSort}
                                        sort={sort}
                                        setPrice={setPrice}
                                        price={price}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            }
        </>
    )
}
