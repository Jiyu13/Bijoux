import styled from "styled-components";
import "./header.css"

import {Link} from "react-router-dom";
import {HeaderMenuLinks} from "./HeaderMenuLinks";
import {Accessibility} from "../../accessibility/Accessibility";
import {useContext} from "react";
import {UserContext} from "../user-context/UserContext";
import {HeaderSlideMenu} from "./HeaderSlideMenu";

export function Header() {

    const {isMobile, isTablet} = useContext(UserContext)

    return (
        <HeaderContainer className="heading-container">
            <div className="heading-wrapper" style={{  margin: "0 auto"}}>
                <HeaderNav>
                    {/* ============================== header menu section ============================== */}
                    {isMobile || isTablet ? <HeaderSlideMenu />: ""}

                    {/* ============================== logo section ==============================*/}
                    <LogoSection>
                        <Link to="/" >
                            <div style={{whiteSpace: "nowrap"}}>CompanyLogo</div>
                        </Link>
                    </LogoSection>
                    <Accessibility/>
                </HeaderNav>

                {/* ============================== header menu links section ==============================*/}
                {isMobile || isTablet ? " " : <HeaderMenuLinks />}
            </div>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
  box-shadow: rgba(0, 0, 0, 0.04) 0px -1px 2px, rgba(0, 0, 0, 0.04) 0px 1px 2px, rgba(0, 0, 0, 0.04) 0px 3px 4px;
  position: fixed;
  z-index: 1000;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  box-sizing: border-box;
`

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-between;
`

const LogoSection = styled.div`
  margin: auto 0;
  width: 133px;
  height: 60px;
  background-color: antiquewhite;
`