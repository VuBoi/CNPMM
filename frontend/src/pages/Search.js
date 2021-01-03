import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSearchProduct } from '../actions/product.action';
import { Container, Row, Col } from 'react-bootstrap';
// 
import ErrorMessage from "../components/Message/ErrorMessage";
import Loading from '../components/Loading/Loading';
import CardProductSearch from '../components/CardProduct/CardProductSearch';
import PaginationRounded from '../components/Pagination/Pagination';
// 
import { addToCart } from '../actions/cart.action';

export default function Search(props) {
  const name = props.location.search ? props.location.search.split('=')[1] : "";
  const productListSearch = useSelector((state) => state.productListSearch);
  const { loading, products, error } = productListSearch;
  const qty = 1;   
  const addToCartHandler = (productId, qty) => {
      dispatch(addToCart(productId, qty));
  }
   //Pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [perPage, setPerPage] = useState(8);
   // GetDataCurrentPage
   const indexOfLastPost = currentPage * perPage;
   const indexOfFirstPost = indexOfLastPost - perPage;
   const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
   //ChangePage
   const handleChangePage = (event, value) => {
       setCurrentPage(value);
   };


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listSearchProduct(name));
    return () => {
      //
    };
  }, [name, dispatch])
  return (
    <Container>
     <h1>Result Search: {name}</h1><hr />
      {
        loading ? (<Loading />) :
          error ? (<ErrorMessage message={error} />) : (
            <>
            <PaginationRounded 
                perPage={perPage} 
                totalPosts={products.length} 
                currentPage={currentPage}
                handleChangePage={handleChangePage}/>
              {products.length === 0 && (
                <div><h4 style={{textAlign:"center"}}>Product Not Found !</h4></div>
              )}
              <Row>
                <Col>
                  <Row>
                    <CardProductSearch products={currentPosts} addToCartHandler={addToCartHandler} qty={qty} />
                  </Row>
                </Col>
              </Row>
            </>
          )}
    </Container>
  );
}
