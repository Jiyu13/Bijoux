import styled from "styled-components";
import {PasswordRestrictions} from "./PasswordRestrictions";
import {useContext, useState} from "react";
import {client} from "../helper-functions/fetchFromAPI";
import {UserContext} from "../global/user-context/UserContext";
import {
    CustomLink,
    FieldBox,
    Form,
    FormInput,
    FormLabel,
    FormPageContainer,
    FormWrapper,
} from "../components/formStyles";
import {SubmitInputButton} from "../components/buttons";

export function CreateAccount() {

    const {setCurrentUser, setIsLogin, shoppingCartItems} = useContext(UserContext)

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
                setCurrentUser(user)

                // ================================= perform the login ===============
                const loginUser = {
                    email: formData.email,
                    password: formData.password
                }
                return client.post('/login/', loginUser, { withCredentials: true })
            })
            .then((res) => {
                // ============== login successful & create cart =================
                setIsLogin(true)
                const user = res.data
                setCurrentUser(user)

                return client.post('/cart/')
            })
            .then(res => {
                // ============== create cart successful & create cart items using localStorage shopping items================
                handleAddLocalStorageToCart()
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


    function handleAddLocalStorageToCart(user) {
        for (const item of shoppingCartItems) {
            const newCartItem = {
                product_id: item?.product.id,
                quantity: item?.quantity,
            }
            client.post('/cart-item/add/', newCartItem)
            .then(res => {console.log(res.data)})
        }
    }

    const disabledButton = !formData.first_name || !formData.last_name || !formData.email || !formData.password

   return (
        <FormPageContainer>
            <div style={{padding: "50px 0 35px"}}>
                <h1>Create Account</h1>
            </div>

            <PasswordRestrictions
                lengthError={lengthError}
                numericError={numericError}
                alphabeticError={alphabeticError}
            />

            <FormWrapper>
                <Form onSubmit={handleSubmitCreateAccount}>
                     <FieldBox>
                        <FormLabel>First Name</FormLabel>
                        <FormInput
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

                     </FieldBox>
                     <FieldBox>
                        <FormLabel>Last Name</FormLabel>
                        <FormInput
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
                    </FieldBox>
                    <FieldBox>
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            type='text'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{border: emailExistError ? "1px solid #e74c3c" : "1px solid rgb(118, 118, 118)"}}
                        />
                        {emailExistError && (
                             <ErrorContainer>
                                 <li>{emailExistError}</li>
                             </ErrorContainer>
                         )}
                    </FieldBox>
                    <FieldBox>
                        <FormLabel>Password</FormLabel>
                        <FormInput
                            type='text'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            style={{border: lengthError || numericError || alphabeticError? "1px solid #e74c3c" : "1px solid rgb(118, 118, 118)"}}
                        />
                    </FieldBox>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <SubmitInputButton
                            type="submit"
                            value="Submit"
                            disabled={disabledButton}
                            style={{
                                backgroundColor: disabledButton ? "rgba(40,44,52,.7)" : "rgba(40,44,52, 1)",
                                cursor: disabledButton ? "no-drop" : "pointer",

                            }}
                        />
                    </div>
                </Form>

                <div style={{fontSize: "0.9rem"}}>
                    Already have an account?
                    <LoginLink href="/login">
                        Login
                    </LoginLink>
                    here!
                </div>

            </FormWrapper>
        </FormPageContainer>
    )
}


const LoginLink = styled(CustomLink)`
  color: rgb(82, 82, 82);
  font-size: 0.9rem;
  margin: 0 6px;
  font-weight: bold;
`


const ErrorContainer = styled.ul`
  color: #e74c3c;
  font-size: 0.9rem;
  padding-left: 15px;  
  margin: 0 0 1rem;
`