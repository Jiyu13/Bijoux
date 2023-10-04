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
                    // exact
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
  align-items: center;
  justify-content: space-between;
`

const LinkItem = styled.li`
      padding-left: 32px;
`

// export function NavLinks() {
//
//     const activeStyles = {
//         textDecoration: "none",
//         color: "black",
//     }
//
//     const normalStyles = {
//         textDecoration: "none",
//         color: "black"
//     }
//
//     return (
//         <NavLinksContainer className="links-container">
//             <NavLink
//                 className="nav"
//                 to="/"
//                 // exact
//                 style={ ({ isActive}) =>
//                     isActive ? activeStyles : normalStyles
//                 }
//             >
//                 Home
//             </NavLink>
//
//             <NavLink
//                 to="/shop"
//                 // exact
//                 style={ ({ isActive}) =>
//                     isActive ? activeStyles : normalStyles
//                 }
//             >
//                 Shop All
//             </NavLink>
//
//             {/*<NavLink*/}
//             {/*    to="/about"*/}
//             {/*    // exact*/}
//             {/*    style={ ({ isActive}) =>*/}
//             {/*        isActive ? activeStyles : normalStyles*/}
//             {/*    }*/}
//             {/*>*/}
//             {/*    About*/}
//             {/*</NavLink>*/}
//
//             <NavLink
//                 to="/contact"
//                 // exact
//                 style={ ({ isActive}) =>
//                     isActive ? activeStyles : normalStyles
//                 }
//             >
//                 Contact
//             </NavLink>
//         </NavLinksContainer>
//     )
// }
//
// const NavLinksContainer = styled.ul`
//   height: 100%;
//   display: flex;
//   //grid-template-columns: repeat(4, 1fr);
//   grid-gap: 8px;
//   list-style: none;
//   justify-content: center;
//   align-items: center;
//
//   padding: 0;
//   margin: 0;
//
// `