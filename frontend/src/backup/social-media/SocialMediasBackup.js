import styled from "styled-components";
import "../../global/social-media/css/social-media.css"

import instagram_icon from "../../global/social-media/icons/instagram.svg"
import facebook_icon from "../../global/social-media/icons/square-facebook.svg"
import ticktok_icon from '../../global/social-media/icons/tiktok.svg'
import {UserContext} from "../../global/user-context/UserContext";


export function SocialMediasBackup() {


    return (
        <SocialMediaIcons className="icons-container">

           <Icon src={instagram_icon} alt="instagramicon"/>
           <Icon src={ticktok_icon} alt="ticktok icon"/>
            <Icon src={facebook_icon} alt="facebook icon"/>

        </SocialMediaIcons>
    )
}



const SocialMediaIcons = styled.div`
    display: flex;
    padding: 0;
`


const Icon = styled.img`
    width: 24px;
    margin-right: 16px;
    
  
    &:last-child {
      margin-right: 0;
    }
    
`