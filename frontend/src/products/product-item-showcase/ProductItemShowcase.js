import styled from "styled-components";
import './product-item.css'


import favorite_border_black_24dp from "./icons/favorite_border_black_24dp.svg"
import favorite_white_24dp from "./icons/favorite_white_24dp.svg"

import {useState} from "react";

export function ProductItemShowcase( {product} ) {
    const [isFav, setIsFav] = useState(false)

    function handleAddFav() {
        setIsFav((!isFav))
    }

    // #ffb142
    const isFavColor = isFav ? "invert(86%) sepia(45%) saturate(3745%) hue-rotate(328deg) brightness(109%) contrast(102%)" : ""

    // console.log(product.image)
    return (
        <ShowcaseContainer className="product-item">
            <ProductImage>
                <Circle></Circle>
                <FavIcon
                    src={isFav ? favorite_white_24dp : favorite_border_black_24dp}
                    alt="add to favourite"
                    style={{filter: isFavColor}}
                    onClick={handleAddFav}
                />
                <Img src={`http://localhost:8000${product.image}`}/>
            </ProductImage>
            {/*<ProductPromotion>*/}
            {/*    <Promotion>New | Best Seller</Promotion>*/}
            {/*</ProductPromotion>*/}
            <ProductContent>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>${product.price}</ProductPrice>
            </ProductContent>

            <AddToCart>
                <AddToCartButton type="button">Add to cart</AddToCartButton>
            </AddToCart>

        </ShowcaseContainer>
    )
}

const ShowcaseContainer = styled.div``
const ProductImage = styled.a`
  position: relative;
`
const Img = styled.img`
  cursor: pointer;
  width: 100%;
  max-height: 250px;
`
const Circle = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  position: absolute;
  right: 0;
  border-radius: 20px;
  margin: 8px;
  
`
const FavIcon = styled.img`
  width: 24px;
  cursor: pointer;
  position: absolute;
  right: 0;
  margin: 8px;
  padding: 8px;
  border-radius: 20px;
  &:active {
    transform: translate3d(0, -2px, 0);
  }
`

const ProductContent = styled.a`
  cursor: pointer;
`

const ProductPromotion = styled.div`
  font-size: 0.875rem;
`
const Promotion = styled.p``


const ProductTitle = styled.h3`
  font-size: 14px;
  margin-top: 6px;
`
const ProductPrice = styled.div`
  font-size: 16px;
`
const AddToCart = styled.div`
    margin: 8px 0;
`
const AddToCartButton = styled.button`
  height: 32px;
  padding: 0 16px;
  border: none;
  transition: all .2s ease-in-out;
  background-color: rgb(149, 175, 192, 0.5);
    &:hover {
        background-color: rgb(149, 175, 192);
    }
`