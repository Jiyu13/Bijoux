import styled from "styled-components";

import {SubFooter} from "./SubFooter";
import {SocialMedia} from "../social-media/js/SocialMedia";

export function Footer() {
    return (
        <SocialMediaContainer>
            <SocialMedia/>
            <SubFooter/>
        </SocialMediaContainer>
    )
}

const SocialMediaContainer = styled.div`
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 65px;
`