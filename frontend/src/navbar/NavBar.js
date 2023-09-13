import styled from "styled-components";

import {NavLinks} from "./NavLinks"
import {SocialMedias} from "./SocialMedias";

export function NavBar() {

    return (
        <NavBarContainer>
            <LogoSection>
                <Logo>ZetaMaitia Studios</Logo>
            </LogoSection>
            <LinksSection>
                <NavLinks />
            </LinksSection>
            <SocialMediasSection>
                <SocialMedias />
            </SocialMediasSection>
        </NavBarContainer>
    )
}

const NavBarContainer = styled.div`
  display: inline-grid;
  grid-template-columns: min-content auto auto;
  white-space: nowrap;
  align-items: center;
  width: 100%;
  margin: 12px 0;
`
const LogoSection = styled.div``
const Logo = styled.div`
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
`

const LinksSection = styled.div``
const SocialMediasSection = styled.div`
`