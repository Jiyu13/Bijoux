import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";


import axios from "axios";
import {useMediaQuery} from "react-responsive";
import {DeviceSize} from "./responsive";
import {UserContext} from "./user-context/UserContext";


import {API_URL} from "./helper-functions/Helpers"

import {NavBar} from "./navbar/NavBar";
import {MobileNavBar} from "./navbar/MobileNavBar";
import {fetchFromAPI} from "./helper-functions/Helpers";
import {Footer} from "./footer/js/Footer"
import {Home} from "./components/Home";
import {ProductPage} from "./components/ProductPage";
import {MobileFilterSidebar} from "./filter/js/MobileFilterSidebar";
import {SidebarOverlay} from "./filter/js/SidebarOverlay";

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


    // ============= toggle filter sideber ==================================
    const [isOpenFilterSidebar, setOpenFilterSidebar] = useState(false)
    function handleOpenFilterSidebar() {
        setOpenFilterSidebar(!isOpenFilterSidebar)
    }

    const userContextValue = {isMobile, isTablet, isSmallLaptop, isLargeScreen, carousels, handleOpenFilterSidebar}

    return (
        <UserContext.Provider value={userContextValue}>

            <div className="App">
                <NavBar />
                {isMobile && isOpenFilterSidebar && (<MobileFilterSidebar/>)}
                {isMobile && isOpenFilterSidebar && (<SidebarOverlay/>)}
                <Main className="main-container">
                    <Routes>
                        {/*<Route>*/}
                        {/*    exact*/}
                        {/*    path='/shop_all'*/}
                        {/*    element={*/}
                        {/*        <>ShopAll</>*/}
                        {/*    }*/}

                        {/*</Route>*/}
                        <Route
                            exact
                            path='/shop'
                            element={
                                <ProductPage products={products}/>
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

                {isMobile || isTablet || isSmallLaptop ? <MobileNavBar /> : ""}
            </div>
        </UserContext.Provider>

      );
}

export default App;


const Main = styled.div`
  margin: 0 auto;
`
