import {EmptyCart} from "./EmptyCart";
import {UserAnonymousCartItems} from "./UserAnonymousCartItems";
import {UserCartItems} from "./UserCartitems";

export function UserCartIBody({cart}) {
    return (
        <>
            {cart.cart_items?.length === 0 ?
                <EmptyCart/>
                :
                <UserCartItems cartItems={cart.cartItems}/>
            }
        </>

    )
}