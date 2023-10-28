import styled from "styled-components";
import {SignupLink} from "../login-logout/js/Login";
import {PasswordRestrictions} from "./PasswordRestrictions";
import {useContext, useEffect, useState} from "react";
import {client} from "../helper-functions/fetchFromAPI";
import {UserContext} from "../global/user-context/UserContext";

export function CreateAccount() {

    const {setCurrentUser, setIsLogin} = useContext(UserContext)

    const [firstNameError, setFirstNameError] = useState(null)
    const [lastNameError, setLastNameError] = useState(null)
    const [lengthError, setLengthError] = useState(null)
    const [numericError, setNumericError] = useState(null)
    const [emailExistError, setEmailExistError] = useState(null)
    const [alphabeticError, setAlphabeticError] = useState(null)

    const initialValue = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    }
    const [formData, setFormData] = useState(initialValue)


    function handleInputChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }

    function handleSubmitCreateAccount(e) {
        e.preventDefault()
        const createAccountData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password
        }

        client.post('/register/', createAccountData, { withCredentials: true })
            .then(res => {
                const user = res.data.user
                // console.log(user)
                setCurrentUser(user)

                // perform the login
                const loginUser = {
                    email: formData.email,
                    password: formData.password
                }
                return client.post('/login/', loginUser, { withCredentials: true })
            })
            .then((res) => {
                // login successful
                setIsLogin(true)
                const user = res.data
                setCurrentUser(user)
                window.location.href = "/account"
            })
            .catch(err => {
                setIsLogin(false)

                setFirstNameError(null)
                setLastNameError(null)
                setEmailExistError(null)
                setLengthError(null)
                setNumericError(null)
                setAlphabeticError(null)

                const error = err.response.data
                if (error["first_name"]){
                    setFirstNameError(error["first_name"])
                }
                if (error["last_name"]) {
                    setLastNameError(error["last_name"])
                }
                if (error["email"]) {
                    setEmailExistError(error["email"])
                }
                if (error["length"]) {
                    setLengthError(error["length"])
                }
                if (error["numeric"]) {
                    setNumericError(error["numeric"])
                }
                if (error["alphabetic"]) {
                    setAlphabeticError(error["alphabetic"])
                }
            })
    }

    const disabledButton = !formData.first_name || !formData.last_name || !formData.email || !formData.password

   return (
        <LoginContainer>
            <div style={{
                padding: "50px 0 35px",
                // borderBottom: "1px solid #dddddd"
            }}>
                <h1>Create Account</h1>
            </div>

            <PasswordRestrictions
                lengthError={lengthError}
                numericError={numericError}
                alphabeticError={alphabeticError}
            />

            <FormWrapper>
                <form onSubmit={handleSubmitCreateAccount}>
                     <Field>
                        <Label>First Name</Label>
                        <Input
                            type='text'
                            name='first_name'
                            value={formData.first_name}
                            onChange={handleInputChange}
                            style={{border: firstNameError ? "1px solid #e74c3c" : "1px solid rgb(118, 118, 118)"}}
                        />
                         {/*{firstNameError && (*/}
                         {/*    <ErrorContainer>*/}
                         {/*        <span>*{firstNameError}</span>*/}
                         {/*    </ErrorContainer>*/}
                         {/*)}*/}

                     </Field>
                     <Field>
                        <Label>Last Name</Label>
                        <Input
                            type='text'
                            name='last_name'
                            value={formData.last_name}
                            onChange={handleInputChange}
                            style={{border: lastNameError ? "1px solid #e74c3c" : "1px solid rgb(118, 118, 118)"}}
                        />
                        {/*{lastNameError && (*/}
                        {/*     <ErrorContainer>*/}
                        {/*         <span>*{lastNameError}</span>*/}
                        {/*     </ErrorContainer>*/}
                        {/* )}*/}
                    </Field>
                    <Field>
                        <Label>Email</Label>
                        <Input
                            type='text'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{border: emailExistError ? "1px solid #e74c3c" : "1px solid rgb(118, 118, 118)"}}
                        />
                        {emailExistError && (
                             <ErrorContainer>
                                 <span>*{emailExistError}</span>
                             </ErrorContainer>
                         )}
                    </Field>
                    <Field>
                        <Label>Password</Label>
                        <Input
                            type='text'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            style={{border: lengthError || numericError || alphabeticError? "1px solid #e74c3c" : "1px solid rgb(118, 118, 118)"}}
                        />
                    </Field>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <LoginButton
                            type="submit"
                            value="Submit"
                            disabled={disabledButton}
                            style={{
                                backgroundColor: disabledButton ? "rgba(40,44,52,.7)" : "rgba(40,44,52, 1)",
                                cursor: disabledButton ? "no-drop" : "pointer"
                            }}
                        />
                    </div>
                </form>

                <div style={{fontSize: "0.9rem"}}>
                    Already have an account?
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(82, 82, 82);
    margin: 0 auto;
    boxSizing: border-box;
`

const FormWrapper = styled.div`
    padding: 25px 0 100px;
`
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

export const Label = styled.label`
    margin-bottom: 0.8rem;
    color: rgb(82, 82, 82);
`

export const Input = styled.input`
    
    padding: 10px 12px;
    font-size: 1.2rem;
    border-radius: 4px;
`

const LoginButton = styled.input`
    //background-color: rgba(40,44,52, 1);
    color: whitesmoke;
    padding: 12px 24px;
    border: none;
    letter-spacing: 0.1rem;
    //cursor: pointer;
    transition: .3s ease;
    margin: 2rem 0 2rem;
    border-radius: 4px;
    width: 100%;
    //&:hover {
    //  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
    //}
`

const LoginLink = styled(SignupLink)``


const ErrorContainer = styled.div`
  color: #e74c3c;
  font-size: 0.75rem;
`