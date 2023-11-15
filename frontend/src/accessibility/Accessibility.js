import styled from "styled-components";
import user_icon from "./icons/user_icon.svg"
import shopping_bag from './icons/shopping_bag.svg'
import search_icon from './icons/search_icon.svg'

// import expand_more_black_24 from "./icons/expand_more_black_24dp.svg"
// import {SearchBar} from "../global/search-bar/SearchBar";
// import search_icon from "../global/search-bar/icons/search_black_24dp.svg";

import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../global/user-context/UserContext";
import {CartCountBubble} from "../cart/js/CartCountBubble";


export function Accessibility() {

    const { isLogin, openCart, setOpenCart } = useContext(UserContext)

    let navigate = useNavigate()
    function handleLogin() {
        {isLogin ? navigate('/account') : navigate('/login')}
    }


    function handleToCartPage() {
        setOpenCart(!openCart)
    }

    return (
        <AccessibilityContainer>
            <ContainerItem>
                <Img src={search_icon} alt="search icon"/>
            </ContainerItem>
            <ContainerItem style={{display: "flex"}} onClick={handleLogin}>
                <Img src={user_icon} alt="account icon" />
            </ContainerItem>
            <ContainerItem onClick={handleToCartPage} style={{position: "relative"}}>
                <Img src={shopping_bag} alt="cart icon"/>
                <CartCountBubble />
            </ContainerItem>
        </AccessibilityContainer>
    )
}

const AccessibilityContainer = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: end;
    justify-content: space-between;
    grid-area: icons;
    margin: 0;
`

const ContainerItem = styled.li`
  padding-left: 12px;
  display: flex;
  align-items: center;
  
`

const Img = styled.img`
    width: 28px;
    height: 28px;
`