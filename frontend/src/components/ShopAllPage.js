import {ProductList} from "../products/products-list/ProductList";
import styled from "styled-components";
import {FilterList} from "../filter/filter-redux/FilterList";

export function ShopAllPage({products} ) {
    return (
        <ProductPageContainer>
            <FilterList />
            <ProductList products={products}/>
        </ProductPageContainer>

    )
}

const ProductPageContainer = styled.div`
  margin: 1rem auto;
`