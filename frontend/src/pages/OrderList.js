import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { Button } from "@material-ui/core/";
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
// 
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/order.action';
// 
import Loading from '../components/Loading/Loading';
import DefaultLoading from '../components/Loading/DefaultLoading';
import ErrorMessage from "../components/Message/ErrorMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import PaginationRounded from '../components/Pagination/Pagination';
// 
import '../assets/css/Table.css';
import { ORDER_DELETE_RESET } from '../constants/order.constant';

export default function OrdersList(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

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
    dispatch(listOrders());
    return () => {
      //
    };
  }, [dispatch, successDelete]);

  const deleteOrderHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  }
  return (
    <Container>
      <h1>Orders List</h1><hr />
      <PaginationRounded 
                perPage={perPage} 
                totalPosts={orders.length} 
                currentPage={currentPage}
                handleChangePage={handleChangePage}/>
      { loadingDelete && <DefaultLoading />}
      { errorDelete && <ErrorMessage message={errorDelete} reset={ORDER_DELETE_RESET} />}
      { successDelete && <SuccessMessage message={"Delete Order Success !"} reset={ORDER_DELETE_RESET} />}
      {
        loading ? <Loading /> :
          error ? <ErrorMessage message={error}/> :
            <Row>
              <Col>
                <Table striped bordered responsive className="table-productlist">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>CREATE AT</th>
                      <th>TOTAL PRICE</th>
                      <th>CUSTOMER</th>
                      <th>PAIDED</th>
                      <th>DELIVERED</th>
                      <th>RECEIVED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map(order => (<tr key={order._id}>
                      <td className="table-productinfo">{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice.toFixed(2)}</td>
                      <td>{order.user.name}</td>
                      <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                      <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                      <td>{order.isReceived ? order.receivedAt.substring(0, 10) : 'No'}</td>                   
                      <td className="table-action-order-manage">
                        <Button variant="contained" color="primary"><Link to={"/orders/" + order._id} className="button secondary" >
                          <DescriptionIcon style={{color:"white"}}/></Link></Button>
                        {' '}
                        <Button variant="contained" color="secondary" onClick={() => deleteOrderHandler(order)} ><DeleteIcon />
                        </Button>
                      </td>
                    </tr>))}
                  </tbody>
                </Table>
              </Col>
            </Row>
      }
    </Container>


  )
}