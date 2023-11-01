import {useContext, useState} from "react";
import {client} from "../../helper-functions/fetchFromAPI";


import {UserContext} from "../../global/user-context/UserContext";

import styled from "styled-components";
import '../css/address.css'
import {FieldBox, FormInput, FormLabel, FormHeader, NameFieldBox} from "../../components/formStyles";
import {CancelButton, SubmitInputButton} from "../../components/buttons";


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
                     <FieldBox style={{width: isMobile ? "100%" : "50%",}}>
                        <FormLabel>First Name</FormLabel>
                        <FormInput
                            type="text"
                            name='first_name'
                            value={editFormData.first_name}
                            onChange={handleOnchange}
                        />

                     </FieldBox>
                     <FieldBox style={{width: isMobile ? "100%" : "50%",}}>
                        <FormLabel>Last Name</FormLabel>
                        <FormInput
                            type="text"
                            name='last_name'
                            value={editFormData.last_name}
                            onChange={handleOnchange}
                        />

                    </FieldBox>
                </NameFieldBox>
                <FieldBox>
                    <FormLabel>Address line 1</FormLabel>
                    <FormInput
                        type="text"
                        name='address_line_1'
                        value={editFormData.address_line_1}
                        onChange={handleOnchange}
                    />

                </FieldBox>
                <FieldBox>
                    <FormLabel>Address line 2</FormLabel>
                    <FormInput
                        type="text"
                        name='address_line_2'
                        value={editFormData.address_line_2}
                        onChange={handleOnchange}
                    />
                </FieldBox>

                <FieldBox>
                    <FormLabel>City</FormLabel>
                    <FormInput
                        type="text"
                        name="city"
                        value={editFormData.city}
                        onChange={handleOnchange}
                    />
                </FieldBox>
                <FieldBox>
                    <FormLabel>Country</FormLabel>
                    <FormInput
                        type="text"
                        name='country'
                        value={editFormData.country}
                        onChange={handleOnchange}
                    />
                </FieldBox>
                <FieldBox>
                    <FormLabel>State / Province</FormLabel>
                    <FormInput
                        type="text"
                        name='state'
                        value={editFormData.state}
                        onChange={handleOnchange}
                    />
                </FieldBox>
                <FieldBox>
                    <FormLabel>ZIP / Postal Code</FormLabel>
                    <FormInput
                        type="text"
                        name='zip_code'
                        value={editFormData.zip_code}
                        onChange={handleOnchange}
                    />
                </FieldBox>
                <FieldBox>
                    <FormLabel>Phone</FormLabel>
                    <FormInput
                        type="text"
                        name='phone'
                        value={editFormData.phone}
                        onChange={handleOnchange}
                    />
                </FieldBox>

                <FieldBox style={{flexDirection: "row"}}>

                    <FormInput
                        type="checkbox"
                        name='is_default'
                        disabled={initialValue?.is_default}
                        checked={editFormData.is_default}
                        onChange={handleOnchange}

                    />
                    <FormLabel>Set as Default Address?</FormLabel>
                </FieldBox>

                <div style={{display: "flex", justifyContent: "center", gap: "2rem"}}>
                    <SubmitInputButton type="submit" value='Update Address' />
                    <CancelButton type="button" onClick={handleCancelUpdate}>Cancel</CancelButton>
                </div>
             </form>
        </EditFormPage>
    )
}

const EditFormPage = styled.div``