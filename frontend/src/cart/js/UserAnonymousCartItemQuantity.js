import {useContext, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import styled from "styled-components";
import {client} from "../../helper-functions/fetchFromAPI";

export function UserAnonymousCartItemQuantity({item}) {

    const {shoppingCartItems, setShoppingCartItems,
        shoppingCartItemQuantity, setShoppingCartItemQuantity
    } = useContext(UserContext)

    const [itemQuantity, setItemQuantity] = useState(item.quantity)

    // console.log(item)
    function handleUpdateItemQuantity(action) {
        if (action === "increase") {
            setItemQuantity(prev => prev + 1)

            const updatedItems = shoppingCartItems?.map(i => {
                 if (i.product.product_id === item.product.product_id) {
                    return {...i, quantity: i.quantity + 1, total: i.total + i.product.product_price}
                }
                return i
            })
            setShoppingCartItems(updatedItems)
            localStorage.setItem('shopping_cart_items', JSON.stringify(updatedItems))
            setShoppingCartItemQuantity(prev => prev + 1)

        } else {
            const currentQuantity = item.quantity
            if (currentQuantity !== 1) {
                setItemQuantity(prev => prev - 1)

                const updatedItems = shoppingCartItems?.map(i => {
                     if (i.product.product_id === item.product.product_id) {
                        return {...i, quantity: i.quantity - 1, total: i.total - i.product.product_price}
                    }
                    return i
                })
                setShoppingCartItems(updatedItems)
                localStorage.setItem('shopping_cart_items', JSON.stringify(updatedItems))
                setShoppingCartItemQuantity(prev => prev + 1)
            }
        }

    }

    function handleDecrease(e) {
        handleUpdateItemQuantity(e.target.value)
    }
    function handleIncrease(e) {
        handleUpdateItemQuantity(e.target.value)
    }

    function handleQuantityInputChange() {}

    return(
         <QuantityContainer>
            <QuantityControl>
                <ControlDecrease
                    type="button"
                    disabled={itemQuantity <= 1}
                    onClick={handleDecrease}
                    value='decrease'
                >
                    -
                </ControlDecrease>
                <ControlInput
                    type="text"
                    // defaultValue={quantity}
                    value={itemQuantity}
                    onChange={handleQuantityInputChange}
                />
                <ControlIncrease
                    type="button"
                    onClick={handleIncrease}
                    value='increase'
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