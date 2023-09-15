import {ProductItemShowcase} from "../product-item-showcase/ProductItemShowcase";
import styled from "styled-components";
import './product-list.css'
export function ProductList( {products} ) {
    return (
        <ListContainer className="product-list">
            {/*<Filter />*/}
            {products?.map((product, index) => {
                return (

                    <ProductItemShowcase product={product} key={index}/>
                )

            })}

        </ListContainer>

    )
}

const ListContainer = styled.div``
