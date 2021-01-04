import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
//Material
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
//Component
import Drawer from './Drawer';
import MenuUserDesktop from './MenuUserDesktop';
import SearchBox from '../Home/SearchBox';
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    toggle: {
        display: "block",
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

export default function Header(props) {
    const classes = useStyles();
    // 
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    // 
    const [openside, setOpen] = useState(false)
    const openMenu = () => {
        document.querySelector('.sidenav').classList.add('active');
        setOpen(!openside)
    };
    return (
        <div className={classes.grow}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link to="/" className="sitename">KBooks</Link>
                    </Typography>
                    <div className={classes.toggle}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={openMenu}
                        >
                            <MenuIcon style={{ color: "white" }} />
                        </IconButton>

                    </div>
                    <div className={classes.search}>
                        <Route render={({ history }) => (<SearchBox history={history} />)}></Route>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Link to="/productsList" className={classes.productsList}>
                            <IconButton aria-label="productsList" color="inherit">
                                <FormatListNumberedIcon style={{ color: "white" }}/>
                            </IconButton>
                        </Link>             
                        <Link to="/cart">
                            <IconButton aria-label="cart" color="inherit">
                                <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="secondary">
                                    <ShoppingCartIcon style={{ color: "white" }} />
                                </Badge>
                            </IconButton>
                        </Link>
                        <MenuUserDesktop/>
                    </div>
                    <div className={classes.sectionMobile}>
                        <Link to="/cart">
                            <IconButton aria-label="cart" color="inherit">
                                <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="secondary">
                                    <ShoppingCartIcon style={{ color: "white" }} />
                                </Badge>
                            </IconButton>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer openside={openside} />
        </div>
    );
}
