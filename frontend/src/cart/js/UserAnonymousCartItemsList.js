import delete_icon from "../icons/delete.svg";
import {CartItemQuantity} from "./CartItemQuantity";

import {
    CartItemDetail,
    CartItemImg,
    CartItemsContainer,
    CartItemWrapper,
    DetailRow,
    RowLeft,
    RowRight
} from "./UserCartItemsList";

export function UserAnonymousCartItemsList({shoppingCartItems}) {
    return (
        <CartItemsContainer>

            {shoppingCartItems?.map((item, index) => {
                return (
                    <CartItemWrapper key={index}>
                        <CartItemImg src={item.product.product_img} alt=""/>
                        <CartItemDetail>
                            <DetailRow >
                                <RowLeft style={{fontSize: "1rem"}}>{item.product.product_title}</RowLeft>
                                <RowRight style={{width: "20px"}}>
                                    <img src={delete_icon} alt="delete icon" style={{width: "100%"}}/>
                                </RowRight>
                            </DetailRow>

                            <DetailRow>
                                <RowLeft>
                                    <CartItemQuantity cartProductQuantity={item.quantity}/>
                                </RowLeft>
                                <RowRight>${item.product.product_price * item.quantity}</RowRight>
                            </DetailRow>
                        </CartItemDetail>

                    </CartItemWrapper>
                )})
            }

        </CartItemsContainer>
    )
}