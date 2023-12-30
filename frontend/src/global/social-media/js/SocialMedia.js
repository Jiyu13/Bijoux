import styled from "styled-components";

import instagram_icon from "../icons/instagram.svg"
import facebook_icon from "../icons/square-facebook.svg"
import ticktok_icon from '../icons/tiktok.svg'

export function SocialMedia() {
    return (
        <SocialMediaWrapper>
            {/*<SocialMediaHeader>Follow Us On Social Media</SocialMediaHeader>*/}
            <SocialMediaIcons>
                <Link href="">
                    <Image src={instagram_icon} alt="instagramicon"/>
                </Link>

                <Link href="">
                    <Image src={facebook_icon} alt="facebook icon"/>
                </Link>

                <Link href="">
                    <Image src={ticktok_icon} alt="ticktok icon"/>
                </Link>

            </SocialMediaIcons>
        </SocialMediaWrapper>
    )
}

const SocialMediaWrapper = styled.footer`
    width: 85%;
    padding: 0 15px;
    margin: 32px auto 32px;
    //border-top: 1px solid rgb(234, 234, 234);
    //border-bottom: 1px solid rgb(234, 234, 234);
`

// const SocialMediaHeader = styled.h2`
//   color: #c1c1c1;
//   font-size: 1rem;
//   margin: 32px 0;
// `
const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
`
const Link = styled.a`
  
`
const Image = styled.img`
  width: 20px;
`

