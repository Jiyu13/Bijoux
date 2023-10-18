import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {API_URL, postFromAPI} from "../../helper-functions/fetchFromAPI";
import axios from "axios";

export function Login() {

    const {setCurrentUser} = useContext(UserContext)


    const initialValue = {
        email: "",
        password: "",
    }

    const [formData, setFormData] = useState(initialValue)
    const [loginError, setLoginError] = useState(null)
    function handleInput(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }

    function handleLoginSubmit(e) {
        e.preventDefault()
        console.log("handleLoginSubmit is called")
        const loginUser = {
            email: formData.email,
            password: formData.password
        }
        postFromAPI( "/login/", loginUser, setCurrentUser, setLoginError)
    }

    // useEffect(() => {
    //     console.log(loginError)
    //
    // }, [loginError]);

    return (
        <LoginContainer>
            <div style={{
                padding: "100px 0 35px",
                borderBottom: "1px solid #dddddd"
            }}>
                <h1>Login</h1>
            </div>

            <div
                style={{
                    display: loginError ? "" : "none",
                    margin: "24px 0",
                    color: "red",
                    fontWeight: "bold"
                }}
            >
                {loginError}
            </div>

            <FormWrapper>
                <form onSubmit={handleLoginSubmit}>

                    <Field>
                        <Label>Email</Label>
                        <Input
                            required
                            text="text"
                            placeholder="your@email.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInput}
                        />

                    </Field>
                    <Field>
                        <Label>Password</Label>
                        <Input
                            required
                            text="password"
                            placeholder=""
                            name="password"
                            value={formData.password}
                            onChange={handleInput}
                        />
                    </Field>

                    <div style={{marginTop: ""}}>
                        <ForgetPasswordLink href="#">
                            Forget password?
                        </ForgetPasswordLink>
                    </div>

                    <LoginButton type="submit" value="Login"
                    />
                </form>

                <div style={{fontSize: "0.9rem"}}>
                    Don't have an account?
                    <SignupLink href="/register">Sign up</SignupLink>
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


const ForgetPasswordLink = styled.a`
    color: rgb(82, 82, 82); 
    font-size: 0.8rem;
    
    &:hover {
        text-decoration-line: underline;
        text-decoration-thickness: 2px;
    }
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

export const SignupLink = styled(ForgetPasswordLink)`
  font-size: 0.9rem;
  margin: 0 6px;
  font-weight: bold;
  &:hover {
        text-decoration-line: underline;
        text-decoration-thickness: 2px;
    }
`