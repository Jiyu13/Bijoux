import {EmptyCart} from "./EmptyCart";

export function CartBody({isEmpty, children}) {
    return (
        <>
            {isEmpty ?
                <EmptyCart/>
                :
                children
            }
        </>
    )
}
