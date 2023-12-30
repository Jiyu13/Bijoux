import styled from "styled-components";

import {SubFooter} from "./SubFooter";
import {SocialMedia} from "../social-media/js/SocialMedia";

export function Footer() {
    return (
        <SocialMediaContainer>

            <SubFooter/>
            <SocialMedia/>
        </SocialMediaContainer>
    )
}

const SocialMediaContainer = styled.div`
  box-sizing: border-box;
  text-align: center;
  //margin-bottom: 65px;
  border-top: 1px solid rgb(234, 234, 234);
  margin: 3rem auto 32px;
`