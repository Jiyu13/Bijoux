import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import styled from "styled-components";

export function CartCountBubble() {

    const {cartItems} = useContext(UserContext)

    return (
        <BubbleContainer>
            <span>{cartItems?.length}</span>
        </BubbleContainer>
    )
}

const BubbleContainer = styled.div`
    position: absolute;
    background-color: rgba(40,44,52, 1);
    color: whitesmoke;
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  left: 2.2rem;
  top: 0.5rem;
`

