import styled from "styled-components"
import "../css/footer.css"

import {useContext} from "react";
import {UserContext} from "../../user-context/UserContext";

import {SocialMedias} from "../../social-media/js/SocialMedias";


export function Footer() {

    const { isMobile, isTablet, isSmallLaptop } = useContext(UserContext)

    let marginBottom = isMobile || isTablet || isSmallLaptop ? "80px" : ""


    return (
        <FooterContainer style={{marginBottom: marginBottom}}>

            <LinksSection className="footer-links-section">
                <LinksSectionWrapper>

                    <LinkContainer>
                        <LinkTitle>About Us</LinkTitle>
                        <div>Contact Us</div>
                        <div>My Account</div>
                    </LinkContainer>

                    <LinkContainer>
                        <LinkTitle>Quick Links</LinkTitle>
                        <div>Contact Us</div>
                        <div>My Account</div>
                    </LinkContainer>

                    <LinkContainer>
                        {!isMobile && (<LinkTitle>Join us on</LinkTitle>)}
                        <SocialMedias />
                    </LinkContainer>



                </LinksSectionWrapper>


            </LinksSection>
        </FooterContainer>

    )
}

const FooterContainer = styled.div`
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 6px;
`

// Form section
// const SignupSection = styled.div`
//   display: flex;
//   justify-content: center;
//   padding: 36px;
// `
// const Text = styled.p`
//   margin: 12px 36px;
// `
// const Form = styled.form`
//   display: grid;
//   grid-template-columns: 2fr auto;
//   margin: auto 36px;
//   gap: 12px;
// `
// const Input = styled.input`
//     padding: 12px;
//     //width: 100%;
// `
// const SubmitButton = styled.button`
//     //margin: auto 12px;
//     padding: 12px 24px;
//   white-space: nowrap;
// `

// Link Section

const LinksSection = styled.div`
    margin: 0 auto;
    padding: 36px 0;
`

const LinksSectionWrapper = styled.div`
    display: grid;   
    justify-content: center;
    grid-template-columns: repeat(3, 1fr);

    //  column-rule-color: #273c75;
`
const LinkContainer = styled.div`
    margin: 0 auto;
`
const LinkTitle = styled.p`
    font-size: 1.3rem;
    margin-bottom: 1rem;
    margin-top: 0;
    white-space: nowrap;
`