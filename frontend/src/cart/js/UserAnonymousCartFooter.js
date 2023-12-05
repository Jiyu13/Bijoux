import styled from "styled-components";
import {DarkButton} from "../../components/buttons";

export function UserAnonymousCartFooter({shoppingCartItems}) {

    const {totalQuantity, totalCost} = shoppingCartItems.reduce((accumulator, currentItem) => {
        // console.log(accumulator.totalQuantity, accumulator.totalCost)
        return {
            "totalQuantity": accumulator.totalQuantity + currentItem.quantity,
            "totalCost": accumulator.totalCost + currentItem.total,
        }
    }, { totalQuantity: 0, totalCost: 0 })


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
                <CheckoutButton>Go To Checkout</CheckoutButton>
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