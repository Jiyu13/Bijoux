import {Field, Input} from "../../account/CreateAccount";
import {DarkButton, LightButton} from "../../components/buttons";
import styled from "styled-components";

import '../css/address.css'
import {AddressLabel, FormHeader, NameFieldBox} from "../css/addressFormStyles";
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";

export function NewAddress({setNewAddress}) {

    const {isMobile} = useContext(UserContext)

    function handleCancel() {
        setNewAddress(false)
    }

    return (
    <NewFormPage>

            <form className='address-form'>

                <FormHeader>Add New Address</FormHeader>

                <NameFieldBox
                    style={{
                        flexDirection: isMobile ? "column" : "row",
                        gap: isMobile ? "0px" : "6px"
                    }}
                >
                    <Field style={{width: isMobile ? "100%" : "50%",}}>
                        <AddressLabel>First Name</AddressLabel>
                        <Input type="text" value=""/>

                     </Field>
                     <Field style={{width: isMobile ? "100%" : "50%",}}>
                        <AddressLabel>Last Name</AddressLabel>
                        <Input type="text" value=""/>

                    </Field>
                </NameFieldBox>

                <Field>
                    <AddressLabel>Address line 1</AddressLabel>
                    <Input />

                </Field>
                <Field>
                    <AddressLabel>Address line 2</AddressLabel>
                    <Input/>
                </Field>

                <Field>
                    <AddressLabel>City</AddressLabel>
                    <Input/>
                </Field>
                <Field>
                    <AddressLabel>Country</AddressLabel>
                    <Input/>
                </Field>
                <Field>
                    <AddressLabel>State / Province</AddressLabel>
                    <Input/>
                </Field>
                <Field>
                    <AddressLabel>ZIP / Postal Code</AddressLabel>
                    <Input/>
                </Field>
                <Field>
                    <AddressLabel>Phone</AddressLabel>
                    <Input/>
                </Field>

                <Field style={{flexDirection: "row"}}>

                    <Input type="checkbox" value="default address?"/>
                    <AddressLabel>Set as Default Address?</AddressLabel>
                </Field>
                <div style={{display: "flex", justifyContent: "center", gap: "2rem"}}>
                    <DarkButton type="submit">Submit</DarkButton>
                    <LightButton type="button" onClick={handleCancel}>Cancel</LightButton>
                </div>
             </form>
        </NewFormPage>
    )
}

const NewFormPage = styled.div`
  margin-top: 36px;
`

