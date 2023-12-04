import delete_icon from "../icons/delete.svg";
import {CartItemQuantity} from "./CartItemQuantity";
import styled from "styled-components";

export function UserCartItemsList({cartItems}) {

    // console.log(cartItems)

    return (
        <CartItemsContainer>

            {cartItems?.map((item, index) => {
                // console.log(item)
                return (
                    <CartItemWrapper key={index}>
                        <CartItemImg src={item.product_image} alt=""/>
                        <CartItemDetail>
                            <DetailRow >
                                <RowLeft style={{fontSize: "1rem"}}>{item.product_title}</RowLeft>
                                <RowRight style={{width: "20px"}}>
                                    <img src={delete_icon} alt="delete icon" style={{width: "100%"}}/>
                                </RowRight>
                            </DetailRow>

                            <DetailRow>
                                <RowLeft>
                                    <CartItemQuantity cartProductQuantity={item.quantity}/>
                                </RowLeft>
                                <RowRight>${item.product_price * item.quantity}</RowRight>
                            </DetailRow>
                        </CartItemDetail>

                    </CartItemWrapper>
                )})
            }

        </CartItemsContainer>
    )
}

export const CartItemsContainer = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0px;
  
  box-sizing: border-box;
  //height: calc(100% - 74px);
  //overflow-y: scroll;
`
export const CartItemWrapper = styled.li`
  display: flex;
  gap: 12px;
  //margin: 12px 0;
  padding: 16px 0px;
  border-bottom: 1px solid rgb(234, 234, 234);
  
  &:last-child {
    border-bottom: none;
  }
`
export const CartItemImg = styled.img`
  width: 78px;
  height: 78px;
`

export const CartItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto 0;
  gap: 12px;
`
export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const RowLeft = styled.div`
  //left: 0;
`
export const RowRight = styled.div`
  //right: 0;
`