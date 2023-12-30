import delete_icon from "../icons/delete.svg";

import { CartItemDetail, CartItemImg, CartItemsContainer, CartItemWrapper,
    DeleteButton,  DetailRow, RowLeft, RowRight} from "./UserCartItemsList";
import {useContext, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {UserAnonymousCartItemQuantity} from "./UserAnonymousCartItemQuantity";
import {CartItemLoadingOverlay} from "./CartItemLoadingOverlay";
import {cleanProductName} from "../../helper-functions/cleanProductName";

export function UserAnonymousCartItemsList() {

    const {shoppingCartItems, setShoppingCartItems, setShoppingCartItemQuantity} = useContext(UserContext)

    const [deletingItem, setDeletingItem] = useState(null)
    const [updatingItem, setUpdatingItem] = useState(null)

    function handleDeleteShoppingCartItem(e) {
        const targetId =  parseInt(e.currentTarget.value)
        setDeletingItem(targetId)

        setTimeout(function() {
            deleteFromCart(targetId)
        }, 500)


    }

    function deleteFromCart(targetId) {
        let deleteItemQuantity
        try {
            const updatedShoppingCartItems = shoppingCartItems.filter(item => {
                if (item.product.product_id !== targetId) {
                    return item
                } else {
                    deleteItemQuantity = item.quantity
                }
            })
            setShoppingCartItems(updatedShoppingCartItems)
            localStorage.setItem('shopping_cart_items', JSON.stringify(updatedShoppingCartItems))

            setShoppingCartItemQuantity(prev => prev - deleteItemQuantity)

        } catch(error) {
            console.log("Product doesn't exist.")
        }
        finally {
            setDeletingItem(null)
        }
    }

    return (
        <CartItemsContainer>

            {shoppingCartItems?.map((item, index) => {

                return (
                    <CartItemWrapper key={index}>

                        {updatingItem === item.product.product_id || deletingItem === item.product.product_id ?
                            <CartItemLoadingOverlay/>
                            :
                            ""
                        }

                        <a href={`/products/${item.product.product_id}`}>
                            <CartItemImg src={item.product.product_img} alt={item.product.product_title}/>
                        </a>


                        <CartItemDetail>
                            <DetailRow >
                                <a href={`/products/${item.product.product_id}/${cleanProductName(item.product.product_title)}`} className='cart-product-title-link'>
                                    <RowLeft style={{fontSize: "1rem"}}>{item.product.product_title}</RowLeft>
                                </a>

                                {/*{deletingItem === item.product.product_id ?*/}
                                {/*    <RowRight style={{width: "20px", height: "20px"}}>*/}
                                {/*        <img src={loading_icon} alt='loading icon' className='loading'/>*/}
                                {/*    </RowRight>*/}
                                {/*    :*/}
                                    <DeleteButton onClick={handleDeleteShoppingCartItem} value={item.product.product_id}>
                                        <img src={delete_icon} alt="delete icon" style={{width: "100%"}}/>
                                    </DeleteButton>
                                {/*}*/}

                            </DetailRow>

                            <DetailRow>
                                <RowLeft>
                                    <UserAnonymousCartItemQuantity
                                        item={item}
                                        updatingItem={updatingItem}
                                        setUpdatingItem={setUpdatingItem}
                                    />
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