import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/order.action';
import { Button } from "@material-ui/core/";
import {
  Table,
  Row,
  Col,
  Container,
} from "react-bootstrap";
// 
import DescriptionIcon from '@material-ui/icons/Description';
//
import ErrorMessage from "../components/Message/ErrorMessage";
import Loading from "../components/Loading/Loading";
import PaginationRounded from '../components/Pagination/Pagination';
// 
import '../assets/css/Table.css';

export default function OrderHistoryScreen(props) {
  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading, error, orders } = myOrderList;

  //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    // GetDataCurrentPage
    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);
    //ChangePage
    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);
  console.log(orders)
  // 

  return (
    <Container>
      <h1>Order History</h1><hr />
      <PaginationRounded 
                perPage={perPage} 
                totalPosts={orders.length} 
                currentPage={currentPage}
                handleChangePage={handleChangePage}/>
      {loading ? (<Loading />) :
        error ? (<ErrorMessage message={error} />) : (
          <Row>
            <Col>
              <Table striped bordered responsive className="table-productlist">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>CREATE AT</th>
                    <th>TOTAL PRICE</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>RECEIVED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((order) => (
                    <tr key={order._id}>
                      <td className="table-productinfo">{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice.toFixed(2)}</td>
                      <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                      <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                      <td>{order.isReceived ? order.receivedAt.substring(0, 10) : 'No'}</td>
                      <td className="table-action-order">
                        <Button variant="contained" color="primary" onClick={() => { props.history.push("/orders/" + order._id) }}><DescriptionIcon style={{ color: "white" }} /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
    </Container>
  );
}
