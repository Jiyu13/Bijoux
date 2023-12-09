import styled from "styled-components";
import "../navbar/css/navbar.css"

import {NavLink} from "react-router-dom";

export function HeaderCollectionMenuLinks() {

    const activeStyles = {
        textDecoration: "none",
        color: "black",
    }

    const normalStyles = {
        textDecoration: "none",
        color: "#525252"
    }

    return (
        <MenuContainer>
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


        </MenuContainer>
    )
}

const MenuContainer = styled.ul`
  list-style: none;
  display: flex;
  padding-left: 0;
  align-items: center;
  margin: 0;
`

const LinkItem = styled.li`
      margin: 0 10px;
`