
import {ProductList} from "../products/products-list/ProductList";
import { FilterTriggerMenu} from "../filter/FilterTriggerMenu";
import styled from "styled-components";
import {useState} from "react";

export function ShopAllPage2({products}) {


    const [selectedFilters, setSelectedFilters] = useState([])
    const [resultProducts, setResultProducts] = useState(null)
    function handleFilterBy(e) {
        const filter = e.target.id
        if (!selectedFilters.includes(filter) ) {
            setSelectedFilters(prev => [...prev, e.target.id])

            // =================== update product list ===========================
            const results = [...products].filter(p => {
                return p.collection.collection_name === filter
            })
            setResultProducts(results)

        } else {
            const updatedFilters = selectedFilters.filter(f => {
                return f !== filter
            })
            setSelectedFilters(updatedFilters)
            setResultProducts(products)
        }
    }
    console.log(selectedFilters)

    return (
        <ProductPageContainer>
            <FilterTriggerMenu
                products={products}
                handleFilterBy={handleFilterBy}
            />

            <ProductList products={resultProducts ? resultProducts : products}/>
        </ProductPageContainer>

    )
}

const ProductPageContainer = styled.div`
  margin: 10rem auto 0;
  box-sizing: border-box;
`