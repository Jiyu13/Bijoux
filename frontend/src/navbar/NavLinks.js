import styled from "styled-components";
import "./css/navbar.css"

import {NavLink} from "react-router-dom";

export function NavLinks() {

    const activeStyles = {
        textDecoration: "none",
        color: "black",
    }

    const normalStyles = {
        textDecoration: "none",
        color: "black"
    }

    return (
        <NavLinksContainer className="links-container">
            <NavLink
                className="nav"
                to="/home"
                exact
                style={ ({ isActive}) =>
                    isActive ? activeStyles : normalStyles
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/shop-all"
                exact
                style={ ({ isActive}) =>
                    isActive ? activeStyles : normalStyles
                }
            >
                Shop All
            </NavLink>

            <NavLink
                to="/about"
                exact
                style={ ({ isActive}) =>
                    isActive ? activeStyles : normalStyles
                }
            >
                About
            </NavLink>

            <NavLink
                to="/contact"
                exact
                style={ ({ isActive}) =>
                    isActive ? activeStyles : normalStyles
                }
            >
                Contact
            </NavLink>
        </NavLinksContainer>
    )
}

const NavLinksContainer = styled.ul`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px;
  list-style: none;
  justify-content: center;
  align-items: center;
  
  padding: 0;
  margin: 0;

`