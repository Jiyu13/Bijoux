import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";


import axios from "axios";
import {useMediaQuery} from "react-responsive";
import {DeviceSize} from "./global/responsive";
import {UserContext} from "./global/user-context/UserContext";


import {API_URL, postFromAPI} from "./helper-functions/fetchFromAPI"

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
import {CreateAccount} from "./login-logout/js/CreateAccount";




function App() {
    const [currentUser, setCurrentUser] = useState()
    const [products, setProducts] = useState(null)
    const [carousels, setCarousels] = useState(null)
    const [collections, setCollections] = useState(null)

    const isLargeScreen = useMediaQuery({maxWidth: DeviceSize.desktop})
    const isSmallLaptop = useMediaQuery({maxWidth: DeviceSize.small_laptop})
    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })


    useEffect(() => {
        fetchFromAPI("/products/", setProducts)
        // axios.get(API_URL + "/products/")
        // .then(res => setProduct(res.data))
        // .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetchFromAPI("/collections/", setCollections)
    }, []);


    useEffect(() => {
        fetchFromAPI("/carousels/", setCarousels)
    }, []);


    const userContextValue = {
        setCurrentUser, currentUser,
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
