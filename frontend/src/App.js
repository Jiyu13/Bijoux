import { useState, useEffect } from "react"
import axios from "axios";

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
          <h1>Hello World!</h1>

        </div>
      );
}

export default App;
