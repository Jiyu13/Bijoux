import styled from "styled-components";
import {useState} from "react";

export function ProductQuantity() {

    const [quantity, setQuantity] = useState(1)

    function handleDecrease() {
        setQuantity(prev => prev - 1)
    }
    function handleIncrease() {
        setQuantity(prev => prev + 1)
    }

    return(
         <QuantityContainer>
            <QuantityLabel>Quantity</QuantityLabel>
            <QuantityControl>
                <ControlDecrease
                    type="button"
                    disabled={quantity <= 1}
                    onClick={handleDecrease}
                >
                    -
                </ControlDecrease>
                <ControlInput type="text" value={quantity}/>
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
    display: flex;
    border: solid 1px rgba(40,44,52, 0.9);
    width: 150px;
    height: 2.5rem;
    box-sizing: border-box;
    text-align: center;
    font-size: 2rem;
    margin: 6px 0 24px;
`

const QuantityLabel = styled.label`
    margin: 12px 0 24px;
    font-size: 0.9rem;
    color: rgba(40,44,52, 0.6);
`

const ControlIncrease = styled.button`
    border: none;
    background: none;
    flex: 1;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0 12px;
`
const ControlDecrease = styled.button`
    border: none;
    background: none;
    flex: 1;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0 12px;
`

const ControlInput = styled.input`
    border: none;
    width: 60px;
    text-align: center;
    flex: 1;
    font-size: 1rem;  
    
    //&:focus {
    //outline: none;
    //}
`