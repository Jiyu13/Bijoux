import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";

import {EmptyCart} from "./EmptyCart";

import {
    HeaderText,
    ModalBody,
    ModalContainer,
    ModalHeader
} from "../../components/popupStyles";
import styled from "styled-components";

import close_black_24dp from "../icons/close_black_24dp.svg"

export function CartPage() {

    const {cart, openCart, setOpenCart} = useContext(UserContext)

    function handleCloseCart() {
        setOpenCart(!openCart)
    }


    return(
        <>

        {
            openCart ?

                <ModalContainer>
                    <CartModalDialog>
                        <div style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <ModalHeader style={{display: "flex", flex: "0 0 auto", alignItems: "center"}}>
                                <HeaderText style={{margin: "10px auto"}}>Your Cart</HeaderText>
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
                                display: "flex",
                                flex: "1 1 auto",
                                borderWidth:" 0 0 1px",
                                borderStyle: "solid",
                                borderColor: "#e5e5e5",
                            }}>
                                 {cart?.length === 0 ? <EmptyCart /> : ""}
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
  //transform: translate(-50%, -50%); // ????
  background-color: white;
  width: 500px;
  max-width: calc(100% - 20px);
  
  top: 0;
  right: 0;
  width: 500px;
  height: 100%;
  transition: right .25s ease-in-out;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  z-index: 9999;
  overflow: hidden;
`