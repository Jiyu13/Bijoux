import {useContext, useEffect, useState} from "react";
import {UserContext} from "../global/user-context/UserContext";
import {client} from "../helper-functions/fetchFromAPI";
import {MessageSentSuccessfully} from "./MessageSentSuccessfully";
import {
    FieldBox,
    Form,
    FormInput,
    FormLabel, FormPageContainer,
    NameFieldBox, OptionBox, SelectBox,
} from "../components/formStyles";
import {CancelButton, SubmitInputButton} from "../components/buttons";


export function ContactForm() {

    const {isMobile, currentUser} = useContext(UserContext)

    const [isSent, setIsSent] = useState(false)

    const flexDirection = isMobile ? "column" : "row"
    const gap = isMobile ? "0px" : "6px"
    const width = isMobile ? "100%" : "50%"

    // console.log(currentUser)
    const fullName =`${currentUser?.first_name} ${currentUser?.last_name}`
    const sender_email = currentUser?.email

    const initialValue = {
        sender: currentUser? currentUser.user_id : null,
        full_name: currentUser ? fullName : "",
        sender_email: currentUser ? sender_email : "",
        subject: "",
        message: "",
        // attachments: "",
    }

    const [formData, setFormData] = useState(initialValue)
    // console.log("formData", formData)

    // Use useEffect to set formData values when currentUser is available
    useEffect(() => {
        if (currentUser) {
            const { first_name, last_name, email } = currentUser;
            const fullName = `${first_name} ${last_name}`;
            setFormData({
                ...formData,
                sender: currentUser.id,
                full_name: fullName,
                sender_email: email,
            });
        }
    }, [currentUser]);

    function handleOnchange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }

    function handleSubmitContactForm(e) {
        e.preventDefault()
        const formObject = {
            sender: currentUser.user_id,
            full_name: formData.full_name,
            sender_email: formData.sender_email,
            subject: formData.subject,
            message: formData.message,
        }

        async function postContactRequest() {

            try {
                const res = await client.post('/contact-requests/create/', formObject, { withCredentials: true })
                console.log(formObject)
                console.log(res)
                setIsSent(true)

            } catch (error) {
                console.log(error)
            }

        }
        postContactRequest()
        setFormData({
            sender: currentUser? currentUser.user_id : null,
            full_name: "",
            sender_email: "",
            subject: "",
            message: "",
            // attachments: "",
        })

    }


    const disabledButton = !formData.full_name || !formData.sender_email || !formData.subject || !formData.message
    function handleCancel() {}

    return (
        <>
            <FormPageContainer>
                <div style={{padding: "50px 0 35px",}}>
                    <h1>Contact Us</h1>
                </div>

                <Form
                    className='contact-form'
                    onSubmit={handleSubmitContactForm}
                >

                    {isSent && (<MessageSentSuccessfully />)}

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
                                name='full_name'
                                value={formData?.full_name}
                                onChange={handleOnchange}
                            />

                         </FieldBox>

                        <FieldBox style={{width: width}}>
                            <FormLabel>Email</FormLabel>
                            <FormInput
                                type="text"
                                name='sender_email'
                                value={formData?.sender_email}
                                onChange={handleOnchange}
                            />
                         </FieldBox>
                    </NameFieldBox>

                    <FieldBox>
                        <FormLabel>Subject</FormLabel>
                        <SelectBox
                          id="subject"
                          name="subject"
                          value={formData?.subject}
                          onChange={handleOnchange}
                        >
                            <OptionBox value="" disabled>Select a subject</OptionBox>
                            <OptionBox value="Order issues">Order issues</OptionBox>
                            <OptionBox value="Product question">Product question</OptionBox>
                            <OptionBox value="General Inquiry">General Inquiry</OptionBox>
                            <OptionBox value="Report an issue">Report an issue</OptionBox>
                            <OptionBox value="Request refund or discount">Request refund or discount</OptionBox>
                            <OptionBox value="Feedback">Feedback</OptionBox>
                            <OptionBox value="Other">Other</OptionBox>
                          {/* Add more options as needed */}
                        </SelectBox>
                    </FieldBox>
                    <FieldBox>
                        <FormLabel>Message</FormLabel>
                        <FormInput
                            type="text"
                            name='message'
                            value={formData?.message}
                            onChange={handleOnchange}
                        />
                    </FieldBox>

                    {/*<FieldBox>*/}
                    {/*    <FormLabel>Attachments</FormLabel>*/}
                    {/*    <FormInput*/}
                    {/*        type="text"*/}
                    {/*        name="attachments"*/}
                    {/*        value={formData.attachments}*/}
                    {/*        onChange={handleOnchange}*/}
                    {/*    />*/}
                    {/*</FieldBox>*/}


                    <div style={{display: "flex", justifyContent: "center", gap: "0.8rem"}}>
                        <SubmitInputButton
                            type="submit"
                            value='Send'
                            disabled={disabledButton}
                            style={{
                                backgroundColor: disabledButton ? "rgba(40,44,52,.7)" : "rgba(40,44,52, 1)",
                                cursor: disabledButton ? "no-drop" : "pointer",
                            }}
                        />
                        <CancelButton type="button" onClick={handleCancel}>Cancel</CancelButton>
                    </div>
                </Form>
            </FormPageContainer>
        </>
    )
}