import styled from "styled-components";
import {DarkButton} from "../../components/buttons";
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {redirectToCheckout} from "../../helper-functions/fetchFromAPI";

export function UserAnonymousCartFooter() {

    const {shoppingCartItems} = useContext(UserContext)

    const {totalQuantity, totalCost} = shoppingCartItems.reduce((accumulator, currentItem) => {
        // console.log(accumulator.totalQuantity, accumulator.totalCost)
        return {
            "totalQuantity": accumulator.totalQuantity + currentItem.quantity,
            "totalCost": accumulator.totalCost + currentItem.total,
        }
    }, { totalQuantity: 0, totalCost: 0 })

    function handleCheckout() {
        redirectToCheckout(shoppingCartItems)
    }


    return (
        <CartPaymentContainer>
            {/*<SubtotalRow>*/}
            {/*    <input placeholder="Discount Code" />*/}
            {/*    <button>Apply</button>*/}
            {/*</SubtotalRow>*/}

            <SubtotalRow>
                <div>Total ({totalQuantity} items):</div>
                <div>${totalCost}</div>
            </SubtotalRow>

            <CheckOutRow>
                <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
            </CheckOutRow>
        </CartPaymentContainer>
    )
}

const CartPaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 12px;
`

const SubtotalRow = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`
const CheckOutRow = styled.div`
    //padding-top: 6px;
`
const CheckoutButton = styled(DarkButton)`
  width: 100%;
  margin: 0;
  
  &:hover {
      box-shadow: none;
    }
`
