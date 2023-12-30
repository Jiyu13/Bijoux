import "../css/product_detail.css"
import {ProductMaterial} from "./ProductMaterial";
import {ProductQuantity} from "./ProductQuantity";
import {ProductAddToCart} from "./ProductAddToCart";
import {ProductDescription} from "./ProductDescription";
import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../../../global/user-context/UserContext";
import {client} from "../../../helper-functions/fetchFromAPI";

export function ProductDetails({productDetail}) {

    const {
        isLogin, isMobile, cart,
        cartItems, setCartItems,setTotalCartQuantity,
        shoppingCartItems, setShoppingCartItems, setShoppingCartItemQuantity,
        addToCartQuantity, setOpenCart, setAddToCartQuantity
    } = useContext(UserContext)

    // =============== update cart items for anonymous user =============================
    function handleUpdateShoppingCartItems(updatedObject) {
        const updatedShoppingCartItems = shoppingCartItems?.map(item => {
            if (item?.product.product_id === updatedObject?.product.product_id) {
                return {...item, quantity: updatedObject.quantity, total: updatedObject.total
                }
            }
            return item
        })
        return updatedShoppingCartItems
    }

    function handleUpdateCartItems(updatedObject) {
        // =============== for logged in user =============================
        const updatedCartItems = cartItems?.map(item => {
            // console.log("item", item) // {id: 1, quantity: 21, cart: 10, product: 3}
            // console.log("updatedObject", updatedObject)  // {id: 52, product_id: 8, quantity: 8}
            // console.log(item?.product === updatedObject?.product_id)
            if (item?.product === updatedObject?.product_id) {
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
                return item.product.product_id === productDetail?.id
            })

            const formattedProductDetail = {
                product_id: productDetail?.id,
                product_img: productDetail?.image,
                product_title: productDetail?.title,
                product_price: productDetail?.price,
            }


            if (targetItem?.length > 0) {
                // ==================== item in localstorage ==============================
                const shoppingCartObject = {
                    product: formattedProductDetail,
                    quantity: targetItem[0]?.quantity + addToCartQuantity,
                    total: targetItem[0]?.total + productDetail?.price * addToCartQuantity
                }
                const updated = handleUpdateShoppingCartItems(shoppingCartObject)
                setShoppingCartItems(updated)
                localStorage.setItem('shopping_cart_items', JSON.stringify(updated))

            }  else {
                // ==================== item doesn't in localstorage ======================
                const newShoppingCartObject = {
                    product: formattedProductDetail,
                    quantity: addToCartQuantity,
                    total: productDetail?.price * addToCartQuantity
                }

                const newShoppingCartItems = [...shoppingCartItems, newShoppingCartObject]

                setShoppingCartItems(newShoppingCartItems)
                localStorage.setItem('shopping_cart_items', JSON.stringify(newShoppingCartItems));

            }
            setShoppingCartItemQuantity(prev => prev + addToCartQuantity) // change to shoppingCartItemQuantity, setShoppingCartItemQuantity
        } else {
            const newCartItem = {
                product_id: productDetail?.id,
                quantity: addToCartQuantity,
                cart: cart[0]?.cart_id,
            }

            client.post('/cart-item/add/', newCartItem)
            .then(res => {

                // res.data returns: cart_item = {id: ..., product_id: ..., quantity: ... }
                const targetCartItem = cart[0]?.cart_items.filter(item => {

                    return item.product_id === productDetail?.id
                })
                // ==================== update frontend states =========================================
                if (targetCartItem.length > 0) {
                    // ======================== if item exists, update "quantity" =======================
                    const updated = handleUpdateCartItems(res.data)
                    //[{id: 1, quantity: 21, cart: 10, product: 3}, {…}, {…}, {…}, {…}]

                    setCartItems(updated)
                } else {
                    // ======================== if item doesn't exist, add new one to the list  =======================
                    const addNewCartItem = {
                        id: res.data.id,
                        quantity: res.data.quantity,
                        cart: cart[0]?.cart_id,
                        product: productDetail?.id
                    }

                    setCartItems([...cartItems, addNewCartItem])
                }
                setTotalCartQuantity(prev => prev + addToCartQuantity)

            })
            .catch(error => console.log(error))
        }
        setOpenCart(true)
        setAddToCartQuantity(1)
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
                    {/*<ProductMaterial/>*/}

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