import styled from "styled-components";

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
                    to="/shop/earrings"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Earrings
                </NavLink>
            </LinkItem>
            <LinkItem>
                <NavLink
                    to="/shop/rings"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Rings
                </NavLink>
            </LinkItem>
            <LinkItem>
                <NavLink
                    to="/shop/necklaces"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Necklaces
                </NavLink>
            </LinkItem>
            <LinkItem>
                <NavLink
                    to="/shop/bracelets"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    Bracelets
                </NavLink>
            </LinkItem>
            <LinkItem>
                <NavLink
                    to="/shop/new-arrivals"
                    style={ ({ isActive}) =>
                        isActive ? activeStyles : normalStyles
                    }
                >
                    New Arrivals
                </NavLink>
            </LinkItem>
            <LinkItem>
                <NavLink
                    to="/shop/best-sellers"
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
  gap: 10px;
  justify-content: space-between;
  //flex-wrap: wrap;
`

const LinkItem = styled.li`
  white-space: nowrap;
  
  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  }
`