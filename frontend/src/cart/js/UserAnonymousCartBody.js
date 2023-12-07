import {EmptyCart} from "./EmptyCart";
import {UserAnonymousCartItemsList} from "./UserAnonymousCartItemsList";
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";

export function UserAnonymousCartBody() {

    const {shoppingCartItems} = useContext(UserContext)

    return (
        <>
            {shoppingCartItems?.length === 0 ?
                <EmptyCart/>
                :
                <UserAnonymousCartItemsList shoppingCartItems={shoppingCartItems}/>
            }
        </>

    )
}
