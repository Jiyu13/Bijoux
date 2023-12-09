import delete_icon from "../icons/delete.svg";
import "../css/cart-page.css"

import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {client} from "../../helper-functions/fetchFromAPI";
import {UserCartItemQuantity} from "./UserCartItemQuantity";
import {CartItemLoadingOverlay} from "./CartItemLoadingOverlay";

export function UserCartItemsList() {

    const {cart, cartItems, setCartItems, setTotalCartQuantity} = useContext(UserContext)

    const [deletingItem, setDeletingItem] = useState({})
    const [updatingItem, setUpdatingItem] = useState(null)

    function handleDeleteCartItem (e) {
        const targetId = parseInt(e.currentTarget.value)
        setDeletingItem(prev => ({...prev, [targetId]: true}))

        client.delete(`/cart-item/${targetId}/`)
            .then(res => {
                setTimeout(function() {
                    setDeletingItem(prev => ({...prev, [targetId]: false}))
                    deleteFromUserCart(targetId)
                }, 500)
            })
            .catch(error => console.log(error.response.data))
    }

    function deleteFromUserCart(targetId) {

        const updatedCartItems = cartItems?.filter(item => {
            if (item.id !== targetId) {
                return item
            } else {
                setTotalCartQuantity(cart[0].total_quantity - item.quantity)
            }
            // return item.id !== parseInt(deleteCartItemId)
        })
        setCartItems(updatedCartItems)
    }

    return (
        <CartItemsContainer>

            {cart[0]?.cart_items.map((item, index) => {

                return (
                    <CartItemWrapper key={index} >
                        {updatingItem === item.product_id || deletingItem[item.cart_item_id] ?
                            <CartItemLoadingOverlay />
                            :
                            ""
                        }

                        <CartItemImg src={item.product_image} alt=""/>
                        <CartItemDetail>
                            <DetailRow >
                                <RowLeft style={{fontSize: "1rem", margin: "auto 0"}}>{item.product_title}</RowLeft>

                                <DeleteButton onClick={handleDeleteCartItem} value={item.cart_item_id}>
                                    <img src={delete_icon} alt="delete icon" style={{width: "100%"}}/>
                                </DeleteButton>

                            </DetailRow>

                            <DetailRow>
                                <RowLeft>
                                    <UserCartItemQuantity item={item} setUpdatingItem={setUpdatingItem}/>
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
  position: relative; /* Set position to relative */
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
  gap: 16px;
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
  margin: auto 0
`

export const DeleteButton = styled.button`
  width: 20px;
  height: 20px;
  background: none;
  padding: 0;
  margin: auto 0;
  border: none;
  cursor: pointer;
`

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1; /* Ensure it appears on top */
`