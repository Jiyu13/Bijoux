import styled from "styled-components";
import {
    BodyText,
    HeaderText,
    ModalBody,
    ModalContainer,
    ModalContent,
    ModalDialog, ModalFooter,
    ModalHeader
} from "../../components/popupStyles";
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";

export function DeleteAddressConfirmation({handleDeleteAddress, setDeletePopup}) {

    const {isMobile, isTablet} = useContext(UserContext)

    function handleNo(){
        setDeletePopup(false)
    }

    return (
        <ModalContainer>

            <DeleteAddressModalDialog style={{width: isMobile || isTablet ? "90%" : "50%"}}>
                <ModalContent>
                    <ModalHeader>
                        <HeaderText>Delete address?</HeaderText>
                    </ModalHeader>
                    <ModalBody style={{textAlign: "center"}}>
                        <BodyText>Are you sure you want to delete this address?</BodyText>
                    </ModalBody>
                    <ModalFooter style={{textAlign: "end"}}>
                        <NoButton onClick={handleNo}>No</NoButton>
                        <YesButton onClick={handleDeleteAddress}>Delete address</YesButton>
                    </ModalFooter>
                </ModalContent>
            </DeleteAddressModalDialog>
        </ModalContainer>
    )
}

const DeleteAddressModalDialog = styled(ModalDialog)`
  //height: 48px;
  top: 50%;
  height: 25%;
`

const buttons = styled.a`
  background-color: #fff;
  font-size: 1em; // 16px
  font-weight: bold;
  padding: 0.7em 1em;
  transition: .2s;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: inline-block;
  text-decoration: none;
  margin-right: 20px;
  cursor: pointer;
  color: #6d6e70;
  background-position: center center;

  &:visited {
    color: #6d6e70;
  }

  &:hover {
    transform: scale(1.02);
    background-position: 0 -15px;
    transition: background-position .1s linear;
  }
`

const YesButton = styled(buttons)`
  background-color: rgba(235, 77, 75, 0.8); //rgb(245,62,62, 0.7);
  border: none;
  margin-right: 0px;
  color: #2c3445;

  //&:hover {
  //  color: #2c3445;
  //}

`

const NoButton = styled(buttons)`
  &:hover {
    background-color: #6d6e70;
    color: #2c3445;
  }
`