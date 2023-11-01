import {useContext, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {client} from "../../helper-functions/fetchFromAPI";


import styled from "styled-components";
import {FieldBox, FormInput, FormLabel, FormHeader, NameFieldBox} from "../../components/formStyles";
import '../css/address.css'
import {CancelButton, SubmitInputButton} from "../../components/buttons";

export function NewAddress({setNewAddress,onAddNewAddress}) {

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
            is_default: newFormData.is_default,
            phone: newFormData.phone,
            state: newFormData.state,
            zip_code: newFormData.zip_code
        }

        client.post('/addresses/', formObject, {withCredentials: true})
            .then(res => onAddNewAddress(res.data))
            .catch(error => console.log(error))

        setNewFormData(initialValue)
    }

    function handleCancel() {
        setNewAddress(false)
    }

    const flexDirection = isMobile ? "column" : "row"
    const gap = isMobile ? "0px" : "6px"
    const width = isMobile ? "100%" : "50%"

    return (
    <NewFormPage>
            <form
                className='address-form'
                onSubmit={handleNewAddressSubmit}
            >

                <FormHeader>Add New Address</FormHeader>

                <NameFieldBox
                    style={{
                        flexDirection: flexDirection,
                        gap: gap
                    }}
                >
                    <FieldBox style={{width: width}}>
                        <FormLabel>First Name</FormLabel>
                        <FormInput
                            type="text"
                            name='first_name'
                            value={newFormData.first_name}
                            onChange={handleOnchange}
                        />

                     </FieldBox>
                     <FieldBox style={{width: width}}>
                        <FormLabel>Last Name</FormLabel>
                        <FormInput
                            type="text"
                            name='last_name'
                            value={newFormData.last_name}
                            onChange={handleOnchange}
                        />

                    </FieldBox>
                </NameFieldBox>

                <FieldBox>
                    <FormLabel>Address line 1</FormLabel>
                    <FormInput
                        type='text'
                        name='address_line_1'
                        value={newFormData.address_line_1}
                        onChange={handleOnchange}
                    />
                </FieldBox>
                <FieldBox>
                    <FormLabel>Address line 2</FormLabel>
                    <FormInput
                        type="text"
                        name='address_line_2'
                        value={newFormData.address_line_2}
                        onChange={handleOnchange}
                    />
                </FieldBox>

                <FieldBox>
                    <FormLabel>City</FormLabel>
                    <FormInput
                        type="text"
                        name="city"
                        value={newFormData.city}
                        onChange={handleOnchange}
                    />
                </FieldBox>

                <FieldBox>
                    <FormLabel>State / Province</FormLabel>
                    <FormInput
                        type="text"
                        name="state"
                        value={newFormData.state}
                        onChange={handleOnchange}
                    />
                </FieldBox>

                <FieldBox>
                    <FormLabel>Country</FormLabel>
                    <FormInput
                        type="text"
                        name="country"
                        value={newFormData.country}
                        onChange={handleOnchange}
                    />
                </FieldBox>


                <FieldBox>
                    <FormLabel>ZIP / Postal Code</FormLabel>
                    <FormInput
                        type="text"
                        name="zip_code"
                        value={newFormData.zip_code}
                        onChange={handleOnchange}
                    />
                </FieldBox>

                <FieldBox>
                    <FormLabel>Phone</FormLabel>
                    <FormInput
                        type="text"
                        name='phone'
                        value={newFormData.phone}
                        onChange={handleOnchange}
                    />
                </FieldBox>

                <FieldBox style={{flexDirection: "row"}}>

                    <FormInput
                        type="checkbox"
                        name='is_default'
                        checked={newFormData.is_default}
                        onChange={handleOnchange}
                    />
                    <FormLabel>Set as Default Address?</FormLabel>
                </FieldBox>

                <div style={{display: "flex", justifyContent: "center", gap: "0.8rem"}}>
                    <SubmitInputButton type="submit" value='Submit' />
                    <CancelButton type="button" onClick={handleCancel}>Cancel</CancelButton>
                </div>
             </form>
        </NewFormPage>
    )
}

const NewFormPage = styled.div`
  margin-top: 36px;
`

