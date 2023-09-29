import styled from "styled-components";
import "./css/navbar.css"

import {NavLinks} from "./NavLinks"
import {SocialMedias} from "../social-media/js/SocialMedias";
import {useContext} from "react";
import {UserContext} from "../user-context/UserContext";
import {SearchBar} from "../search-bar/SearchBar";
import {Accessibility} from "../../accessibility/Accessibility";
import {Link} from "react-router-dom";

export function NavBar() {

    const {isMobile, isTablet, isSmallLaptop, isLargeScreen} = useContext(UserContext)

    const marginRight = isMobile || isTablet ? "0px" : "32px"

    return (
        <>
            <NavBarContainer className="navbar">
                <LogoSection>
                    <Link to="/" >
                        <Logo>Company Logo</Logo>
                    </Link>

                </LogoSection>

                {isMobile || isTablet || isSmallLaptop ? "" :
                        <LinksSection style={{marginRight: marginRight}}>
                            <NavLinks />
                        </LinksSection>
                }

                <SearchBarSection style={{marginRight: marginRight}}>
                    <SearchBar />
                </SearchBarSection>

                {isMobile || isTablet || isSmallLaptop  ? "" :
                    <AccountSection>
                        <Accessibility />
                    </AccountSection>
                }
            </NavBarContainer>
        </>
    )
}

const NavBarContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 90px;
  display: grid;
  align-items: center;
  box-sizing: border-box;
  top: 0;
  z-index: 9999;
  box-shadow: rgba(0, 0, 0, 0.04) 0px -1px 2px, rgba(0, 0, 0, 0.04) 0px 1px 2px, rgba(0, 0, 0, 0.04) 0px 3px 4px;
  background-color: white;
`
const LogoSection = styled.div`
  margin: 0 auto;
`
const Logo = styled.div`
  //font-size: 2rem;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
`

const LinksSection = styled.div`
  //margin: 0 32px;
`

const SearchBarSection = styled.div`
  //margin: 0 32px;
`
const AccountSection = styled.div`
  margin: 0 32px
`

// export function NavBar() {
//
//     const {isMobile, isTablet} = useContext(UserContext)
//     // console.log(isMobile, isTablet)
//
//     return (
//         <>
//
//             {isMobile || isTablet ? "" :
//                     <NavBarContainer>
//                         <LogoSection>
//                             <Logo>Company Logo</Logo>
//                         </LogoSection>
//                         <LinksSection>
//                             <NavLinks />
//                         </LinksSection>
//                         {/*<SocialMediasSection>*/}
//                         {/*    <SocialMedias />*/}
//                         {/*</SocialMediasSection>*/}
//                     </NavBarContainer>
//
//             }
//         </>
//     )
// }
//
// const NavBarContainer = styled.div`
//   display: inline-grid;
//   //grid-template-columns: min-content auto auto;
//   grid-template-columns: min-content auto;
//   white-space: nowrap;
//   align-items: center;
//   width: 100%;
//   margin: 12px 0 24px;
// `
// const LogoSection = styled.div`
//   margin-right: 12px;
// `
// const Logo = styled.div`
//   font-size: 2rem;
//   font-family: "Roboto", sans-serif;
// `
//
// const LinksSection = styled.div``
const SocialMediasSection = styled.div``