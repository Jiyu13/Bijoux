import styled from "styled-components";
import {useContext, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {client} from "../../helper-functions/fetchFromAPI";

export function UserCartItemQuantity({item, setUpdatingItem}) {
    // item -> cart[0].cart_items -> {cart_item_id,  product_id, product_image,  product_price, product_title, quantity}
    // cartItems -> cartItem ->  {id, quantity, cart, product}

    const {cartItems, setCartItems, setTotalCartQuantity} = useContext(UserContext)

    const [itemQuantity, setItemQuantity] = useState(item.quantity)

    function handleUpdateItemQuantity(e) {
        const action = e.target.value
        setUpdatingItem(item.product_id)

        setTimeout(function() {
            // execute "put/patch request to update cart item in the backend
            if (action === "increase") {
                handleIncrease()
            } else {
                handleDecrease()
            }

            setUpdatingItem(null)
        }, 500)
    }

    function handleDecrease() {
        const decreasedQuantity = {quantity: item.quantity - 1}

        client.patch(`cart-item/${item.cart_item_id}/`, decreasedQuantity)
            .then(res => {
                const updatedIncreaseQuantity = cartItems.map(i => {
                    if (i.id === item?.cart_item_id) {
                        return {...i, quantity: res.data}
                    }
                    return i
                })
                setCartItems(updatedIncreaseQuantity)
            })
            .catch(error => console.log(error))

        setItemQuantity(prev => prev - 1)  // update target item quantity
        setTotalCartQuantity(prev => prev - 1)  // update total quantity for all items
    }
    function handleIncrease() {

        const increasedQuantity = {quantity: item.quantity + 1}

        client.patch(`cart-item/${item.cart_item_id}/`, increasedQuantity)
            .then(res => {
                const updatedIncreaseQuantity = cartItems.map(i => {
                    if (i.id === item?.cart_item_id) {
                        return {...i, quantity: res.data}
                    }
                    return i
                })
                setCartItems(updatedIncreaseQuantity)
            })
            .catch(error => console.log(error))

        setItemQuantity(prev => prev + 1)  // update target item quantity
        setTotalCartQuantity(prev => prev + 1)  // update total quantity for all items

    }

    function handleQuantityInputChange() {}

    return(
         <QuantityContainer>
            <QuantityControl>
                <ControlDecrease
                    type="button"
                    disabled={itemQuantity <= 1}
                    onClick={handleUpdateItemQuantity}
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
                    onClick={handleUpdateItemQuantity}
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