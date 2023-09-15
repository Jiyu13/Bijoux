import styled from "styled-components";

import {NavLinks} from "./NavLinks"
import {SocialMedias} from "./SocialMedias";
import {useContext} from "react";
import {UserContext} from "../user-context/UserContext";

export function NavBar() {

    const {isMobile, isTablet} = useContext(UserContext)
    // console.log(isMobile, isTablet)

    return (
        <>

            {isMobile || isTablet ? "" :
                    <NavBarContainer>
                        <LogoSection>
                            <Logo>Company Logo</Logo>
                        </LogoSection>
                        <LinksSection>
                            <NavLinks />
                        </LinksSection>
                        {/*<SocialMediasSection>*/}
                        {/*    <SocialMedias />*/}
                        {/*</SocialMediasSection>*/}
                    </NavBarContainer>

            }
        </>
    )
}

const NavBarContainer = styled.div`
  display: inline-grid;
  //grid-template-columns: min-content auto auto;
  grid-template-columns: min-content auto;
  white-space: nowrap;
  align-items: center;
  width: 100%;
  margin: 12px 0 24px;
`
const LogoSection = styled.div`
  margin-right: 12px;
`
const Logo = styled.div`
  font-size: 2rem;
  font-family: "Roboto", sans-serif;
`

const LinksSection = styled.div``
const SocialMediasSection = styled.div``