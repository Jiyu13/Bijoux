import "./css/product_detail.css"
import {ProductMaterial} from "./ProductMaterial";
import {ProductQuantity} from "./ProductQuantity";
import {ProductAddToCart} from "./ProductAddToCart";
import {ProductDescription} from "./ProductDescription";
import styled from "styled-components";
export function ProductDetails({productDetail}) {



    return (
        <div style={{flex: "1", width: "50%", paddingLeft: "30px"}}>
            <div style={{}}>
                <ProductTitle>{productDetail?.title}</ProductTitle>
            </div>

            <div>${productDetail?.price}</div>
            <div>
                <form>

                    {/*==================== material section =======================*/}
                    {/*=================== get from productDetail.material =========*/}
                    <ProductMaterial />

                    {/*==================== quantity buttons ===================*/}
                    <ProductQuantity />

                    {/*=================== submit button =======================*/}
                    <ProductAddToCart />

                    {/*=================== product description =======================*/}
                    {/*=================== get from productDetail.description ========*/}
                    <ProductDescription />
                </form>

            </div>

        </div>
    )
}

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 15px;
`