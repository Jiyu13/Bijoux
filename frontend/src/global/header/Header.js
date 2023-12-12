import styled from "styled-components";
import "./header.css"

import {Link} from "react-router-dom";
import {HeaderMenuLinks} from "./HeaderMenuLinks";
import {Accessibility} from "../../accessibility/Accessibility";
import {useContext} from "react";
import {UserContext} from "../user-context/UserContext";
import {HeaderSlideMenu} from "./HeaderSlideMenu";

export function Header() {

    const {isMobile, isTablet, isSmallLaptop} = useContext(UserContext)

    return (
        <HeaderContainer className="heading-container">
            <div className="heading-wrapper" style={{  margin: "0 auto", boxSizing: "border-box", maxWidth: "1440px"}}>
                {/*<HeaderNav>*/}

                    {/* ============================== logo section ==============================*/}
                    <LogoSection>
                        {/* ============================== header menu section ============================== */}
                        <div style={{display: "flex"}}>
                            {isMobile || isTablet || isSmallLaptop? <HeaderSlideMenu />: ""}

                            <Link to="/" >
                                <div style={{whiteSpace: "nowrap"}}>CompanyLogo</div>
                            </Link>
                        </div>

                        <Accessibility/>
                    </LogoSection>

                {/*</HeaderNav>*/}

                {/* ============================== header menu links section ==============================*/}
                {isMobile || isTablet  || isSmallLaptop? " " : <HeaderMenuLinks />}
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
  margin: 0 auto;
`

const LogoSection = styled.div`
  margin: auto 0;
  height: 60px;
  background-color: antiquewhite;
  display: flex;
  justify-content: space-between;
`