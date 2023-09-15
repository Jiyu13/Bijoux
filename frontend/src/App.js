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

function App() {
    const [products, setProduct] = useState(null)

    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })
    // console.log(isMobile || isTablet)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products/")
        .then(res => setProduct(res.data))
        .catch(error => console.log(error))
    }, [])


    const userContextValue = {isMobile, isTablet}

    return (
        <UserContext.Provider value={userContextValue}>

            <div className="App">
                {/*<div className=""*/}
                <TopHeader />
                <NavBar />
                <MainPoster />
                <ProductList products={products}/>

                <MobileNavBar />
            </div>
        </UserContext.Provider>

      );
}

export default App;
