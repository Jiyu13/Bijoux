import styled from "styled-components";
import '../css/best_seller.css'
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {SliderTemplate} from "../../item-sliders-template/js/SliderTemplate";
import {ShopButtonLink} from "../../components/buttons";

export function BestSellers() {

    const {products, isMobile, isTablet} = useContext(UserContext)

    const bestSellerList = products?.filter(item => {
        if (item.collection.collection_name === "Best Sellers") {
            return item
        }
        return null
    })


    return (
        <BestSellerContainer className='best-seller'>
            <BestSellerHeader>Most Popular</BestSellerHeader>

            {!isMobile && !isTablet ?

                <BestSellerItems>
                    {bestSellerList?.map((item, index) => {
                        if (index <= 8) {

                            return (
                                <BestSellerItem key={index}>
                                    <Link>
                                        <Img src={`http://localhost:8000${item.image}`}/>
                                        <ProductContent>
                                            <ProductTitle>{item.title}</ProductTitle>
                                            <ProductPrice>$ {item.price}</ProductPrice>
                                        </ProductContent>
                                    </Link>

                                </BestSellerItem>
                            )
                        }
                        return null
                    })}
                </BestSellerItems>

                :

                <SliderTemplate products={bestSellerList}/>
            }

            <div style={{display: "flex", margin: "2rem auto", boxSizing: "border-box"}}>
                <ShopButtonLink href='#' style={{textDecoration: "none"}}>See All</ShopButtonLink>
            </div>
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

const Link = styled.a`
  cursor: pointer;
`
const Img = styled.img`
    position: relative;
    width: 100%;
`

export const ProductContent = styled.div`
   display: flex;
   flex-direction: column;
   align-items: start;
   padding: 0.5rem 0;
  box-sizing: border-box;
  color: #656565;

`
const ProductTitle = styled.h3`
  font-size: 14px;
  margin: 6px 0;
`
const ProductPrice = styled.div`
  font-size: 16px;
`