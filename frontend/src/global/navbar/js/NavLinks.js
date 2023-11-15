import styled from "styled-components";
import "../css/navbar.css"

import {NavLink} from "react-router-dom";

export function NavLinks() {

    const activeStyles = {
        textDecoration: "none",
        color: "black",
    }

    const normalStyles = {
        textDecoration: "none",
        color: "#525252"
    }

    return (
        <NavLinksContainer>
            <LinkItem>
                <NavLink
                    className="nav"
                    to="/"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Home
                </NavLink>
            </LinkItem>

            <LinkItem>
                <NavLink
                    to="/shop"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Shop All
                </NavLink>
            </LinkItem>

            <LinkItem>
                <NavLink
                    to="/contact"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Contact
                </NavLink>
            </LinkItem>


        </NavLinksContainer>
    )
}

const NavLinksContainer = styled.ul`
  list-style: none;
  display: flex;
  padding-left: 0;
  align-items: center;
`

const LinkItem = styled.li`
      margin: 0 10px;
`