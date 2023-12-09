import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import {DeviceSize} from "./global/responsive";
import {UserContext} from "./global/user-context/UserContext"
import {Provider} from "react-redux";
import store from "./filter/filter-redux/store/store";

import {client} from "./helper-functions/fetchFromAPI"

import {Footer} from './global/footer/Footer'
import {fetchFromAPI} from "./helper-functions/fetchFromAPI";
import {Home} from "./pages/js/Home";
import {ProductPage} from "./products/product-detail-page/js/ProductPage";
import {Login} from "./login-logout/js/Login";
import {CreateAccount} from "./account/CreateAccount";
import {AccountPage} from "./account/AccountPage";
import {AddressesPage} from "./addresses/js/AddressesPage";
import {ContactForm} from "./contact/ContactForm";
import {CartPage} from "./cart/js/CartPage";
import {Header} from "./global/header/Header";
import {MenuSlide} from "./global/header/MenuSlide";
import {ShopAllPage2} from "./pages/js/ShopAllPage2";
import {Carousels} from "./carousels/js/Carousels";


function App() {
    const [currentUser, setCurrentUser] = useState(null)

    // ======================== anonymous user cart ===============================================
    const [shoppingCartItems, setShoppingCartItems] = useState(null)
    const [shoppingCartItemQuantity, setShoppingCartItemQuantity] = useState(0)

    // ======================== logged in user cart ===============================================
    const [cart, setCart] = useState(null)
    const [openCart, setOpenCart] = useState(false)
    const [cartItems, setCartItems] = useState(null)  // {id:.., quantity: .., cart: .., product: ..}
    const [totalCartQuantity, setTotalCartQuantity] = useState(0)  // for logged-in / unlogged-in users

    const [addToCartQuantity, setAddToCartQuantity] = useState(1)    // for updating quantity of specific item in the detail page
    const [isMenuOpen, setMenuOpen] = useState(false)

    const storeIsLogin = localStorage.getItem("isLogin") === "true"
    const [isLogin, setIsLogin] = useState(storeIsLogin)

    const [products, setProducts] = useState(null)
    const [carousels, setCarousels] = useState(null)
    const [collections, setCollections] = useState(null)

    // ====================== responsive setting =====================================
    const isLargeScreen = useMediaQuery({maxWidth: DeviceSize.desktop})
    const isSmallLaptop = useMediaQuery({maxWidth: DeviceSize.small_laptop})
    const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet })
    const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile })

    // ========================== set "isLogin" localStorage =========================
    useEffect(() => {
        // stays at this top level
        localStorage.setItem("isLogin", isLogin)
    }, [isLogin]);

    // ========================== get "shopping_cart_items" localStorage =============
    useEffect(() => {
        // Check for a logged-in user here
        const storedCartItems = JSON.parse(localStorage.getItem('shopping_cart_items')) || [];
        setShoppingCartItems(storedCartItems);

        const itemQuantity = storedCartItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.quantity;
        }, 0)
        setShoppingCartItemQuantity(itemQuantity)

    }, [shoppingCartItemQuantity]);

    // ========================== get cart  ==========================
    useEffect(() => {
        if (isLogin) {
            async function getCart() {
                try {
                    const res = await client.get('/cart/', {withCredentials: true})
                    // res.data = [{cart_id: 23, user_id: 4, total_quantity: 10}]
                    const cart = res.data
                    setCart(cart)
                    setTotalCartQuantity(cart[0].total_quantity)
                    // check if cart exists
                } catch (error) {
                    console.log(error.response)
                }
            }
            getCart()
        }
    }, [isLogin, totalCartQuantity])  // update cart when adding / updating a product

    // ========================== get user ==========================
    useEffect(() => {
        if (isLogin) {
            async function getUser() {
                try {
                    const res = await client.get('/user/', {withCredentials: true})
                    const user = res.data.user
                    setCurrentUser(user)
                } catch (error) {
                    console.log(error.response)
                }
            }
            getUser()
        }
    }, [isLogin])

    // ========================== get products ==========================
    useEffect(() => {
        fetchFromAPI("/products/", setProducts)
    }, [])

    // ========================== get collections ==========================
    useEffect(() => {
        fetchFromAPI("/collections/", setCollections)
    }, []);


    // ========================== get carousels ==========================
    useEffect(() => {
        fetchFromAPI("/carousels/", setCarousels)
    }, []);

    // useEffect(() => {
    //     async function getCart() {
    //         try {
    //             const res = await client.get('/cart/', {withCredentials: true})
    //             // res.data = [{cart_id: 23, user_id: 4, total_quantity: 10}]
    //             const cart = res.data
    //             console.log("93", cart)
    //
    //             if (cart.length > 0) {
    //                 console.log("cart.length > 0")
    //                 setCart(res.data)
    //                 // console.log(res.data)
    //                 setCartItemQuantity(res.data[0].total_quantity)
    //             }
    //             else {
    //                 console.log("cart empty", cart)
    //                             console.log("hi " + ++hi);
    //
    //                 try {
    //                     // Attempt to create a new cart with a POST request
    //                     const newCartResponse = await client.post('/cart/');
    //                     console.log("New cart created:", newCartResponse.data);
    //                     setCart(newCartResponse.data)
    //                     setCartItemQuantity(res.data[0].total_quantity)
    //                 } catch (createCartError) {
    //                     console.log("Error creating cart:", createCartError.response);
    //                 }
    //             }
    //
    //         } catch (error) {
    //             console.log(error.response)
    //         }
    //     }
    //     getCart()
    // }, []);

    // ========================== get cart items ==========================
    useEffect(() => {
        if (isLogin) {
            async function getCartItems() {
                try {
                    const res = await client.get('/cart-items/')
                    // console.log(res.data)
                    setCartItems(res.data)
                } catch (error) {
                    console.log(error.response)
                }
            }

            getCartItems()
        }
    }, [isLogin])

    // ========== edit body overflow value when cart is open ==============
    useEffect(() => {
        if (openCart) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "visible"
        }
    }, [openCart])

    const userContextValue = {
        setCurrentUser, currentUser, isLogin, setIsLogin,
        isMobile, isTablet, isSmallLaptop, isLargeScreen,
        carousels, products, collections,
        cart, setCart, setOpenCart, openCart, cartItems, setCartItems, addToCartQuantity, setAddToCartQuantity,
        totalCartQuantity, setTotalCartQuantity,
        shoppingCartItems, setShoppingCartItems, shoppingCartItemQuantity, setShoppingCartItemQuantity,
        isMenuOpen, setMenuOpen,
    }

    return (
        <UserContext.Provider value={userContextValue}>
            <Provider store={store}>

            {/*<div className="App">*/}
                <CartPage />
                <MenuSlide />
                <Header/>

                <Main>
                    <Routes>
                        <Route
                            exact
                            path='/products/:id'
                            element={
                                <ProductPage/>
                            }
                        >
                        </Route>
                        <Route
                            exact
                            path='/shop'
                            element={
                                <ShopAllPage2 products={products}/>
                            }
                        >
                        </Route>

                        <Route
                            exact
                            path='/contact'
                            element={<ContactForm/>}
                        >
                        </Route>

                        <Route
                            exact
                            path='/account/addresses'
                            element={
                                <AddressesPage />
                            }
                        >
                        </Route>

                        <Route
                            exact
                            path='/account'
                            element={
                                <AccountPage />
                            }
                        >
                        </Route>

                        <Route
                            exact
                            path='/login'
                            element={
                                <Login />
                            }
                        >
                        </Route>
                        <Route
                            exact
                            path='/register'
                            element={
                                <CreateAccount />
                            }
                        >
                        </Route>

                        {/*<Route*/}
                        {/*    exact*/}
                        {/*    path='/cart'*/}
                        {/*    element={*/}
                        {/*        <CartPage />*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*</Route>*/}

                        <Route
                            exact
                            path='/'
                            element={
                                <Home products={products} collections={collections}/>
                            }
                        >
                        </Route>


                    </Routes>

                </Main>

                <Footer/>

                {/*{isMobile || isTablet  ? <MobileAccessibility /> : ""}*/}
            {/*</div>*/}
            </Provider>
        </UserContext.Provider>

      );
}

export default App;


const Main = styled.main`
  margin: 108px auto 0;
  //position: relative;
  //top: 108px;
  box-sizing: border-box;
`
