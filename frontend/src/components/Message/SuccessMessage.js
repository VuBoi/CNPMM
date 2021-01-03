import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from "react-redux";
// 
import '../../assets/css/Message.css'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ErrorMessage(props) {

  const { message, reset } = props;
  const [open, setOpen] = useState(true);
  // 
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reset) {
      dispatch({ type: reset });
    }
    setOpen(false);
  };
  
  useEffect(() =>{
    return () => {
      //
    };
  },[])

  return (
    <div className="message">
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
