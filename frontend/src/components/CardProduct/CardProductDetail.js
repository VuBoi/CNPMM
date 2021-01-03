import React from 'react';
import { Card, Image } from 'react-bootstrap';
// 
import {
    Button,
    Select,
    MenuItem,
} from "@material-ui/core/";
// 
import StarIcon from '@material-ui/icons/Star';
import '../../assets/css/ProductDetail.css';

export default function CardProductDetail(props) {
    const { product, addToCartHandler, setQty, qty } = props;
    // 
    return (
        <div className="card-product" key={product._id}>
            <Image src={product.image} alt={product.name} fluid rounded />
            <hr style={{ margin: "0" }} />
            <Card.Body>
                <Card.Title tag="h5">{product.name}</Card.Title>
                <Card.Text className="product-star" tag="h6">{product.rating} <StarIcon /> ({product.numReviews}) Reviews</Card.Text>
                {
                    product.salePrice > 0
                        ? <Card.Text className="product-price" style={{ color: "red" }}>${product.salePrice}&nbsp;&nbsp;
                                <strike className="product-price--sale" style={{ color: "#7b7b7b" }}>${product.price}</strike>
                        </Card.Text>
                        : <Card.Text className="product-price" style={{ color: "red" }}>
                            ${product.price}
                        </Card.Text>
                }       
                <Card.Text>Status:{' '}{product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}</Card.Text>
                 Quantity:{' '}
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={qty} onChange={(e) => setQty(e.target.value)}
                    label="Quantity" >
                    {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1} > {x + 1}</MenuItem>))}
                </Select><br />
                <Button className="btn-addcart" onClick={addToCartHandler} color="primary" variant="contained" disabled={product.countInStock === 0}>Add To Card</Button>
            </Card.Body>
        </div>
    );
}
