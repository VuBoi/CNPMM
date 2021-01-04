import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    TextField,
    Button,
    CircularProgress,
    makeStyles,
    Checkbox,
    FormControlLabel
} from "@material-ui/core/";
// 
import FormContainer from "../components/Container/FormContainer";
import { USER_UPDATE_RESET } from '../constants/user.constant';
import ErrorMessage from "../components/Message/ErrorMessage";
import SuccessMessage from "../components/Message/SuccessMessage";
import Loading from '../components/Loading/Loading';
// 
import { detailsUser, updateUser } from '../actions/user.action';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    prgressColor: {
        color: "#fff",
    },
}));

export default function UserEdit(props) {
    const classes = useStyles();
    // 
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;
    // 
    const userId = props.match.params.id;
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    // 
    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            props.history.push('/userslist');
        }
        if (!user || user._id !== userId || successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(detailsUser(userId));
        }
        else {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setIsAdmin(user.isAdmin);
            setIsStaff(user.isStaff);
        }
    }, [user, dispatch, userId, successUpdate, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUser({
                _id: userId,
                name,
                email,
                password,
                phone,
                isAdmin,
                isStaff
            })
        );
    };

    return (
        <Container>
            {errorUpdate && <ErrorMessage message={errorUpdate} reset={USER_UPDATE_RESET}/>}
            {successUpdate && <SuccessMessage message="Update User Success !" reset={USER_UPDATE_RESET}/>}
            <Link to="/userslist">
                <Button variant="contained" color="primary">Go Back</Button>
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {
                    loading ? (<Loading />) :
                        error ? (<ErrorMessage message={error} />) : (
                            <Form onSubmit={submitHandler}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                {
                                    user.isAdmin && user.email === "vuboiabc@gmail.com" ?
                                        <TextField
                                            disabled
                                            variant="outlined"
                                            type="email"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        /> :
                                        <TextField
                                            variant="outlined"
                                            type="email"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                }

                                <TextField
                                    variant="outlined"
                                    type="password"
                                    margin="normal"
                                    fullWidth
                                    id="password"
                                    label="Change Password"
                                    name="password"
                                    autoComplete="password"
                                    autoFocus
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone"
                                    name="phone"
                                    autoComplete="phone"
                                    autoFocus
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {user.isAdmin && user.email === "vuboiabc@gmail.com" ?
                                    <FormControlLabel
                                        disabled
                                        control={<Checkbox
                                            label="Is Admin"
                                            color="primary"
                                            checked={isAdmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />}
                                        label="Is Admin"
                                    /> :
                                    <FormControlLabel
                                        control={<Checkbox
                                            label="Is Admin"
                                            color="primary"
                                            checked={isAdmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />}
                                        label="Is Admin"
                                    />
                                }

                                    <FormControlLabel
                                        control={<Checkbox
                                            label="Is Staff"
                                            color="primary"
                                            checked={isStaff}
                                            onChange={(e) => setIsStaff(e.target.checked)}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />}
                                        label="Is Staff"
                                    />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={loadingUpdate}
                                >
                                    {loadingUpdate ? (
                                        <CircularProgress
                                            color="inherit"
                                            className={classes.prgressColor}
                                        />
                                    ) : (
                                            <>Update</>
                                        )}
                                </Button>
                            </Form>
                        )}
            </FormContainer>
        </Container>
    );
};