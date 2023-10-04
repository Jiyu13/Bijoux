import styled from "styled-components";

export function SubFooter() {
    return (
        <SubFooterContainer>
            <SubFooterNav>
                <NavWrapper>
                    <NavLinkItem>
                        <NavLink href="">Contact</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="">Shipping & Returns</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="">Newsletter</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="">Earrings</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="">Rings</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="">Necklaces</NavLink>
                    </NavLinkItem>
                    <NavLinkItem>
                        <NavLink href="">Bracelets</NavLink>
                    </NavLinkItem>
                </NavWrapper>
            </SubFooterNav>

        </SubFooterContainer>
    )
}

const SubFooterContainer = styled.div`
  text-align: center;
  margin: 32px 0;
  font-size: 12px;
  width: 100%;
`

const SubFooterNav = styled.nav`
  padding: 0 30px;
  display: flex;
  flex-wrap: wrap;
`

const NavWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  display: flex;
  gap: 2rem;
`

const NavLinkItem = styled.li``

const NavLink = styled.a`
  text-decoration: none;
  color: #c1c1c1;
  white-space: nowrap;
`