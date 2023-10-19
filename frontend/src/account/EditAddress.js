import {Field, Input, Label, LoginButton} from "./CreateAccount";
import styled from "styled-components";
import {DarkButton, LightButton} from "../components/buttons";
import {useContext} from "react";
import {UserContext} from "../global/user-context/UserContext";

export function EditAddress() {

    const {currentUser} = useContext(UserContext)

    return (
        <EditFormPage>
            <h3>Edit address</h3>
            <form>
                 <Field>
                    <Label>First Name</Label>
                    <Input type="text" value={`${currentUser?.first_name}`}/>

                 </Field>
                 <Field>
                    <Label>Last Name</Label>
                    <Input type="text" value={`${currentUser?.last_name}`}/>

                </Field>
                <Field>
                    <Label>Address line 1</Label>
                    <Input />

                </Field>
                <Field>
                    <Label>Address line 2</Label>
                    <Input/>
                </Field>

                <Field>
                    <Label>City</Label>
                    <Input/>
                </Field>
                <Field>
                    <Label>Country</Label>
                    <Input/>
                </Field>
                <Field>
                    <Label>State / Province</Label>
                    <Input/>
                </Field>
                <Field>
                    <Label>ZIP / Postal Code</Label>
                    <Input/>
                </Field>
                <Field>
                    <Label>Phone</Label>
                    <Input/>
                </Field>

                <Field style={{flexDirection: "row"}}>

                    <Input type="checkbox" value="default address?"/>
                    <Label>Set as Default Address?</Label>
                </Field>
                <div style={{display: "flex", justifyContent: "center", gap: "2rem"}}>
                    <DarkButton type="submit">Update Address</DarkButton>
                    <LightButton type="submit">Cancel</LightButton>
                </div>
             </form>
        </EditFormPage>
    )
}

const EditFormPage = styled.div`
  margin-top: 36px;
`