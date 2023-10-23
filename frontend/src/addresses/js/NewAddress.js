import {Field, Input, Label} from "../../account/CreateAccount";
import {DarkButton, LightButton} from "../../components/buttons";
import styled from "styled-components";

import '../css/address.css'
import {AddressLabel, FormHeader, NameFieldBox} from "../css/addressFormStyles";
import {useContext, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";

export function NewAddress({setNewAddress}) {

    const {isMobile} = useContext(UserContext)

    const initialValue = {
        first_name: "",
        last_name:  "",
        address_line_1:  "",
        address_line_2: "",
        city: "",
        country: "",
        is_default: false,
        phone: "",
        state: "",
        zip_code: ""
    }

    const [newFormData, setNewFormData] = useState(initialValue)

    function handleOnchange(e) {
        const name = e.target.name
        let value
        if (e.target.type === "checkbox") {
            value = e.target.checked
        } else {
            value = e.target.value
        }

        setNewFormData({
            ...newFormData,
            [name]: value,
        })
    }

    function handleNewAddressSubmit(e) {
        e.preventDefault()

        const formObject = {
            first_name: newFormData.first_name,
            last_name: newFormData.last_name,
            address_line_1: newFormData.address_line_1,
            address_line_2: newFormData.address_line_2,
            city: newFormData.city,
            country: newFormData.country,
            is_default: newFormData.isDefault,
            phone: newFormData.phone,
            state: newFormData.state,
            zip_code: newFormData.zip_code
        }
    }

    function handleCancel() {
        setNewAddress(false)
    }

    const flexDirection = isMobile ? "column" : "row"
    const gap = isMobile ? "0px" : "6px"
    const width = isMobile ? "100%" : "50%"

    return (
    <NewFormPage>

            <form className='address-form'>

                <FormHeader>Add New Address</FormHeader>

                <NameFieldBox
                    style={{
                        flexDirection: flexDirection,
                        gap: gap
                    }}
                >
                    <Field style={{width: width}}>
                        <AddressLabel>First Name</AddressLabel>
                        <Input
                            type="text"
                            name='first_name'
                            value={newFormData.first_name}
                            onChange={handleOnchange}
                        />

                     </Field>
                     <Field style={{width: width}}>
                        <AddressLabel>Last Name</AddressLabel>
                        <Input
                            type="text"
                            name='last_name'
                            value={newFormData.last_name}
                            onChange={handleOnchange}
                        />

                    </Field>
                </NameFieldBox>

                <Field>
                    <AddressLabel>Address line 1</AddressLabel>
                    <Input
                        type='text'
                        name='address_line_1'
                        value={newFormData.address_line_1}
                        onChange={handleOnchange}
                    />
                </Field>
                <Field>
                    <AddressLabel>Address line 2</AddressLabel>
                    <Input
                        type="text"
                        name='address_line_2'
                        value={newFormData.address_line_2}
                        onChange={handleOnchange}
                    />
                </Field>

                    <Field>
                        <AddressLabel>City</AddressLabel>
                        <Input
                            type="text"
                            name="city"
                            value={newFormData.city}
                            onChange={handleOnchange}
                        />
                    </Field>

                <Field>
                    <AddressLabel>State / Province</AddressLabel>
                    <Input
                        type="text"
                        name="state"
                        value={newFormData.state}
                        onChange={handleOnchange}
                    />
                </Field>

                <Field>
                    <AddressLabel>Country</AddressLabel>
                    <Input
                        type="text"
                        name="country"
                        value={newFormData.country}
                        onChange={handleOnchange}
                    />
                </Field>


                <Field>
                    <AddressLabel>ZIP / Postal Code</AddressLabel>
                    <Input
                        type="text"
                        name="zip_code"
                        value={newFormData.zip_code}
                        onChange={handleOnchange}
                    />
                </Field>

                <Field>
                    <Label>Phone</Label>
                    <Input
                        type="text"
                        name='phone'
                        value={newFormData.phone}
                        onChange={handleOnchange}
                    />
                </Field>

                <Field style={{flexDirection: "row"}}>

                    <Input
                        type="checkbox"
                        name='is_default'
                        checked={newFormData.is_default}
                        onChange={handleOnchange}
                    />
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

