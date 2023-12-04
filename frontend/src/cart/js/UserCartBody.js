import {EmptyCart} from "./EmptyCart";
import {UserAnonymousCartItemsList} from "./UserAnonymousCartItemsList";
import {UserCartItemsList} from "./UserCartItemsList";

export function UserCartBody({cart}) {

    // console.log(cart)

    return (
        <>
            {cart[0]?.length === 0 ?
                <EmptyCart/>
                :
                <UserCartItemsList cartItems={cart[0]?.cart_items} />
            }
        </>

    )
}