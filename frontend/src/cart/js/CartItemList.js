import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import styled from "styled-components";

import delete_icon from "../icons/delete.svg"
import {CartItemQuantity} from "./CartItemQuantity";

export function CartItemList() {
    const {cart, shoppingCartItems} = useContext(UserContext)

    // console.log(cart?.length === 0)
    // console.log(shoppingCartItems)

    const displayCartItems = cart ? cart : shoppingCartItems

    return (
        <CartItemListContainer>
            <ul style={{listStyle: "none", paddingLeft: "0", margin: "0px"}}>
                {displayCartItems?.map((item, index) => {
                    return (
                        <CartItemWrapper key={index}>
                            <CartItemImg src={item.product.image} alt=""/>
                            <CartItemDetail>
                                <DetailRow >
                                    <RowLeft style={{fontSize: "1rem"}}>{item.product.title}</RowLeft>
                                    <RowRight style={{width: "20px"}}>
                                        <img src={delete_icon} alt="delete icon" style={{width: "100%"}}/>
                                    </RowRight>
                                </DetailRow>

                                <DetailRow>
                                    <RowLeft>
                                        <CartItemQuantity cartProductQuantity={item.quantity}/>
                                    </RowLeft>
                                    <RowRight>${item.product.price * item.quantity}</RowRight>
                                </DetailRow>
                            </CartItemDetail>

                        </CartItemWrapper>
                    )})
                }
            </ul>
        </CartItemListContainer>
    )
}

const CartItemListContainer = styled.div``
const CartItemWrapper = styled.li`
  display: flex;
  gap: 12px;
  //margin: 12px 0;
  padding: 16px 0;
  border-bottom: 1px solid black;
  
  &:last-child {
    border-bottom: none;
  }
`
const CartItemImg = styled.img`
  width: 78px;
  height: 78px;
`

const CartItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto 0;
  gap: 12px;
`
const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const RowLeft = styled.div`
  //left: 0;
`
const RowRight = styled.div`
  //right: 0;
`