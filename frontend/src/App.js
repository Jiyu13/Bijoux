import { useState, useEffect } from "react"
import axios from "axios";
import {TopHeader} from "./top-header/TopHeader";
import {NavBar} from "./navbar/NavBar";
// import {MainPoster} from "./main-poster/js/MainPoster";
import {ProductList} from "./products/product-list/ProductList";
import {useMediaQuery} from "react-responsive";
import {DeviceSize} from "./responsive";
import {UserContext} from "./user-context/UserContext";
import {MobileNavBar} from "./navbar/MobileNavBar";
import {Carousels} from "./carousels/js/Carousels";
import {fetchFromAPI} from "./helpers/Helpers";

import {API_URL} from "./helpers/Helpers"
import {Categories} from "./categories/js/Categories";
function App() {
    const [products, setProduct] = useState(null)
    const [carousels, setCarousels] = useState(null)
    const [categories, setCategories] = useState(null)

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

    console.log(categories)

    useEffect(() => {
        fetchFromAPI("/carousels/", setCarousels)
    }, []);

    const userContextValue = {isMobile, isTablet, carousels}

    return (
        <UserContext.Provider value={userContextValue}>

            <div className="App">
                <TopHeader />
                <NavBar />
                <Carousels />
                {/*<MainPoster />*/}
                <Categories categories={categories}/>
                <ProductList products={products}/>

                <MobileNavBar />
            </div>
        </UserContext.Provider>

      );
}

export default App;
