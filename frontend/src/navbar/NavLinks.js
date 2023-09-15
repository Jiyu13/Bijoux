import styled from "styled-components";

export function NavLinks() {
    return (
        <NavLinksContainer>
                <LinkItem>
                    <Link href="/">Home</Link>
                </LinkItem>
                {/*<LinkItem>*/}
                {/*    <Link href="#">Shop</Link>*/}
                {/*</LinkItem>*/}
                <LinkItem>
                    <Link href="#">About</Link>
                </LinkItem>
                <LinkItem>
                    <Link href="#">Contact</Link>
                </LinkItem>
        </NavLinksContainer>
    )
}

const NavLinksContainer = styled.ul`
  display: flex;
  list-style: none;
  justify-content: flex-end;
  padding: 0;
  margin-bottom: 0;
`
const LinkItem = styled.li`
  box-sizing: border-box;
  margin: 0 8px;
  padding: 8px 4px;
  border-radius: 8px;
  transition: all .2s ease-in-out;
  &:hover {
    background-color: #95afc0;
    
  }
`
const Link = styled.a`
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
`