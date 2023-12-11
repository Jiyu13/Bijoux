
import {ProductList} from "../../products/products-list/ProductList";
import { FilterTriggerMenu} from "../../filter/FilterTriggerMenu";
import {useContext} from "react";

import styled from "styled-components";
import "../css/shop-all-page.css"
import {UserContext} from "../../global/user-context/UserContext";


export function ShopAllPage2() {

    const {products, setProducts} = useContext(UserContext)

     function handleSort(e) {
        const sort = e.target.id

        if (sort === "Lowest Price") {
            const sortedLowToHigh = [...products]?.sort((a, b) => {
                return a.price - b.price
            })
            setProducts(sortedLowToHigh)
        } else {
            const sortedHighToLow = [...products]?.sort((a, b) => {
                return b.price - a.price
            })
            setProducts(sortedHighToLow)
        }
    }
    return (
        <ProductPageContainer className='shop-all-page'>
            <FilterTriggerMenu
                products={products}
                handleSort={handleSort}
            />

            <ProductList products={products}/>
        </ProductPageContainer>

    )
}

const ProductPageContainer = styled.div`
  margin: 10rem auto 0;
  box-sizing: border-box;
`