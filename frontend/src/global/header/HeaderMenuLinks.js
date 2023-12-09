import styled from "styled-components";
import "../navbar/css/navbar.css"

import {NavLink} from "react-router-dom";

export function HeaderMenuLinks() {

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
                    to="/earrings"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Earrings
                </NavLink>
            </LinkItem>
            <LinkItem>
                <NavLink
                    to="/rings"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Rings
                </NavLink>
            </LinkItem>
            <LinkItem>
                <NavLink
                    to="/necklaces"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Necklaces
                </NavLink>
            </LinkItem>
            <LinkItem>
                <NavLink
                    to="/bracelets"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Bracelets
                </NavLink>
            </LinkItem>
            <LinkItem>
                <NavLink
                    to="/new-arrivals"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    New Arrivals
                </NavLink>
            </LinkItem>
            <LinkItem>
                <NavLink
                    to="/best-sellers"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Best Sellers
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
  height: 40px;
`

const LinkItem = styled.li`
  margin: 0 10px;
  white-space: nowrap;
  
  &:first-child {
    margin-left: 0;
  }
  
  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  }
`