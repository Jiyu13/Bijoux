import { useState, useEffect } from "react"
import axios from "axios";
import {TopHeader} from "./top-header/TopHeader";
import {NavBar} from "./navbar/NavBar";

function App() {
    const [products, setProduct] = useState(null)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/products")
        .then(res => setProduct(res.data))
        .catch(error => console.log(error))
    }, [])

    console.log(products)
    return (
        <div className="App">
            {/*<div className=""*/}
            <TopHeader />
            <NavBar />

        </div>
      );
}

export default App;
