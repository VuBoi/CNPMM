import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
    Table,
    Container,
} from "react-bootstrap";
import { Button } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
// 
import { deleteUser, listUser } from '../actions/user.action';
// 
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// 
import '../assets/css/Table.css';
import ErrorMessage from "../components/Message/ErrorMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import Loading from '../components/Loading/Loading';
import DefaultLoading from '../components/Loading/DefaultLoading';
import PaginationRounded from '../components/Pagination/Pagination';
// 
import { USER_DELETE_RESET } from '../constants/user.constant'

export default function UserList(props) {
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    // 
    const userDelete = useSelector((state) => state.userDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete, } = userDelete;
    //
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    // GetDataCurrentPage
    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);
    //ChangePage
    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUser());
    }, [dispatch, successDelete]);
    // 
    const deleteUserHandler = (user) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteUser(user._id));
        }
    };

    return (
        <Container>
            <h1>List User</h1><hr />
            <PaginationRounded 
                perPage={perPage} 
                totalPosts={users.length} 
                currentPage={currentPage}
                handleChangePage={handleChangePage}/>
            {/*  */}
            { loadingDelete && <DefaultLoading/>}
            { errorDelete && <ErrorMessage message={errorDelete} reset={USER_DELETE_RESET} />}
            { successDelete && <SuccessMessage message={"Delete User Success !"} reset={USER_DELETE_RESET} />}
            {
                loading ? (<Loading />) :
                    error ? (<ErrorMessage message={error} />) : (
                        <Table striped bordered responsive className="table-productlist">
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>PHONE</th>
                                    <th>ADMIN</th>
                                    <th>STAFF</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPosts.map((user) => (
                                    <tr key={user._id}>
                                        <td className="table-productinfo">{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.isAdmin.toString().toUpperCase()}</td>
                                        <td>{user.isStaff.toString().toUpperCase()}</td>
                                        <td className="table-action-user">
                                            <Button variant="contained" color="primary"><LinkContainer to={"/users/" + user._id + "/edit"}><EditIcon /></LinkContainer></Button>
                                            <Button variant="contained" color="secondary" onClick={(e) => deleteUserHandler(user)} ><DeleteIcon />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }
        </Container>
    )
}