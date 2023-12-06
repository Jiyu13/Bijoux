import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import styled from "styled-components";

export function CartItemQuantity({cartProductQuantity}) {

    const {quantity, setQuantity} = useContext(UserContext)

    function handleDecrease() {
        setQuantity(prev => prev - 1)
    }
    function handleIncrease() {
        setQuantity(prev => prev + 1)
    }

    function handleQuantityInputChange() {}

    return(
         <QuantityContainer>
            <QuantityControl>
                <ControlDecrease
                    type="button"
                    disabled={cartProductQuantity <= 1}
                    onClick={handleDecrease}
                >
                    -
                </ControlDecrease>
                <ControlInput
                    type="text"
                    // defaultValue={quantity}
                    value={cartProductQuantity}
                    onChange={handleQuantityInputChange}
                />
                <ControlIncrease
                    type="button"
                    onClick={handleIncrease}
                >
                    +
                </ControlIncrease>
            </QuantityControl>
        </QuantityContainer>
    )
}

const QuantityContainer = styled.div``
const QuantityControl = styled.div`
  box-sizing: border-box;
    display: flex;
    border: solid 1px rgba(40,44,52, 0.9);
    width: 120px;
    height: 2rem;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.5rem;
    //margin: 6px 0 24px;
`

const ControlIncrease = styled.button`
    border: none;
    background: none;
    flex: 1;
    cursor: pointer;
    font-size: 1.5rem;
    padding-block: 0px !important;
    padding-inline: 0px !important;
`
const ControlDecrease = styled.button`
    border: none;
    background: none;
    flex: 1;
    cursor: pointer;
    font-size: 1.5rem;
    padding-block: 0px !important;
    padding-inline: 0px !important;
    //padding: 0 12px;
`

const ControlInput = styled.input`
    border: none;
    width: 54px;
    text-align: center;
    flex: 1;
    font-size: 1rem;  
    
    &:focus {
      border: none;
    }
`