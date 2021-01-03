import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// 
import '../assets/css/Signup.css';
import { signupUser } from '../actions/user.action';
import { Button } from '@material-ui/core';
import DefaultLoading from '../components/Loading/DefaultLoading';
import ErrorMessage from "../components/Message/ErrorMessage";

export default function Signup(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userSignup = useSelector(state => state.userSignup);
    const { loading, userInfo, error } = userSignup;

    const redirect = props.location.search ? props.location.search.split('=')[1]: '/';
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            alert("Password not match!")
        } else {
            dispatch(signupUser(name, email, password, phone));
        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])
    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Sign Up</h2>
                    </li>
                    <li>
                        {loading && <DefaultLoading/>}
                        {error && <ErrorMessage message={error} />}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
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
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="rePassword">
                            RePassword
                        </label>
                        <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="phone">
                            PhoneNumber
                        </label>
                        <input type="phone" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)}></input>
                    </li>
                    <li>
                        <Button type="submit" variant="contained" color="primary">Signup</Button>
                    </li>
                    <li>
                        Already have an account ? <Link to="/signin">Signin</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}
