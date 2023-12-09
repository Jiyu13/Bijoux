import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import styled from "styled-components";

export function CartCountBubble() {

    const {totalCartQuantity, shoppingCartItemQuantity, isLogin} = useContext(UserContext)

    return (
        <BubbleContainer>
            {isLogin ?
                <span>{totalCartQuantity}</span>
                :
                <span>{shoppingCartItemQuantity}</span>
            }
        </BubbleContainer>
    )
}

const BubbleContainer = styled.div`
    position: absolute;
    background-color: rgba(40,44,52, 1);
    color: whitesmoke;
    height: 1rem;
    width: 1rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 1.5rem;
    top: 0.8rem;
    font-size: 0.6rem;
    box-sizing: border-box;
  font-weight: bold;
`

