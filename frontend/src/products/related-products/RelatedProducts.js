import styled from "styled-components";
import './relative-products.css'

export function RelatedProducts({relatedProducts}) {



    // const {products} = useContext(UserContext)
    // const relatedProducts = products?.filter(product =>
    //     product?.collection.id === productDetail?.collection.id
    // )

    return (
        <RelatedProductsContainer>
            <RelatedProductsHeader>
                Related Products
            </RelatedProductsHeader>

            <RelatedProductsList className='related-products-container'>
                {relatedProducts?.map((rp, index) => {
                    return (
                         <RelatedProduct key={index} className='related-product-item-li'>
                            <Link href={`/products/${rp.id}/${rp.title.split(" ").join("-").toLowerCase()}`}>
                                <ImageWrapper>
                                    <Img src={rp?.image}/>
                                </ImageWrapper>
                                <ProductTitle>{rp.title}</ProductTitle>
                            </Link>
                            <ProductPrice>${rp.price}</ProductPrice>
                        </RelatedProduct>
                )})}
                {/*<RelatedProduct>*/}
                {/*    <Link to="">*/}
                {/*        <ImageWrapper>*/}
                {/*            <Img src={products[0]?.image}/>*/}
                {/*        </ImageWrapper>*/}
                {/*        <ProductTitle>{products[0].title}</ProductTitle>*/}
                {/*    </Link>*/}
                {/*    <ProductPrice>${products[0].price}</ProductPrice>*/}
                {/*</RelatedProduct>*/}

                {/*<RelatedProduct>*/}
                {/*    <Link to="">*/}
                {/*        <ImageWrapper>*/}
                {/*            <Img src={products[1].image}/>*/}
                {/*        </ImageWrapper>*/}
                {/*        <ProductTitle>{products[1].title}</ProductTitle>*/}
                {/*    </Link>*/}
                {/*    <ProductPrice>${products[1].price}</ProductPrice>*/}
                {/*</RelatedProduct>*/}

                {/*<RelatedProduct>*/}
                {/*    <Link to="">*/}
                {/*        <ImageWrapper>*/}
                {/*            <Img src={products[2].image}/>*/}
                {/*        </ImageWrapper>*/}
                {/*        <ProductTitle>{products[2].title}</ProductTitle>*/}
                {/*    </Link>*/}
                {/*    <ProductPrice>${products[2].price}</ProductPrice>*/}
                {/*</RelatedProduct>*/}

                {/*<RelatedProduct>*/}
                {/*    <Link to="">*/}
                {/*        <ImageWrapper>*/}
                {/*            <Img src={products[3].image}/>*/}
                {/*        </ImageWrapper>*/}
                {/*        <ProductTitle>{products[3].title}</ProductTitle>*/}
                {/*    </Link>*/}
                {/*    <ProductPrice>${products[3].price}</ProductPrice>*/}

                {/*</RelatedProduct>*/}

            </RelatedProductsList>

        </RelatedProductsContainer>
    )
}

const RelatedProductsContainer = styled.section`
  margin: 32px 0;
  border-top: 1px solid rgb(234, 234, 234);
`
const RelatedProductsHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 32px 0;
  letter-spacing: 0.1rem;
  //color: #c1c1c1;
`
const RelatedProductsList = styled.ul`
  list-style: none;
  padding-left: 0;
  gap: 12px;
`
const RelatedProduct = styled.li``

const Link = styled.a`
  text-decoration: none;
  color: #282c34;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const ImageWrapper = styled.div`
`
const Img = styled.img`
  width: 100%;
`
export const ProductTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 12px;
  color: #656565;
  
  &:hover {
    color: #000;
  }
`
export const ProductPrice = styled.div``
