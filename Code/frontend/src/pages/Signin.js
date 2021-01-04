import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// 
import '../assets/css/Signup.css';
import { signinUser } from '../actions/user.action';
// 
import { Button } from "@material-ui/core/";
import DefaultLoading from '../components/Loading/DefaultLoading';
import ErrorMessage from "../components/Message/ErrorMessage";

export default function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : "/";
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => {
            //
        }
    }, [props.history, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signinUser(email, password));
    }

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Sign In</h2>
                    </li>
                    <li>
                        {loading && <DefaultLoading/>}
                        {error && <ErrorMessage message={error} />}
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                    </li>
                    <li>
                        <Button type="submit" variant="contained" color="primary">Signin</Button>
                    </li>
                    <li>
                        New to Website?
                    </li>
                    <li>
                        <Link to="/signup" className="button full-width">Create your account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}
