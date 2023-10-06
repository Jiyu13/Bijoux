import styled from "styled-components";
import "../css/navbar.css"

import {NavLinks} from "./NavLinks"
import {SocialMediasBackup} from "../../social-media/js/SocialMediasBackup";
import {useContext} from "react";
import {UserContext} from "../../user-context/UserContext";
import {SearchBar} from "../../search-bar/SearchBar";
import {Accessibility} from "../../../accessibility/Accessibility";
import {Link} from "react-router-dom";

export function NavBar() {

    const {isMobile, isTablet, isSmallLaptop, isLargeScreen} = useContext(UserContext)

    const marginRight = isMobile || isTablet ? "0px" : "32px"

    return (
        <>
            {/*<NavBarContainer className="navbar">*/}
            {/*    <LogoSection>*/}
            {/*        <Link to="/" >*/}
            {/*            <Logo>Company Logo</Logo>*/}
            {/*        </Link>*/}

            {/*    </LogoSection>*/}

            {/*    {isMobile || isTablet || isSmallLaptop ? "" :*/}
            {/*            <LinksSection style={{marginRight: marginRight}}>*/}
            {/*                <NavLinks />*/}
            {/*            </LinksSection>*/}
            {/*    }*/}

            {/*    <SearchBarSection style={{marginRight: marginRight}}>*/}
            {/*        <SearchBar />*/}
            {/*    </SearchBarSection>*/}

            {/*    {isMobile || isTablet || isSmallLaptop  ? "" :*/}
            {/*        <AccountSection>*/}
            {/*            <Accessibility />*/}
            {/*        </AccountSection>*/}
            {/*    }*/}
            {/*</NavBarContainer>*/}

            <NavBarContainer>
                <LogoSection>
                    <Link to="/" >
                        <Logo>CompanyLogo</Logo>
                    </Link>
                </LogoSection>

                {isMobile || isTablet ? "" :(
                    <LinksSection>
                        <NavLinks />
                        <Accessibility />
                    </LinksSection>
                )}


            </NavBarContainer>
        </>
    )
}

const NavBarContainer = styled.div`
  height: 60px;
  box-sizing: border-box;
  top: 0;
  z-index: 9999;
  position: sticky;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.04) 0px -1px 2px, rgba(0, 0, 0, 0.04) 0px 1px 2px, rgba(0, 0, 0, 0.04) 0px 3px 4px;
  
  display: flex;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: -1px
`
const LogoSection = styled.div`
  //margin: 0 auto;
    width: 138px;

`
const Logo = styled.div`
  //font-size: 2rem;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
`

const LinksSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const SearchBarSection = styled.div`
`
const AccountSection = styled.div`
    float: right;
`
const SocialMediasSection = styled.div``

// const NavBarContainer = styled.div`
//   width: 100%;
//   margin: 0 auto;
//   height: 90px;
//   display: grid;
//   align-items: center;
//   box-sizing: border-box;
//   top: 0;
//   z-index: 9999;
//   box-shadow: rgba(0, 0, 0, 0.04) 0px -1px 2px, rgba(0, 0, 0, 0.04) 0px 1px 2px, rgba(0, 0, 0, 0.04) 0px 3px 4px;
//   background-color: white;
// `
// const LogoSection = styled.div`
//   margin: 0 auto;
// `
// const Logo = styled.div`
//   //font-size: 2rem;
//   font-family: "Roboto", sans-serif;
//   white-space: nowrap;
// `
//
// const LinksSection = styled.div`
//   //margin: 0 32px;
// `
//
// const SearchBarSection = styled.div`
//   //margin: 0 32px;
// `
// const AccountSection = styled.div`
//   margin: 0 32px
// `
// const SocialMediasSection = styled.div``