import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../../user-context/UserContext";

export function SidebarOverlay() {

    const {handleOpenFilterSidebar} = useContext(UserContext)


    return (
        <OverlayContainer onClick={handleOpenFilterSidebar}></OverlayContainer>
    )
}

const OverlayContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    transition: 0.5s;
    opacity: 1;
    visibility: visible;
    z-index: 9998;
`