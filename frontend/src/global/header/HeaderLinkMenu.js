import menu_icon from "./icons/menu_icon.svg"
import close_menu_icon from './icons/close_icon.svg'
import styled from "styled-components";
import {useContext, useEffect} from "react";
import {UserContext} from "../user-context/UserContext";

export function HeaderLinkMenu() {

    const {isMenuOpen, setMenuOpen} = useContext(UserContext)
    function handleOpenMenu() {
        setMenuOpen(!isMenuOpen)
    }

    return (
        <MenuContainer onClick={handleOpenMenu}>
            {isMenuOpen ? <Img src={close_menu_icon} alt="close menu icon" /> : <Img src={menu_icon} alt='menu_icon'/>}
        </MenuContainer>
    )
}

const MenuContainer = styled.div`
  grid-area: left-icons;
  display: flex;
  align-items: center;
  grid-area: left-icons;
`

const Img = styled.img`
    width: 24px;
    height: 24px;
`