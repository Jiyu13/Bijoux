import styled from "styled-components";
import {NavLink} from "react-router-dom";

export function NavLinks() {
    return (
        <NavLinksContainer>
                <LinkItem>
                    <NavLink href="/">Home</NavLink>
                </LinkItem>
                {/*<LinkItem>*/}
                {/*    <Link href="#">Shop</Link>*/}
                {/*</LinkItem>*/}
                <LinkItem>
                    <NavLink href="/">About</NavLink>
                </LinkItem>
                <LinkItem>
                    <NavLink href="/">Contact</NavLink>
                </LinkItem>
        </NavLinksContainer>
    )
}

const NavLinksContainer = styled.ul`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  list-style: none;
  justify-content: center;
  align-items: center;
  
  padding: 0;
  margin: 0;
`
const LinkItem = styled.li`
  box-sizing: border-box;
  margin: 0;
  padding: 8px 4px;
  border-radius: 8px;
  transition: all .2s ease-in-out;
  text-align: center;
  &:hover {
    background-color: rgb(169,169,169, 0.2);
    
  }
`
const Link = styled.a`
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
`