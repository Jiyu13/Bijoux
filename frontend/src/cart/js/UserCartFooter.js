import styled from "styled-components";
import {DarkButton} from "../../components/buttons";
import {redirectToCheckout} from "../../helper-functions/fetchFromAPI";

export function UserCartFooter({cartItems}) {

    //  "cartItems = cart[0]"
    const cartItemCount = cartItems.total_quantity
    const totalCost = cartItems.total_cost

    function handleCheckout() {
        redirectToCheckout()
    }

    return (
        <CartPaymentContainer>
            {/*<SubtotalRow>*/}
            {/*    <input placeholder="Discount Code" />*/}
            {/*    <button>Apply</button>*/}
            {/*</SubtotalRow>*/}

            <SubtotalRow>
                <div>
                    Total ({cartItemCount} items):
                </div>
                <div>
                    ${totalCost}
                </div>
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
