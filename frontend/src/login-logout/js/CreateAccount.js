import styled from "styled-components";
import {SignupLink} from "./Login";

export function CreateAccount() {
   return (
        <LoginContainer>
            <div style={{
                padding: "100px 0 35px",
                borderBottom: "1px solid #dddddd"
            }}>
                <h1>Sign Up</h1>
            </div>

            <FormWrapper>
                <form>
                     <Field>
                        <Label>First Name</Label>
                        <Input />

                     </Field>
                     <Field>
                        <Label>Last Name</Label>
                        <Input />

                    </Field>
                    <Field>
                        <Label>Email</Label>
                        <Input />

                    </Field>
                    <Field>
                        <Label>Password</Label>
                        <Input/>
                    </Field>

                    <LoginButton type="submit" value="Create Account"
                    />
                </form>

                <div style={{fontSize: "0.9rem"}}>
                    Already has an account?
                    <LoginLink href="/login">
                        Login
                    </LoginLink>
                    here!
                </div>

            </FormWrapper>
        </LoginContainer>
    )
}


const LoginContainer = styled.div`
    color: rgb(82, 82, 82);
    margin: 0 auto;
    boxSizing: border-box;
`

const FormWrapper = styled.div`
    padding: 25px 0 100px;
`
const Field = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
    margin-bottom: 0.8rem;
    color: rgb(82, 82, 82);
`

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 10px 12px;
    font-size: 1.2rem;
`

const LoginButton = styled.input`
    background-color: rgba(40,44,52, 1);
    color: whitesmoke;
    padding: 12px 24px;
    border: none;
    letter-spacing: 0.1rem;
    cursor: pointer;
    transition: .3s ease;
    margin: 2rem 0 1.5rem;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
    }
`

const LoginLink = styled(SignupLink)``