import {useContext} from "react";
import {UserContext} from "../../user-context/UserContext";
import shopping_cart_black_24 from "../icons/shopping_cart_black_24dp.svg";
import search_black_24dp from "../../search-bar/icons/search_black_24dp.svg";
import home_black_24 from "../icons/home_black_24dp.svg"
import account_circle_black_24 from "../icons/account_circle_black_24dp.svg"
import storefront_black_24dp from "../icons/storefront_black_24dp.svg"
import styled from "styled-components";

export function MobileNavBar() {

    const {isMobile, isTablet, isSmallLaptop, isLargeScreen} = useContext(UserContext)

    return (
        <>

                <NavBarContainer>
                    <ContainerItem href="/">
                        <Img src={home_black_24} alt="homepage icon"/>
                        <Text>Home</Text>
                    </ContainerItem>
                    <ContainerItem href="/shop">
                        <Img src={storefront_black_24dp} alt="shop icon"/>
                        <Text>Shop</Text>
                    </ContainerItem>

                    <ContainerItem href="#">
                        <Img src={search_black_24dp} alt="search icon"/>
                        <Text>Search</Text>
                    </ContainerItem>

                    <ContainerItem href="#">
                        <Img src={shopping_cart_black_24} alt="shopping cart icon"/>
                        <Text>Cart</Text>
                    </ContainerItem>

                    <ContainerItem href="#">
                        <Img src={account_circle_black_24} alt="account icon"/>
                        <Text>Me</Text>
                    </ContainerItem>

                </NavBarContainer>
        </>

    )
}

const NavBarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: auto;
  background-color: whitesmoke;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
`
const ContainerItem = styled.a`
  padding: 8px;
  margin: auto auto 12px;
  display: flex;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
  

`
const Img = styled.img`
  width: 28px;
  margin: 0 auto;
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`

const Text = styled.div`
  font-size: 0.7rem;
`