import { BrowserRouter, Switch, Route } from 'react-router-dom';
// 
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
// 
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import ProductList from '../pages/ProductList';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Shipping from '../pages/Shipping';
import Payment from '../pages/Payment';
import PlaceOrder from '../pages/PlaceOrder';
import Profile from '../pages/Profile';
import Signout from '../pages/Signout';
import ProductEdit from '../pages/ProductEdit';
import ProductListManage from '../pages/ProductListManage';
import ProductCreate from '../pages/ProductCreate';
import Order from '../pages/Order';
import OrderList from '../pages/OrderList';
import OrderHistoryList from '../pages/OrderHistoryList';
import UserList from '../pages/UserList';
import UserEdit from '../pages/UserEdit';
import Search from '../pages/Search';
import CategoryListManage from '../pages/CategoryListManage';
import CategoryEdit from '../pages/CategoryEdit';
import CategoryCreate from '../pages/CategoryCreate';
import Favorite from '../pages/Favorite';
// 
import PrivateRoute from '../routes/PrivateRoute';
import AdminRoute from '../routes/AdminRoute';
// 
function App() {
    return (
        <BrowserRouter >
            <div className="App" >
                <div className="header">
                    <Header />
                </div>
                <div className="section">
                    <Switch>
                        <AdminRoute path="/categoriesListManage" component={CategoryListManage} />
                        <AdminRoute path="/categoriesCreate" component={CategoryCreate} />
                        <AdminRoute path="/categories/:id/edit" component={CategoryEdit} />
                        <AdminRoute path="/users/:id/edit" component={UserEdit} />
                        <AdminRoute path="/usersList" component={UserList} />
                        <AdminRoute path="/productsListManage" component={ProductListManage} />
                        <AdminRoute path="/productsCreate" component={ProductCreate} />
                        <AdminRoute path="/products/:id/edit" component={ProductEdit} />
                        <AdminRoute path="/ordersList" component={OrderList} />
                        {/*  */}
                        <PrivateRoute exact={true} path="/profile" component={Profile} />
                        {/*  */}
                        <Route path="/myfavorite" component={Favorite} />
                        <Route path="/search/" component={Search} />
                        <Route path="/ordersHistory" component={OrderHistoryList} />
                        <Route path="/orders/:id" component={Order} /> 
                        <Route path="/products/:id/edit" component={ProductEdit} />
                        <Route path="/placeorder" exact={true} component={PlaceOrder} />
                        <Route path="/payment" exact={true} component={Payment} />
                        <Route path="/shipping" exact={true} component={Shipping} />
                        <Route path="/cart" exact={true} component={Cart} />
                        <Route path="/products/:id" component={ProductDetail} />
                        <Route path="/productsList" exact={true} component={ProductList} />
                        <Route path="/signout" exact={true} component={Signout} />
                        <Route path="/signin" exact={true} component={Signin} />
                        <Route path="/signup" exact={true} component={Signup} />
                        <Route path="/" exact={true} component={Home} />
                        <Route path='*' component={NotFound} />    
                    </Switch>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;