import {Field, Input, Label} from "../account/CreateAccount";
import {DarkButton, LightButton} from "../components/buttons";
import styled from "styled-components";

export function NewAddress() {
    return (
    <NewFormPage>
            <h3>Add New Address</h3>
            <form>
                <div style={{display: "flex", gap: "12px"}}>
                    <Field>
                        <Label>First Name</Label>
                        <Input type="text" value=""/>

                     </Field>
                     <Field>
                        <Label>Last Name</Label>
                        <Input type="text" value=""/>

                    </Field>
                </div>

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
                    <DarkButton type="submit">Submit</DarkButton>
                    <LightButton type="submit">Cancel</LightButton>
                </div>
             </form>
        </NewFormPage>
    )
}

const NewFormPage = styled.div`
  margin-top: 36px;
`