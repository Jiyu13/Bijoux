import styled from "styled-components"
import "../../css/footer.css"

import {useContext} from "react";
import {UserContext} from "../../../user-context/UserContext";

import instagram_icon from "../../../social-media/icons/instagram.svg";
import ticktok_icon from "../../../social-media/icons/tiktok.svg";
import facebook_icon from "../../../social-media/icons/square-facebook.svg";


export function FooterBackup() {

    const { isMobile, isTablet, isSmallLaptop } = useContext(UserContext)

    let marginBottom = isMobile || isTablet || isSmallLaptop ? "80px" : ""

    const flatTo = isMobile ? "right" : ""


    return (
        <FooterContainer style={{marginBottom: marginBottom}}>

            <LinksSection className="footer-links-section">
                <LinksSectionWrapper
                    className="footer-links-wrapper"
                >

                    <LinkContainer >
                        <LinkTitle>Contact Us</LinkTitle>
                        <hr/>
                        <div style={{margin: "12px 0"}}>12345@gmail.com</div>
                        <div style={{display: "flex", gap: "12px"}}>
                            {/*style={{margin: "1rem 1rem 1rem 0"}}*/}
                            <img src={instagram_icon} alt="instagramicon" style={{width: "20px"}}/>
                            <img src={ticktok_icon} alt="ticktok icon" style={{width: "20px"}}/>
                            <img src={facebook_icon} alt="facebook icon" style={{width: "20px"}}/>
                        </div>

                    </LinkContainer>

                    <LinkContainer>
                        <LinkTitle>Quick Links</LinkTitle>
                        <hr/>
                        <div>Contact Us</div>
                        <div>Track Order</div>
                        <div>My Account</div>
                        <div>Track Order</div>
                    </LinkContainer>

                    <LinkContainer>
                        <LinkTitle>Subscribe</LinkTitle>
                        <hr/>
                        <p>Get updates from us!</p>

                        <form>
                            <input
                                type="text"
                                defaultValue="Email address"
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    </LinkContainer>



                </LinksSectionWrapper>


            </LinksSection>
        </FooterContainer>

    )
}

const FooterContainer = styled.div`
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 6px;
    background-color: #282c34;
    color: #d0d1d5;
`

const LinksSection = styled.div`
    margin: 0 auto;
    padding: 36px 0;
`

const LinksSectionWrapper = styled.div`

`
const LinkContainer = styled.div`
    margin: 1rem auto;
    font-size: 1rem;
    width: 100%;
`
const LinkTitle = styled.p`
    margin-bottom: 1rem;
    margin-top: 0;
    white-space: nowrap;
`