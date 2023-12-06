import {EmptyCart} from "./EmptyCart";
import {UserCartItemsList} from "./UserCartItemsList";
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";

export function UserCartBody() {

    const {cart, cartItems} = useContext(UserContext)

    return (
        <>
            {cart[0]?.cart_items.length === 0 || cartItems.length === 0 ?
                <EmptyCart/>
                :
                <UserCartItemsList cartItems={cart[0]} />
            }
        </>

    )
}