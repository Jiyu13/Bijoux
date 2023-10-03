import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";


import axios from "axios";
import {useMediaQuery} from "react-responsive";
import {DeviceSize} from "./global/responsive";
import {UserContext} from "./global/user-context/UserContext";


import {API_URL} from "./helper-functions/fetchFromAPI"

import {NavBar} from "./global/navbar/NavBar";
import {MobileNavBar} from "./global/navbar/MobileNavBar";
import {fetchFromAPI} from "./helper-functions/fetchFromAPI";
import {Footer} from "./global/footer/js/Footer"
import {Home} from "./components/Home";
import {ShopAllPage} from "./components/ShopAllPage";

import {Provider} from "react-redux";
import store from "./filter/filter-redux/store/store";
import {ProductDetail} from "./products/product-detail-page/ProductDetail";
import {FeaturedCollection} from "./featured-collection/js/FeaturedCollection";

function App() {
    const [products, setProduct] = useState(null)
    const [carousels, setCarousels] = useState(null)
    const [categories, setCategories] = useState(null)

    const isLargeScreen = useMediaQuery({maxWidth: DeviceSize.desktop})
    const isSmallLaptop = useMediaQuery({maxWidth: DeviceSize.small_laptop})
    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })

    useEffect(() => {
        axios.get(API_URL + "/products/")
        .then(res => setProduct(res.data))
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetchFromAPI("/categories/", setCategories)
    }, []);

    // console.log(categories)

    useEffect(() => {
        fetchFromAPI("/carousels/", setCarousels)
    }, []);


    const userContextValue = {isMobile, isTablet, isSmallLaptop, isLargeScreen, carousels}

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
                                <ProductDetail />
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
                            path='/'
                            element={
                                <Home products={products} categories={categories}/>
                            }
                        >
                        </Route>


                    </Routes>

                </Main>

                <Footer />

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
