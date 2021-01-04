import React, { useState, useEffect } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    TextField,
    Button,
    CircularProgress,
    makeStyles,
} from "@material-ui/core/";
import bcrypt from 'bcryptjs';
// 
import ErrorMessage from "../../components/Message/ErrorMessage";
import Loading from '../../components/Loading/Loading';
import SuccessMessage from "../../components/Message/SuccessMessage";
// 
import { updateUserProfile, detailsUser } from '../../actions/user.action';
import { USER_UPDATE_PROFILE_RESET, USER_UPDATE_RESET } from '../../constants/user.constant';

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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [rePassword, setRePassword] = useState('');
    // 
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;

    const updateUserProfileHandler = (e) => {
        e.preventDefault();
        if (!bcrypt.compareSync(oldPassword, user.password)) {
            alert('Old Password Not Correct, Please Input Again !')
        }
        else if (password !== rePassword) {
            alert("Password not match!")
        } else {
            dispatch(updateUserProfile({
                userId: user._id,
                name,
                email,
                password,
                phone
            }));
        }
    }
    // 
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPhone(userInfo.phone);
        }
    }, [dispatch, user, userInfo._id, userInfo.name, userInfo.email, userInfo.phone]);

    return (
        <>
            {errorUpdate && (<ErrorMessage message={errorUpdate} reset={USER_UPDATE_RESET}/>)}
            {successUpdate && (<SuccessMessage message={"User Update Profile Success !"}/>)}
            <ListGroup>
                <ListGroup.Item><h2 style={{ textAlign: "center" }}>Update Profile</h2></ListGroup.Item>
                {
                    loading ? (<Loading />) :
                        error ? (<ErrorMessage message={error} />) : (
                            <Form onSubmit={updateUserProfileHandler}>
                                <ListGroup.Item>
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
                                </ListGroup.Item>
                                <ListGroup.Item>
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
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <TextField
                                        variant="outlined"
                                        type="password"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="oldPassword"
                                        label="Old Password"
                                        name="oldPpassword"
                                        autoComplete="password"
                                        autoFocus
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
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
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <TextField
                                        variant="outlined"
                                        type="password"
                                        margin="normal"
                                        fullWidth
                                        id="rePassword"
                                        label="Confirm Password"
                                        name="rePassword"
                                        autoComplete="password"
                                        autoFocus
                                        value={rePassword}
                                        onChange={(e) => setRePassword(e.target.value)}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
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
                                </ListGroup.Item>
                                <ListGroup.Item>
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
                                                <>Update Profile</>
                                            )}
                                    </Button>
                                </ListGroup.Item>
                            </Form>
                        )}
            </ListGroup>
        </>
    );
};