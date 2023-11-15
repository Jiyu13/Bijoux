import menu_icon from "./icons/menu_icon.svg"
import styled from "styled-components";

export function HeaderLinkMenu() {
    return (
        <MenuContainer>
            <Img src={menu_icon} alt='menu_icon'/>
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
    width: 28px;
    height: 28px;
`