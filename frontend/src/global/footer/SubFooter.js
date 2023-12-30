import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../user-context/UserContext";

export function SubFooter() {
    const {isMobile, isTablet} = useContext(UserContext)

    return (
        <SubFooterContainer
            // style={{margin: "64px auto 0"}}
        >
            {/*//isMobile || isTablet ?  "0 auto 32px" : */}
            <SubFooterNav>
                <NavWrapper>
                    <NavLinkItem>
                        <NavLink href="/contact">Contact</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="">Shipping & Returns</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="">Newsletter</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="/shop/earrings">Earrings</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="/shop/rings">Rings</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="/shop/necklaces">Necklaces</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="/shop/bracelets">Bracelets</NavLink>
                    </NavLinkItem>
                </NavWrapper>
            </SubFooterNav>

        </SubFooterContainer>
    )
}

const SubFooterContainer = styled.div`
  text-align: center;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 2rem;
`

const SubFooterNav = styled.nav`
  padding: 0 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const NavWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  gap: 2rem;
  justify-content: center;
`

const NavLinkItem = styled.li``

const NavLink = styled.a`
  text-decoration: none;
  color: #c1c1c1;
  white-space: nowrap;
`