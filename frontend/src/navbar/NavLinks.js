import styled from "styled-components";

export function NavLinks() {
    return (
        <NavLinksContainer>
            <LinksWrapper>
                <LinkItem>
                    <Link>Home</Link>
                </LinkItem>
                <LinkItem>
                    <Link href="">Shop</Link>
                </LinkItem>
                <LinkItem>
                    <Link href="">About</Link>
                </LinkItem>
                <LinkItem>
                    <Link href="">Contact</Link>
                </LinkItem>
            </LinksWrapper>
        </NavLinksContainer>
    )
}

const NavLinksContainer = styled.div``
const LinksWrapper = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`
const LinkItem = styled.li`
  box-sizing: border-box;
  margin: 0 12px;
`
const Link = styled.a`
  text-decoration: none;
`