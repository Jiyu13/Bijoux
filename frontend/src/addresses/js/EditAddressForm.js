import {Field, Input, Label} from "../../account/CreateAccount";
import styled from "styled-components";
import {DarkButton, LightButton} from "../../components/buttons";
import {useContext, useState} from "react";
import {client} from "../../helper-functions/fetchFromAPI";

import '../css/address.css'
import {UserContext} from "../../global/user-context/UserContext";
import {FormHeader, NameFieldBox} from "../css/addressFormStyles";


export function EditAddressForm({address, setEditingAddressId, onUpdateAddress}) {

    const {isMobile} = useContext(UserContext)

    const firstName = address?.first_name
    const lastName = address?.last_name
    const addressLine1 = address?.address_line_1
    const addressLine2 = address?.address_line_2
    const city = address?.city
    const country = address?.country
    const isDefault = address?.is_default
    const phone = address?.phone
    const state = address?.state
    const zipCode = address?.zip_code

    const initialValue = {
        first_name: firstName || "",
        last_name: lastName || "",
        address_line_1: addressLine1 || "",
        address_line_2: addressLine2 || "",
        city: city || "",
        country: country || "",
        is_default: isDefault || false,
        phone: phone || "",
        state: state || "",
        zip_code: zipCode || ""
    }

    const [editFormData, setEditFormData] = useState(initialValue)

    function handleOnchange(e) {
        const name = e.target.name
        let value
        if (e.target.type === "checkbox") {
            value = e.target.checked
        } else {
            value = e.target.value
        }
        setEditFormData({...editFormData, [name]: value,})
    }

    function handleEditAddressSubmit(e) {
        e.preventDefault()

        const formObject = {
            first_name: editFormData.first_name,
            last_name: editFormData.last_name,
            address_line_1: editFormData.address_line_1,
            address_line_2: editFormData.address_line_2,
            city: editFormData.city,
            country: editFormData.country,
            is_default: editFormData.is_default,
            phone: editFormData.phone,
            state: editFormData.state,
            zip_code: editFormData.zip_code
        }

        client.put(`/address/${address?.id}/`, formObject, {withCredentials: true})
            .then(res => {
                onUpdateAddress(res.data)
            })
            .catch(error => console.log(error.response.data))
        setEditingAddressId(null)
    }


    function handleCancelUpdate() {
        setEditingAddressId(null)
    }

    return (
        <EditFormPage>

            <form
                className='address-form'
                onSubmit={handleEditAddressSubmit}
            >
                <FormHeader>Edit address</FormHeader>
                <NameFieldBox
                    style={{
                        flexDirection: isMobile ? "column" : "row",
                        gap: isMobile ? "0px" : "6px"
                    }}
                >
                     <Field style={{width: isMobile ? "100%" : "50%",}}>
                        <Label>First Name</Label>
                        <Input
                            type="text"
                            name='first_name'
                            value={editFormData.first_name}
                            onChange={handleOnchange}
                        />

                     </Field>
                     <Field style={{width: isMobile ? "100%" : "50%",}}>
                        <Label>Last Name</Label>
                        <Input
                            type="text"
                            name='last_name'
                            value={editFormData.last_name}
                            onChange={handleOnchange}
                        />

                    </Field>
                </NameFieldBox>
                <Field>
                    <Label>Address line 1</Label>
                    <Input
                        type="text"
                        name='address_line_1'
                        value={editFormData.address_line_1}
                        onChange={handleOnchange}
                    />

                </Field>
                <Field>
                    <Label>Address line 2</Label>
                    <Input
                        type="text"
                        name='address_line_2'
                        value={editFormData.address_line_2}
                        onChange={handleOnchange}
                    />
                </Field>

                <Field>
                    <Label>City</Label>
                    <Input
                        type="text"
                        name="city"
                        value={editFormData.city}
                        onChange={handleOnchange}
                    />
                </Field>
                <Field>
                    <Label>Country</Label>
                    <Input
                        type="text"
                        name='country'
                        value={editFormData.country}
                        onChange={handleOnchange}
                    />
                </Field>
                <Field>
                    <Label>State / Province</Label>
                    <Input
                        type="text"
                        name='state'
                        value={editFormData.state}
                        onChange={handleOnchange}
                    />
                </Field>
                <Field>
                    <Label>ZIP / Postal Code</Label>
                    <Input
                        type="text"
                        name='zip_code'
                        value={editFormData.zip_code}
                        onChange={handleOnchange}
                    />
                </Field>
                <Field>
                    <Label>Phone</Label>
                    <Input
                        type="text"
                        name='phone'
                        value={editFormData.phone}
                        onChange={handleOnchange}
                    />
                </Field>

                <Field style={{flexDirection: "row"}}>

                    <Input
                        type="checkbox"
                        name='is_default'
                        disabled={initialValue?.is_default}
                        checked={editFormData.is_default}
                        onChange={handleOnchange}

                    />
                    <Label>Set as Default Address?</Label>
                </Field>

                <div style={{display: "flex", justifyContent: "center", gap: "2rem"}}>
                    <DarkButton type="submit">Update Address</DarkButton>
                    <LightButton type="button" onClick={handleCancelUpdate}>Cancel</LightButton>
                </div>
             </form>
        </EditFormPage>
    )
}

const EditFormPage = styled.div`
  //margin-top: 36px;
`