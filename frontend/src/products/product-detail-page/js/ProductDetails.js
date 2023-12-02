import "../css/product_detail.css"
import {ProductMaterial} from "./ProductMaterial";
import {ProductQuantity} from "./ProductQuantity";
import {ProductAddToCart} from "./ProductAddToCart";
import {ProductDescription} from "./ProductDescription";
import styled from "styled-components";
import {useContext, useState} from "react";
import {UserContext} from "../../../global/user-context/UserContext";
import {client} from "../../../helper-functions/fetchFromAPI";

export function ProductDetails({productDetail}) {

    const {
        isLogin, isMobile, cart,
        cartItems, setCartItems,
        setCartItemQuantity,
        shoppingCartItems, setShoppingCartItems,
        quantity,
    } = useContext(UserContext)

    function handleUpdateShoppingCartItems(updatedObject) {
        // =============== for anonymous user =============================
        const updatedShoppingCartItems = shoppingCartItems?.map(item => {
            if (item?.product.id === updatedObject?.product.id) {
                return {...item, quantity: updatedObject.quantity}
            }
            return item
        })
        return updatedShoppingCartItems
    }

    function handleUpdateCartItems(updatedObject) {
        // =============== for logged in user =============================
        const updatedCartItems = shoppingCartItems?.map(item => {
            if (item?.product.id === updatedObject?.product_id) {
                return {...item, quantity: updatedObject.quantity}
            }
            return item
        })
        return updatedCartItems
    }

    function handleAddToCartSubmit(e) {
        e.preventDefault()
        if (!isLogin) {
            const targetItem = shoppingCartItems?.filter(item => {
                return item.product.id === productDetail?.id
            })
            if (targetItem?.length > 0) {
                // ==================== item in localstorage ==============================
                const shoppingCartObject = {
                    product: productDetail,
                    quantity: targetItem[0]?.quantity + quantity,
                }
                const updated = handleUpdateShoppingCartItems(shoppingCartObject)
                setShoppingCartItems(updated)
                localStorage.setItem('shopping_cart_items', JSON.stringify(updated))

            }  else {

                // ==================== item doesn't in localstorage ======================
                const newShoppingCartObject = {
                    product: productDetail,
                    quantity: quantity,
                }

                const newShoppingCartItems = [...shoppingCartItems, newShoppingCartObject]

                setShoppingCartItems(newShoppingCartItems)
                localStorage.setItem('shopping_cart_items', JSON.stringify(newShoppingCartItems));

            }
            setCartItemQuantity(prev => prev + quantity)
        } else {
            // console.log("logged in")
            const newCartItem = {
                // product_2: productDetail?.id,
                product_id: productDetail?.id,
                quantity: quantity,
                cart: cart[0]?.cart_id,
            }

            client.post('/cart-item/add/', newCartItem)
            .then(res => {
                // res.data returns: cart_item = {id: ..., product_id: ..., quantity: ... }
                const updated = handleUpdateCartItems(res.data)
                setCartItems([...cartItems, updated])
                // !!!!!!!!!!!!!!!!!!!!!!!!need to check if new item exists before updating the cartItems state
                setCartItemQuantity(prev => prev + quantity)
            })
            .catch(error => console.log(error))
        }
    }


    return (
        <div style={{
            width: isMobile ? "100%" : "35%",
            paddingLeft: isMobile ? "0" : "30px"
        }}
        >
            <div style={{}}>
                <ProductTitle>{productDetail?.title}</ProductTitle>
            </div>

            <div>${productDetail?.price}</div>
            <div>
                <form onSubmit={handleAddToCartSubmit}>

                    {/*==================== material section =======================*/}
                    {/*=================== get from productDetail.material =========*/}
                    <ProductMaterial/>

                    {/*==================== quantity buttons ===================*/}
                    <ProductQuantity />

                    {/*=================== submit button =======================*/}
                    <ProductAddToCart/>

                    {/*=================== product description =======================*/}
                    {/*=================== get from productDetail.description ========*/}
                    <ProductDescription/>
                </form>

            </div>

        </div>
    )
}

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 15px;
`