import styled from "styled-components";

import instagram_icon from "./icons/instagram.svg"
import facebook_icon from "./icons/square-facebook.svg"
import ticktok_icon from './icons/tiktok.svg'


export function SocialMedias() {
    return (
        <SocialMediasContainer>
            <SocialMediasWrapper>
                <SocialMediaButton>
                    <Link>
                        <Img src={instagram_icon} alt="share on instagram"/>
                    </Link>
                </SocialMediaButton>

                <SocialMediaButton>
                        <Link>
                            <Img src={ticktok_icon} alt="share on ticktok"/>
                        </Link>
                </SocialMediaButton>
                <SocialMediaButton>
                    <Link>
                        <Img src={facebook_icon} alt="share on facebook"/>
                    </Link>
                </SocialMediaButton>
            </SocialMediasWrapper>
        </SocialMediasContainer>
    )
}

const SocialMediasContainer = styled.div`
    width: 100%;
`
const SocialMediasWrapper = styled.div`
  display: flex;
  justify-content: end; 
`
const SocialMediaButton = styled.button`
  width: 40px;
  margin: 0 4px;
  background-color: transparent;
  border: none;
`

const Link = styled.a``
const Img = styled.img``