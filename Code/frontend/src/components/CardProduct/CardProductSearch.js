import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
// 
import { Button } from "@material-ui/core/";
// 
// import StarIcon from '@material-ui/icons/Star';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
// 
import '../../assets/css/ProductDetail.css';


export default function CardProductSearch(props) {
    const { products, addToCartHandler, qty } = props;
    return (
        products.map(product =>
            <Col lg={3} md={4} sm={6} className="col-card" key={product._id}>
                <div className="card-product-list">
                    <Link to={'/products/' + product._id}><Image src={product.image} alt={product.name} fluid rounded /></Link>
                    <hr style={{ margin: "5px 0 0 0" }} />
                    <Card.Body>
                        <Card.Title tag="h5"><Link to={'/products/' + product._id}>{product.name}</Link></Card.Title>
                        {/* <Card.Text className="product-star" tag="h6">{product.rating} <StarIcon /> ({product.numReviews}) Reviews</Card.Text> */}
                        {
                            product.salePrice > 0 
                            ? <Card.Text className="product-price" style={{ color: "red" }}>${product.salePrice}&nbsp;&nbsp;
                                <strike className="product-price--sale" style={{ color: "#7b7b7b" }}>${product.price}</strike>
                            </Card.Text>
                            :  <Card.Text className="product-price" style={{ color: "red" }}>
                                    ${product.price}
                                </Card.Text>
                        }       
                        <div className="product-button">
                            <div className="btn-addcart">
                                <Button className="btn-addcart" onClick={() => addToCartHandler(product._id, qty)} color="primary" variant="contained" disabled={product.countInStock === 0}><AddShoppingCartOutlinedIcon /></Button>
                            </div>
                            <div className="btn-favorite">
                                <Button className="product-favorite" onClick={() => addToCartHandler(product._id, qty)} color="primary" variant="contained" disabled={product.countInStock === 0}><FavoriteOutlinedIcon /></Button>
                            </div>
                        </div>
                    </Card.Body>
                </div >
            </Col>
        )
    );
}
