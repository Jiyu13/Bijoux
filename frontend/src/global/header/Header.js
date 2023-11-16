import styled from "styled-components";
import "./header.css"

import {Link} from "react-router-dom";
import {NavLinks} from "../navbar/js/NavLinks";
import {Accessibility} from "../../accessibility/Accessibility";
import {useContext} from "react";
import {UserContext} from "../user-context/UserContext";
import {HeaderLinkMenu} from "./HeaderLinkMenu";

export function Header() {

    const {isMobile, isTablet} = useContext(UserContext)

    return (
        <HeaderContainer className="heading">
            {/* ============================== header menu section ============================== */}
            {isMobile || isTablet ? <HeaderLinkMenu />: ""}

            {/* ============================== logo section ==============================*/}
            <LogoSection>
                <Link to="/" >
                    <div style={{whiteSpace: "nowrap"}}>CompanyLogo</div>
                </Link>
            </LogoSection>

            {/* ============================== navlinks section ==============================*/}
            {isMobile || isTablet ?
                " "
                :
                 <LinksSection>
                    <NavLinks />
                </LinksSection>
            }


            {/* ============================== accessibility section ============================== */}
            <Accessibility />
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
  display: grid;
  box-shadow: rgba(0, 0, 0, 0.04) 0px -1px 2px, rgba(0, 0, 0, 0.04) 0px 1px 2px, rgba(0, 0, 0, 0.04) 0px 3px 4px;
  position: fixed;
  z-index: 999999;
  height: 68px;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
`

const LogoSection = styled.div`
  grid-area: logo;
  margin: auto 0;
`

const LinksSection = styled.div`
  margin: auto 0;
  grid-area: navigation;
  display: flex;
  align-items: center;
  justify-content: center;
`