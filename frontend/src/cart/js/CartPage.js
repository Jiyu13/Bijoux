import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";


import {HeaderText, ModalBody, ModalContainer, ModalHeader} from "../../components/popupStyles";
import styled from "styled-components";
import '../css/cart-page.css'

import close_black_24dp from "../icons/close_black_24dp.svg"

import {CartItemList} from "./CartItemList";
import {EmptyCart} from "./EmptyCart";


export function CartPage() {

    const {cart, openCart, setOpenCart, shoppingCartItems} = useContext(UserContext)

    function handleCloseCart() {
        setOpenCart(!openCart)
    }


    return(
        <>
            {
                openCart ?

                    <ModalContainer style={{zIndex: "9999"}} >
                        <CartModalDialog className='cart-page'>
                            <div style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <ModalHeader style={{display: "flex", flex: "0 0 auto", alignItems: "center"}}>
                                    <HeaderText style={{}}>Your Cart</HeaderText>
                                    <button
                                        style={{
                                            border: "none",
                                            background: "none",
                                            position: "absolute",
                                            right: "10px",
                                            cursor: "pointer",
                                        }}
                                        onClick={handleCloseCart}
                                    >
                                        <img src={close_black_24dp} alt='close cart'/>
                                    </button>
                                </ModalHeader>

                                <ModalBody style={{
                                    // display: "flex",
                                    // flex: "1 1 auto",
                                    // borderWidth:" 0 0 1px",
                                    // borderStyle: "solid",
                                    // borderColor: "#e5e5e5",
                                }}>
                                     {cart?.length === 0 || shoppingCartItems.length === 0 ? <EmptyCart /> : <CartItemList />}
                                </ModalBody>

                            </div>
                        </CartModalDialog>
                    </ModalContainer>

                    :

                    ""
            }
        </>
    )
}

const CartModalDialog = styled.div`
    box-sizing: border-box;
    position: fixed;
    background-color: white;
    right: 0;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;
    overflow-y: hidden;
  

    // slide the cart from right to left
    transform: translateX(100%);
    animation: slideLeft 0.3s ease forwards;
    
    @keyframes slideLeft {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(0%);
      }
    }
`