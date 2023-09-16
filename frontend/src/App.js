import { useState, useEffect } from "react"
import axios from "axios";
import {TopHeader} from "./top-header/TopHeader";
import {NavBar} from "./navbar/NavBar";
import {MainPoster} from "./main-poster/js/MainPoster";
import {ProductList} from "./products/product-list/ProductList";
import {useMediaQuery} from "react-responsive";
import {DeviceSize} from "./responsive";
import {UserContext} from "./user-context/UserContext";
import {MobileNavBar} from "./navbar/MobileNavBar";
import {Carousels} from "./carousels/js/Carousels";

export const API_URL = "http://127.0.0.1:8000"
function App() {
    const [products, setProduct] = useState(null)
    const [carousels, setCarousels] = useState(null)

    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })
    // console.log(isMobile || isTablet)

    useEffect(() => {
        axios.get(API_URL + "/products/")
        .then(res => setProduct(res.data))
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/carousels/")
                return response
            } catch(error) {
                console.log(error)
            }
        }
        fetchData().then(res => setCarousels(res.data))
    }, []);

    const userContextValue = {isMobile, isTablet, carousels}

    return (
        <UserContext.Provider value={userContextValue}>

            <div className="App">
                {/*<div className=""*/}
                <TopHeader />
                <NavBar />
                <Carousels />
                {/*<MainPoster />*/}
                <ProductList products={products}/>

                <MobileNavBar />
            </div>
        </UserContext.Provider>

      );
}

export default App;
