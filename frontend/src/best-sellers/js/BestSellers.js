import styled from "styled-components";
import '../css/best_seller.css'
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {SliderTemplate} from "../../item-sliders-template/js/SliderTemplate";
import {ShopButtonLink} from "../../components/buttons";

export function BestSellers() {

    const {products, isMobile, isTablet} = useContext(UserContext)

    const bestSellerlist = products?.filter(item => {
        if (item.collection.collection_name === "Best Sellers") {
            return item
        }
    })

    console.log(bestSellerlist)

    return (
        <BestSellerContainer className='best-seller'>
            <BestSellerHeader>Most Popular</BestSellerHeader>

            {!isMobile && !isTablet ?

                <BestSellerItems>
                    {bestSellerlist?.map((item, index) => {
                        if (index <= 8) {

                            return (
                                <BestSellerItem key={index}>
                                    <ProductImage>
                                        <Img src={`http://localhost:8000${item.image}`}/>
                                    </ProductImage>
                                    <ProductContent>
                                        <ProductTitle>{item.title}</ProductTitle>
                                        <ProductPrice>${item.price}</ProductPrice>
                                    </ProductContent>
                                </BestSellerItem>
                            )
                        }
                    })}

                    <div style={{display: "flex", margin: "0 auto"}}>
                        <ShopButtonLink href='#' style={{textDecoration: "none"}}>See All</ShopButtonLink>
                    </div>
                </BestSellerItems>

                :

                <SliderTemplate
                    products={bestSellerlist}
                    sectionContent="New Arrivals"
                />
            }

        </BestSellerContainer>
    )
}

const BestSellerContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  box-sizing: border-box;

`
const BestSellerHeader = styled.h2`
  font-size: 1.3rem;
  margin: 5rem auto 1.5rem;
`
const BestSellerItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 0.5rem;
  row-gap: 1.5rem;
`

const BestSellerItem = styled.li`
  width: 24%;
`

const ProductImage = styled.a`
  position: relative;
`
const Img = styled.img`
    cursor: pointer;
    width: 100%;
    //max-height: 250px;
`

const ProductContent = styled.a`
  cursor: pointer;
`
const ProductTitle = styled.h3`
  font-size: 14px;
  margin: 6px 0;
`
const ProductPrice = styled.div`
  font-size: 16px;
`