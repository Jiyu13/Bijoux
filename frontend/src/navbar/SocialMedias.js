import styled from "styled-components";

import instagram_icon from "./icons/instagram.svg"
import facebook_icon from "./icons/square-facebook.svg"
import ticktok_icon from './icons/tiktok.svg'


export function SocialMedias() {
    return (
        <SocialMediasContainer>
            {/*<SocialMediasWrapper>*/}
                <SocialMediaItem>
                    <Link>
                        <Img src={instagram_icon} alt="share on instagram"/>
                    </Link>
                </SocialMediaItem>

                <SocialMediaItem>
                        <Link>
                            <Img src={ticktok_icon} alt="share on ticktok"/>
                        </Link>
                </SocialMediaItem>
                <SocialMediaItem>
                    <Link>
                        <Img src={facebook_icon} alt="share on facebook"/>
                    </Link>
                </SocialMediaItem>
            {/*</SocialMediasWrapper>*/}
        </SocialMediasContainer>
    )
}

const SocialMediasContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin-bottom: 0;
  float: right;

`
const SocialMediasWrapper = styled.div`

`
const SocialMediaItem = styled.li`
  width: 24px;
  margin: 0 4px;
  background-color: transparent;
  border: none;
`

const Link = styled.a`
`
const Img = styled.img`
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`