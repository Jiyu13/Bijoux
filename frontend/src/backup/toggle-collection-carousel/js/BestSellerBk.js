import styled from "styled-components"
import "../css/best-sellers.css"

import {API_URL} from "../../../helper-functions/fetchFromAPI";

export function BestSellerBk({products}) {
    return (
        <ComponentContainer>
            <ComponentWrapper>
                <SectionTopic className="">
                    <SectionItem>
                        <Topic>Best Sellers</Topic>
                    </SectionItem>
                    <SectionItem>
                        <ShopButton>View All</ShopButton>
                    </SectionItem>
                </SectionTopic>

                <ItemsContainer>
                    {
                        products?.map((product, index) => {
                            return (
                                <Item key={index}>
                                    <Link to="">
                                        <div>
                                            <Img
                                                className="best-seller-image"
                                                src={`${API_URL}${product.image}`}
                                            />
                                        </div>

                                        <Context>
                                            <Title>{product?.title}</Title>
                                            <Price>${product?.price}</Price>
                                        </Context>
                                    </Link>
                                </Item>
                            )
                        })
                    }
                </ItemsContainer>
            </ComponentWrapper>
        </ComponentContainer>
    )
}


const ComponentContainer = styled.div`
    box-sizing: border-box;
    background-color: rgb(163, 72, 148, 0.2);
    margin-bottom: 20px;
    display: flex;
    border-radius: 12px;
`
const ComponentWrapper = styled.div`
    //display: flex;
    //flex: 1 1 auto;
    //justify-content: space-between;
    //grid-template-columns: 1.5fr auto;
`
const ItemsContainer = styled.ul`
    box-sizing: border-box;
    //width: 100%;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    margin: 0;
    padding: 8px;
`
const Item = styled.li`
  display: flex;
  cursor: pointer;
`
const Link = styled.a``
const Img = styled.img`
  width: 100%;
  //max-width: 156px;
  border-radius: 8px;
`
const Context = styled.div``
const Title = styled.p`
    margin: 0;
`
const Price = styled.p`
    margin: 0;
`
const SectionTopic = styled.div`
  display: flex;
  padding: 8px ;
  margin: auto 24px;
  //background: linear-gradient(rgb(163, 72, 148, 0.2), white);
  //border-radius: 12px;
`
const SectionItem = styled.div`
  margin: auto 0;
`
const Topic = styled.h1`
  font-size: 2rem;
  margin-right: 12px;
  margin-bottom: 24px;
  font-weight: 700;
  white-space: nowrap;
`
const ShopButton = styled.button`
  height: 30px;
  width: 100%;
  border: none;
  background-color: rgba(235, 77, 75, 0.4);
  color: rgba(0, 0, 0, .7);

  
  &:hover {
    background-color: rgba(235, 77, 75, 0.6);
    color: rgba(0, 0, 0, 1);
  }
`




