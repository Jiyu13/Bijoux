import {useContext, useEffect} from "react";
import {UserContext} from "../user-context/UserContext";
import {ModalBody, ModalContainer} from "../../components/popupStyles";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

export function MenuSlide() {


    const {isMenuOpen, setMenuOpen, isMobile, isTablet} = useContext(UserContext)

    useEffect(() => {
        if (!isMobile && !isTablet)
        setMenuOpen(false)
    }, [isMobile, isTablet])

    const ModalDialogWidth = isMobile  ? "100%" : "25rem"

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
            isMenuOpen && (isMenuOpen || isTablet) ?

                <ModalContainer style={{zIndex: "1000", top:"108px"}}>
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
                                            Shop
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
  z-index: 999;
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