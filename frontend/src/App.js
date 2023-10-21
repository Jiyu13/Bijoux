import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";


import {useMediaQuery} from "react-responsive";
import {DeviceSize} from "./global/responsive";
import {UserContext} from "./global/user-context/UserContext";


import {client} from "./helper-functions/fetchFromAPI"

import {Footer} from './global/footer/js/Footer'
import {NavBar} from "./global/navbar/js/NavBar";
import {MobileNavBar} from "./global/navbar/js/MobileNavBar";
import {fetchFromAPI} from "./helper-functions/fetchFromAPI";
import {Home} from "./components/Home";
import {ShopAllPage} from "./components/ShopAllPage";

import {Provider} from "react-redux";
import store from "./filter/filter-redux/store/store";
import {ProductPage} from "./products/product-detail-page/ProductPage";
import {Login} from "./login-logout/js/Login";
import {CreateAccount} from "./account/CreateAccount";
import {AccountPage} from "./account/AccountPage";
import {AddressesPage} from "./addresses/AddressesPage";




function App() {
    const [currentUser, setCurrentUser] = useState(null)

    const storeIsLogin = localStorage.getItem("isLogin") === "true"
    const [isLogin, setIsLogin] = useState(storeIsLogin)

    const [products, setProducts] = useState(null)
    const [carousels, setCarousels] = useState(null)
    const [collections, setCollections] = useState(null)

    const isLargeScreen = useMediaQuery({maxWidth: DeviceSize.desktop})
    const isSmallLaptop = useMediaQuery({maxWidth: DeviceSize.small_laptop})
    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })


    useEffect(() => {
        client.get('/user/', {withCredentials: true})
            .then(res => {
                const user = res.data.user
                if (user) {
                    setCurrentUser(user)
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        localStorage.setItem("isLogin", isLogin)
    }, [isLogin]);

    useEffect(() => {
        fetchFromAPI("/products/", setProducts)
    }, [])

    useEffect(() => {
        fetchFromAPI("/collections/", setCollections)
    }, []);


    useEffect(() => {
        fetchFromAPI("/carousels/", setCarousels)
    }, []);


    const userContextValue = {
        setCurrentUser, currentUser, isLogin, setIsLogin,
        isMobile, isTablet, isSmallLaptop, isLargeScreen,
        carousels, products, collections}

    return (
        <UserContext.Provider value={userContextValue}>
            <Provider store={store}>

            <div className="App">
                <NavBar />
                <Main className="main-container">
                    <Routes>
                        <Route
                            exact
                            path='/products/:id'
                            element={
                                <ProductPage />
                            }
                        >
                        </Route>
                        <Route
                            exact
                            path='/shop'
                            element={
                                <ShopAllPage products={products}/>
                            }
                        >
                        </Route>

                        <Route
                            exact
                            path='/account/addresses'
                            element={
                                <AddressesPage />
                            }
                        >
                        </Route>

                        <Route
                            exact
                            path='/account'
                            element={
                                <AccountPage />
                            }
                        >
                        </Route>

                        <Route
                            exact
                            path='/login'
                            element={
                                <Login />
                            }
                        >
                        </Route>
                        <Route
                            exact
                            path='/register'
                            element={
                                <CreateAccount />
                            }
                        >
                        </Route>

                        <Route
                            exact
                            path='/'
                            element={
                                <Home products={products} collections={collections}/>
                            }
                        >
                        </Route>


                    </Routes>

                </Main>

                <Footer/>

                {isMobile || isTablet  ? <MobileNavBar /> : ""}
            </div>
            </Provider>
        </UserContext.Provider>

      );
}

export default App;


const Main = styled.div`
  margin: 0 auto;
`
