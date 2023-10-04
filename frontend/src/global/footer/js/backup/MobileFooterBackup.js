import {useContext} from "react";
import {UserContext} from "../../../user-context/UserContext";

export function MobileFooterBackup() {

    const { isMobile, isTablet, isSmallLaptop, isLargeScreen, carousels} = useContext(UserContext)

    return (
        <>
            {isMobile && (
                <FooterContainer>
                    <LinksSection>
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
                                <LinkTitle>Join us on</LinkTitle>
                                <div>Instagram</div>
                                <div>Ticktok</div>
                                <div>youtube</div>
                            </LinkContainer>
                        </LinksSectionWrapper>


                    </LinksSection>
                </FooterContainer>
                    )}
        </>
    )
}