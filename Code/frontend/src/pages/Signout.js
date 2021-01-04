import React, { useEffect } from "react";
// import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutUser } from '../actions/user.action';

export default function Signout(props){
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signoutUser());
  }, [dispatch]);

  return <div></div>;
};