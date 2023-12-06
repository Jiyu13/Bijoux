import delete_icon from "../icons/delete.svg";
import loading_icon from "../icons/loading_icon.svg"
import "../css/cart-page.css"

import {CartItemQuantity} from "./CartItemQuantity";
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {client} from "../../helper-functions/fetchFromAPI";

export function UserCartItemsList() {

    const {
        cart, setCart, cartItems, setCartItems,
        deleteLoading, setDeleteLoading, setCartItemQuantity
    } = useContext(UserContext)


    function handleDeleteCartItem (e) {
        const cartItemId = e.currentTarget.value

        setDeleteLoading(true)

        async function deleteFromCart() {
            try {
                const res = await client.delete(`/cart-item/${cartItemId}/`)
            } catch(error) {
                console.log(error.response.data)
            }
        }

        deleteFromCart()

        setTimeout(function() {
            setDeleteLoading(false)
        }, 500)

        onDeleteUserCartItem(cartItemId)
    }

    function onDeleteUserCartItem(deleteCartItemId) {

        const updatedCartItems = cartItems?.filter(item => {
            if (item.id !== parseInt(deleteCartItemId)) {
                return item
            } else {
                setCartItemQuantity(cart[0].total_quantity - item.quantity)
            }
            // return item.id !== parseInt(deleteCartItemId)
        })
        console.log(updatedCartItems)
        setCartItems(updatedCartItems)

        // const updatedCart = cart[0]?.cart_items.filter(item => {
        //     if (item.cart_item_id !== parseInt(deleteCartItemId)) {
        //         return item
        //     } else {
        //         setCartItemQuantity(cart[0].total_quantity - item.quantity)
        //     }
        // })
        // setCart(?????) // update cart_items & total_quantity)
    }

    return (
        <CartItemsContainer>

            {cart[0]?.cart_items.map((item, index) => {

                return (
                    <CartItemWrapper key={index} >
                        <CartItemImg src={item.product_image} alt=""/>
                        <CartItemDetail>
                            <DetailRow >
                                <RowLeft style={{fontSize: "1rem", margin: "auto 0"}}>{item.product_title}</RowLeft>

                                {deleteLoading ?

                                    <RowRight style={{width: "20px", height: "20px"}}>
                                        <img
                                            src={loading_icon}
                                            alt='loading icon'
                                            className='loading'
                                        />
                                    </RowRight>
                                    :
                                    <>

                                    {/* <RowRight style={{width: "20px", height: "20px", margin: "auto 0"}}>*/}
                                    {/*     <img*/}
                                    {/*        src={loading_icon}*/}
                                    {/*        alt='deleting icon'*/}
                                    {/*        className='loading'*/}
                                    {/*    />*/}
                                    {/*</RowRight>*/}
                                    <button
                                        style={{width: "20px", height: "20px", background: "none", padding: "0", margin: "auto 0", border: "none", cursor: "pointer"}}
                                        onClick={handleDeleteCartItem}
                                        value={item.cart_item_id}
                                    >
                                        <img src={delete_icon} alt="delete icon" style={{width: "100%"}}/>
                                    </button>
                                    </>
                                }


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