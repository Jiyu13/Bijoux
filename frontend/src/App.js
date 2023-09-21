import { useState, useEffect } from "react"
import axios from "axios";
import {NavBar} from "./navbar/NavBar";
import {useMediaQuery} from "react-responsive";
import {DeviceSize} from "./responsive";
import {UserContext} from "./user-context/UserContext";
import {MobileNavBar} from "./navbar/MobileNavBar";
import {Carousels} from "./carousels/js/Carousels";
import {fetchFromAPI} from "./helper-functions/Helpers";

import {API_URL} from "./helper-functions/Helpers"
import {Categories} from "./categories/js/Categories";
import styled from "styled-components";
import {BestSellers} from "./best-sellers/js/BestSellers";
import {Footer} from "./footer/js/Footer"
import {NewArrivals} from "./new-arrivals/js/NewArrivals";
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

            <div className="App">
                <NavBar />

                <Main className="main-container">
                    <Carousels />
                    <Categories  categories={categories}/>
                    <BestSellers products={products}/>
                    <NewArrivals products={products}/>
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
