import {EmptyCart} from "./EmptyCart";
import {UserAnonymousCartItemsList} from "./UserAnonymousCartItemsList";

export function UserAnonymousCartBody({shoppingCartItems}) {
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
