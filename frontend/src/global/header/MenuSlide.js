import {useContext, useEffect} from "react";
import {UserContext} from "../user-context/UserContext";
import {ModalBody, ModalContainer} from "../../components/popupStyles";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {OverlayBackground} from "../../cart/js/OverlayBackground";

export function MenuSlide() {


    const {isMenuOpen, setMenuOpen, isMobile, isTablet, isSmallLaptop} = useContext(UserContext)

    useEffect(() => {
        if (!isMobile && !isTablet && !isSmallLaptop)
        setMenuOpen(false)
    }, [isMobile, isTablet, isSmallLaptop])

    const ModalDialogWidth = isMobile  ? "100%" : "420px"

    const activeStyles = {
        textDecoration: "none",
        color: "black",
        padding: "1.8rem"
    }

    const normalStyles = {
        padding: "1.8rem",
        textDecoration: "none",
        color: "#525252"
    }

    function handleCloseMenu() {
        setMenuOpen(false)
    }

    return(
        <>

        {
            isMenuOpen && (isMobile || isTablet || isSmallLaptop) ?

                <ModalContainer style={{zIndex: "1100", top:"100px"}}>
                    <MenuModalDialog style={{width: ModalDialogWidth}}>
                        <div style={{position: "relative", display: "flex", flexDirection: "column" }}>
                            <ModalBody style={{padding: "0"}}>
                                <ul style={{listStyle: "none", margin: "0", padding: 0}}>
                                    <MenuLinkList style={{marginBottom: "0.2rem"}}>
                                        <NavLink
                                            className="nav"
                                            to="/"
                                            style={
                                                ({ isActive}) =>
                                                isActive ? activeStyles : normalStyles
                                            }
                                            onClick={handleCloseMenu}
                                        >
                                            Home
                                        </NavLink>
                                    </MenuLinkList>

                                    <MenuLinkList>
                                        <NavLink
                                            to="/shop"
                                            style={
                                                ({ isActive}) =>
                                                isActive ? activeStyles : normalStyles
                                            }
                                            onClick={handleCloseMenu}
                                        >
                                            Shop All
                                        </NavLink>
                                    </MenuLinkList>

                                    <MenuLinkList>
                                        <NavLink
                                            to="/shop/earrings"
                                            style={ ({ isActive}) =>
                                                isActive ? activeStyles : normalStyles
                                            }
                                        >
                                            Earrings
                                        </NavLink>
                                    </MenuLinkList>
                                    <MenuLinkList>
                                        <NavLink
                                            to="/shop/rings"
                                            style={ ({ isActive}) =>
                                                isActive ? activeStyles : normalStyles
                                            }
                                        >
                                            Rings
                                        </NavLink>
                                    </MenuLinkList>
                                    <MenuLinkList>
                                        <NavLink
                                            to="/shop/necklaces"
                                            style={ ({ isActive}) =>
                                                isActive ? activeStyles : normalStyles
                                            }
                                        >
                                            Necklaces
                                        </NavLink>
                                    </MenuLinkList>
                                    <MenuLinkList>
                                        <NavLink
                                            to="/shop/bracelets"
                                            style={ ({ isActive}) =>
                                                isActive ? activeStyles : normalStyles
                                            }
                                        >
                                            Bracelets
                                        </NavLink>
                                    </MenuLinkList>
                                    <MenuLinkList>
                                        <NavLink
                                            to="/shop/new-arrivals"
                                            style={ ({ isActive}) =>
                                                isActive ? activeStyles : normalStyles
                                            }
                                        >
                                            New Arrivals
                                        </NavLink>
                                    </MenuLinkList>
                                    <MenuLinkList>
                                        <NavLink
                                            to="/shop/best-sellers"
                                            style={ ({ isActive}) =>
                                                isActive ? activeStyles : normalStyles
                                            }
                                        >
                                            Best Sellers
                                        </NavLink>
                                    </MenuLinkList>


                                    <MenuLinkList>
                                        <NavLink
                                            to="/contact"
                                            style={
                                                ({ isActive}) =>
                                                isActive ? activeStyles : normalStyles
                                            }
                                            onClick={handleCloseMenu}
                                        >
                                            Contact
                                        </NavLink>
                                    </MenuLinkList>
                                </ul>
                            </ModalBody>

                        </div>
                    </MenuModalDialog>
                    <OverlayBackground action="side-menu" setAction={setMenuOpen}/>

                </ModalContainer>

                :

                ""
        }
        </>
    )
}

const MenuModalDialog = styled.div`
  box-sizing: border-box;
  position: fixed;
  background-color: white;

  left: 0;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  //z-index: 999;
  overflow: hidden;
  
  // slide the popup from left to right
  transform: translateX(-100%);
  animation: slideRight 0.3s ease forwards;
  
  @keyframes slideRight {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(0%);
      }
  }
`

const MenuLinkList = styled.li`
    padding: 1.1rem 0;
    &:hover {
      background-color: rgb(169,169,169, 0.2);
    }
`