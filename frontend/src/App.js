import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";


import {useMediaQuery} from "react-responsive";
import {DeviceSize} from "./global/responsive";
import {UserContext} from "./global/user-context/UserContext";


import {client} from "./helper-functions/fetchFromAPI"

import {Footer} from './global/footer/js/Footer'
import {NavBar} from "./global/navbar/js/NavBar";
import {MobileAccessibility} from "./accessibility/MobileAccessibility";
import {fetchFromAPI} from "./helper-functions/fetchFromAPI";
import {Home} from "./components/Home";
import {ShopAllPage} from "./components/ShopAllPage";

import {Provider} from "react-redux";
import store from "./filter/filter-redux/store/store";
import {ProductPage} from "./products/product-detail-page/js/ProductPage";
import {Login} from "./login-logout/js/Login";
import {CreateAccount} from "./account/CreateAccount";
import {AccountPage} from "./account/AccountPage";
import {AddressesPage} from "./addresses/js/AddressesPage";
import {ContactForm} from "./contact/ContactForm";
import {CartPage} from "./cart/js/CartPage";


function App() {
    const [currentUser, setCurrentUser] = useState(null)

    // const storeCartItems = JSON.parse(localStorage.getItem('shopping_cart_items'))
    const [shoppingCartItems, setShoppingCartItems] = useState(null)

    const storeIsLogin = localStorage.getItem("isLogin") === "true"
    const [isLogin, setIsLogin] = useState(storeIsLogin)

    const [products, setProducts] = useState(null)
    const [carousels, setCarousels] = useState(null)
    const [collections, setCollections] = useState(null)

    const [cart, setCart] = useState(null)
    const [openCart, setOpenCart] = useState(false)
    const [cartItems, setCartItems] = useState(null)
    const [cartItemQuantity, setCartItemQuantity] = useState(0)

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
        setCartItemQuantity(itemQuantity)

    }, []);

    // ========================== get cart  ==========================
    useEffect(() => {
        if (isLogin) {
            async function getCart() {
                try {
                    const res = await client.get('/cart/', {withCredentials: true})
                    // res.data = [{cart_id: 23, user_id: 4, total_quantity: 10}]
                    const cart = res.data
                    setCart(cart)
                    setCartItemQuantity(cart[0].total_quantity)
                    // check if cart exists
                } catch (error) {
                    console.log(error.response)
                }
            }
            getCart()
        }
    }, [isLogin])

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
                    setCartItems(res.data)
                } catch (error) {
                    console.log(error.response)
                }
            }

            getCartItems()
        }
    }, [isLogin])

    const userContextValue = {
        setCurrentUser, currentUser, isLogin, setIsLogin,
        isMobile, isTablet, isSmallLaptop, isLargeScreen,
        carousels, products, collections,
        cart, setCart, setOpenCart, openCart, cartItems, setCartItems,
        setCartItemQuantity, cartItemQuantity, shoppingCartItems, setShoppingCartItems
    }

    return (
        <UserContext.Provider value={userContextValue}>
            <Provider store={store}>
            <CartPage />
            <div className="App">
                <NavBar />
                <Main className="main-container">
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
                                <ShopAllPage products={products}/>
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
            </div>
            </Provider>
        </UserContext.Provider>

      );
}

export default App;


const Main = styled.div`
  margin: 0 auto;
`
