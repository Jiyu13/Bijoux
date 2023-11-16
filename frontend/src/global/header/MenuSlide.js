import {useContext, useEffect} from "react";
import {UserContext} from "../user-context/UserContext";
import {HeaderText, ModalBody, ModalContainer, ModalHeader} from "../../components/popupStyles";
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

                <ModalContainer>
                    <MenuModalDialog style={{width: ModalDialogWidth}}>
                        <div style={{position: "relative", display: "flex", flexDirection: "column" }}>
                            <ModalBody style={{
                                padding: "0"
                            }}>
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
  //transform: translate(-50%, -50%); // ????
  background-color: white;
  //max-width: calc(100% - 20px);
  
  top: 108px;
  left: 0;
  height: 100%;
  transition: right .25s ease-in-out;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  z-index: 999;
  overflow: hidden;
`

const MenuLinkList = styled.li`
    padding: 1.1rem 0;
    &:hover {
      background-color: rgb(169,169,169, 0.2);
    }
`