import {PasswordRestrictions} from "../account/PasswordRestrictions";
import {DarkButton, LightButton} from "../components/buttons";
import styled from "styled-components";
import {useContext, useState} from "react";
import {UserContext} from "../global/user-context/UserContext";
import {
    CancelButton,
    FieldBox,
    Form,
    FormInput,
    FormLabel, FormPageContainer,
    NameFieldBox,
    SubmitInputButton
} from "../components/formStyles";

export function ContactForm() {

    const {isMobile} = useContext(UserContext)

    const flexDirection = isMobile ? "column" : "row"
    const gap = isMobile ? "0px" : "6px"
    const width = isMobile ? "100%" : "50%"

    const initialValue = {
        full_name: "",
        email: "",
        subject: "",
        message: "",
        attachments: "",
    }

    const [formData, setFormData] = useState(initialValue)

    function handleOnchange() {}

    function handleSubmitContactForm() {}

    function handleCancel() {}

    return (
        <FormPageContainer>
            <div style={{padding: "50px 0 35px",}}>
                <h1>Contact Us</h1>
            </div>

            <Form
                className='contact-form'
                onSubmit={handleSubmitContactForm}
            >
                <NameFieldBox
                    style={{
                        flexDirection: flexDirection,
                        gap: gap
                    }}
                >
                    <FieldBox style={{width: width}}>
                        <FormLabel>Full Name</FormLabel>
                        <FormInput
                            type="text"
                            name='first_name'
                            value={formData.first_name}
                            onChange={handleOnchange}
                        />

                     </FieldBox>

                    <FieldBox style={{width: width}}>
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            type="text"
                            name='email'
                            value={formData.email}
                            onChange={handleOnchange}
                        />
                     </FieldBox>
                </NameFieldBox>

                <FieldBox>
                    <FormLabel>Subject</FormLabel>
                    <FormInput
                        type='text'
                        name='subject'
                        value={formData.subject}
                        onChange={handleOnchange}
                    />
                </FieldBox>
                <FieldBox>
                    <FormLabel>Message</FormLabel>
                    <FormInput
                        type="text"
                        name='message'
                        value={formData.message}
                        onChange={handleOnchange}
                    />
                </FieldBox>

                <FieldBox>
                    <FormLabel>Attachments</FormLabel>
                    <FormInput
                        type="text"
                        name="attachments"
                        value={formData.attachments}
                        onChange={handleOnchange}
                    />
                </FieldBox>


                <div style={{display: "flex", justifyContent: "center", gap: "0.8rem"}}>
                    <SubmitInputButton type="submit" value='Send' />
                    <CancelButton type="button" onClick={handleCancel}>Cancel</CancelButton>
                </div>
             </Form>
        </FormPageContainer>
    )
}