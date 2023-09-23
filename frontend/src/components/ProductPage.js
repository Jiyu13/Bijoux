import {FilterBar} from "../filter/js/FilterBar";
import {ProductList} from "../products/products-list/ProductList";
import styled from "styled-components";

export function ProductPage( {products} ) {
    // console.log(products)
    return (
        <ProductPageContainer>
            <FilterBar />
            <ProductList products={products}/>
        </ProductPageContainer>

    )
}

const ProductPageContainer = styled.div`
  margin: 1rem auto;
`