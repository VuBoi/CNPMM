import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listProduct } from '../../actions/product.action';
// 
// import StarIcon from '@material-ui/icons/Star';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { Button } from "@material-ui/core/";
// 
import SliderCourse from './SliderCourse';
import TextHome from '../TextAnimation/TextHome';
import Loading from '../Loading/Loading';
//
import { addToCart } from '../../actions/cart.action';
import '../../assets/css/ProductDetail.css';
import '../../assets/css/Topcourse.css'

export default function TopCourse(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const qty = 1;
  const addToCartHandler = (productId, qty) => {
    dispatch(addToCart(productId, qty));
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct());
    return () => {
      //
    };
  }, [dispatch])

  const productItemHot = products.filter(product => product.tag === "Hot").map(productFilter =>
    <div className="card-product-list" key={productFilter._id}>
      <Link to={'/products/' + productFilter._id}><Image src={productFilter.image} alt={productFilter.name} fluid rounded /></Link>
      <hr style={{ margin: "5px 0 0 0" }} />
      <Card.Body>
        <Card.Title tag="h5"><Link to={'/products/' + productFilter._id}>{productFilter.name}</Link></Card.Title>
        {/* <Card.Text className="product-star" tag="h6">{product.rating} <StarIcon /> ({product.numReviews}) Reviews</Card.Text> */}
        {
          productFilter.salePrice > 0
            ? <Card.Text className="product-price" style={{ color: "red" }}>${productFilter.salePrice}&nbsp;&nbsp;
                                <strike className="product-price--sale" style={{ color: "#7b7b7b" }}>${productFilter.price}</strike>
            </Card.Text>
            : <Card.Text className="product-price" style={{ color: "red" }}>
              ${productFilter.price}
            </Card.Text>
        }     
        <div className="product-button">
          <div className="btn-addcart">
            <Button className="btn-addcart" onClick={() => addToCartHandler(productFilter._id, qty)} color="primary" variant="contained" disabled={productFilter.countInStock === 0}><AddShoppingCartOutlinedIcon /></Button>
          </div>
          <div className="btn-favorite">
            <Button className="product-favorite" onClick={() => addToCartHandler(productFilter._id, qty)} color="primary" variant="contained" disabled={productFilter.countInStock === 0}><FavoriteOutlinedIcon /></Button>
          </div>
        </div>
      </Card.Body>
    </div >
  )
  const productItemSale = products.filter(product => product.tag === "Sale").map(productFilter =>
    <div className="card-product-list" key={productFilter._id}>
      <Link to={'/products/' + productFilter._id}><Image src={productFilter.image} alt={productFilter.name} fluid rounded /></Link>
      <hr style={{ margin: "5px 0 0 0" }} />
      <Card.Body>
        <Card.Title tag="h5"><Link to={'/products/' + productFilter._id}>{productFilter.name}</Link></Card.Title>
        {/* <Card.Text className="product-star" tag="h6">{product.rating} <StarIcon /> ({product.numReviews}) Reviews</Card.Text> */}
        {
          productFilter.salePrice > 0
            ? <Card.Text className="product-price" style={{ color: "red" }}>${productFilter.salePrice}&nbsp;&nbsp;
                                <strike className="product-price--sale" style={{ color: "#7b7b7b" }}>${productFilter.price}</strike>
            </Card.Text>
            : <Card.Text className="product-price" style={{ color: "red" }}>
              ${productFilter.price}
            </Card.Text>
        }     
        <div className="product-button">
          <div className="btn-addcart">
            <Button className="btn-addcart" onClick={() => addToCartHandler(productFilter._id, qty)} color="primary" variant="contained" disabled={productFilter.countInStock === 0}><AddShoppingCartOutlinedIcon /></Button>
          </div>
          <div className="btn-favorite">
            <Button className="product-favorite" onClick={() => addToCartHandler(productFilter._id, qty)} color="primary" variant="contained" disabled={productFilter.countInStock === 0}><FavoriteOutlinedIcon /></Button>
          </div>
        </div>
      </Card.Body>
    </div >
  )
  const productItemPopular = products.filter(product => product.tag === "Popular").map(productFilter =>
    <div className="card-product-list" key={productFilter._id}>
      <Link to={'/products/' + productFilter._id}><Image src={productFilter.image} alt={productFilter.name} fluid rounded /></Link>
      <hr style={{ margin: "5px 0 0 0" }} />
      <Card.Body>
        <Card.Title tag="h5"><Link to={'/products/' + productFilter._id}>{productFilter.name}</Link></Card.Title>
        {/* <Card.Text className="product-star" tag="h6">{product.rating} <StarIcon /> ({product.numReviews}) Reviews</Card.Text> */}
        {
          productFilter.salePrice > 0
            ? <Card.Text className="product-price" style={{ color: "red" }}>${productFilter.salePrice}&nbsp;&nbsp;
                                <strike className="product-price--sale" style={{ color: "#7b7b7b" }}>${productFilter.price}</strike>
            </Card.Text>
            : <Card.Text className="product-price" style={{ color: "red" }}>
              ${productFilter.price}
            </Card.Text>
        }     
        <div className="product-button">
          <div className="btn-addcart">
            <Button className="btn-addcart" onClick={() => addToCartHandler(productFilter._id, qty)} color="primary" variant="contained" disabled={productFilter.countInStock === 0}><AddShoppingCartOutlinedIcon /></Button>
          </div>
          <div className="btn-favorite">
            <Button className="product-favorite" onClick={() => addToCartHandler(productFilter._id, qty)} color="primary" variant="contained" disabled={productFilter.countInStock === 0}><FavoriteOutlinedIcon /></Button>
          </div>
        </div>
      </Card.Body>
    </div >
  )
  return (
    <>
      {loading ? (<Loading />) : error ? (
        <div>{error}</div>) : (
          <div className="top-course">
            <Container>
              <div className="maintext">
                <TextHome />
                <div style={{ height: "10px" }}></div>
                <h4>The world's largest selection of courses</h4>
                <p>Choose from 130,000 books with new additions published every month !!!</p>
              </div>
              <div className="main-course">
                <div className="sale-course">
                  <div className="title-course">
                    <h5 className="glow">Hot Course</h5>
                  </div>
                  <div className="slider-course">
                    {
                      productItemHot.length >= 5 ?
                        <SliderCourse items={productItemHot} /> :
                        <p style={{ textAlign: "center", fontWeight: "bold" }}>Updating.......</p>
                    }
                  </div>
                </div>
                <hr />
                <div className="new-course">
                  <div className="title-course">
                    <h5 className="glow">Sale Course</h5>
                  </div>
                  <div className="slider-course">
                    {
                      productItemSale.length >= 5 ?
                        <SliderCourse items={productItemSale} /> :
                        <p style={{ textAlign: "center", fontWeight: "bold" }}>Updating.......</p>
                    }
                  </div>
                </div>
                <hr />
                <div className="popular-course">
                  <div className="title-course">
                    <h5 className="glow">Popular Course</h5>
                  </div>
                  <div className="slider-course">
                    {
                      productItemPopular.length >= 5 ?
                        <SliderCourse items={productItemPopular} /> :
                        <p style={{ textAlign: "center", fontWeight: "bold" }}>Updating.......</p>
                    }
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
    </>
  );
}