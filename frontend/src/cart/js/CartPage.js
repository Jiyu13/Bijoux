import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";


import {HeaderText, ModalBody, ModalContainer, ModalFooter, ModalHeader} from "../../components/popupStyles";
import styled from "styled-components";
import '../css/cart-page.css'

import close_black_24dp from "../icons/close_black_24dp.svg"

import {CartBody} from "./CartBody";
import {CartFooter} from "./CartFooter";
import {OverlayBackground} from "./OverlayBackground";
import {UserCartItemsList} from "./UserCartItemsList";
import {UserAnonymousCartItemsList} from "./UserAnonymousCartItemsList";



export function CartPage() {

    const {isLogin, cart, cartItems, shoppingCartItems, openCart, setOpenCart, isMobile, isTablet} = useContext(UserContext)
    const userCart = cart?.[0]
    const userCartItems = userCart?.cart_items || []
    const anonymousCartItems = shoppingCartItems || []

    const anonymousCartTotals = anonymousCartItems.reduce((accumulator, currentItem) => {
        return {
            totalQuantity: accumulator.totalQuantity + currentItem.quantity,
            totalCost: accumulator.totalCost + currentItem.total,
        }
    }, {totalQuantity: 0, totalCost: 0})

    const totalQuantity = isLogin ? userCart?.total_quantity || 0 : anonymousCartTotals.totalQuantity
    const totalCost = isLogin ? userCart?.total_cost || 0 : anonymousCartTotals.totalCost
    const isCartEmpty = isLogin ?
        userCartItems.length === 0 || cartItems?.length === 0
        :
        anonymousCartItems.length === 0

    function handleCloseCart() {
        setOpenCart(!openCart)
    }

    return(
        <>
            {openCart && (
                <>


                <ModalContainer style={{zIndex: "9999"}} >
                    {/**/}
                    {!isMobile && !isTablet && (
                        <OverlayBackground action="cart" setAction={setOpenCart}/>
                    )}

                    <CartModalDialog className='cart-page'>
                        <ModalHeader style={{display: "flex", flex: "0 0 auto", alignItems: "center"}}>
                            <HeaderText>Your Cart</HeaderText>
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

                        <ModalBody style={{height: "calc(100% - 200px)", overflowY: "scroll"}}>

                            <CartBody isEmpty={isCartEmpty}>
                                {isLogin ?
                                    <UserCartItemsList/>
                                    :
                                    <UserAnonymousCartItemsList/>
                                }
                            </CartBody>

                        </ModalBody>
                        {!isCartEmpty && (
                            <ModalFooter>
                                <CartFooter totalQuantity={totalQuantity} totalCost={totalCost}/>
                            </ModalFooter>
                        )}

                    </CartModalDialog>
                </ModalContainer>
                </>
            )}
        </>
    )
}

const CartModalDialog = styled.div`
    box-sizing: border-box;
    position: fixed;
    background-color: white;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;

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
