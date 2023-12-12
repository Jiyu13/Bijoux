import styled from "styled-components";
import {useContext, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {client} from "../../helper-functions/fetchFromAPI";
import {
    CustomLink,
    FieldBox,
    Form,
    FormInput,
    FormLabel,
    FormPageContainer,
    FormWrapper,
} from "../../components/formStyles";
import {SubmitInputButton} from "../../components/buttons";

export function Login() {

    const {setCurrentUser, setIsLogin} = useContext(UserContext)


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

        const loginUser = {
            email: formData.email,
            password: formData.password
        }

        async function postLogin() {
            try {
                const res = await client.post(`/login/`, loginUser, { withCredentials: true })
                setIsLogin(true)
                setLoginError(null)
                const user = res.data
                setCurrentUser(user)
                window.location.href = "/account"
            } catch (error) {
                setIsLogin(false)
                setLoginError(error.response.data)
            }
        }

        postLogin()
        // client.post(`/login/`, loginUser, { withCredentials: true })
        //     .then(res => {
        //         setIsLogin(true)
        //         setLoginError(null)
        //
        //         const user = res.data
        //         // console.log(user)
        //         setCurrentUser(user)
        //
        //         window.location.href = "/account"
        //         // navigate('/account') // doesn't refresh page
        //         // return client.get('/user/', { withCredentials: true })
        //     })
        //     .catch(err => {
        //         setIsLogin(false)
        //         setLoginError(err.response.data)
        //     })
    }

    return (
        <FormPageContainer>
            <div style={{padding: "50px 0 35px"}}>
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
                <Form onSubmit={handleLoginSubmit}>

                    <FieldBox>
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            required
                            text="text"
                            placeholder="your@email.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInput}
                        />

                    </FieldBox>
                    <FieldBox>
                        <FormLabel>Password</FormLabel>
                        <FormInput
                            required
                            text="password"
                            placeholder=""
                            name="password"
                            value={formData.password}
                            onChange={handleInput}
                        />
                    </FieldBox>

                    <div style={{marginTop: ""}}>
                        <ForgetPasswordLink href="#">
                            Forget password?
                        </ForgetPasswordLink>
                    </div>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <SubmitInputButton type="submit" value="Login"/>
                    </div>

                </Form>

                <div style={{fontSize: "0.9rem"}}>
                    Don't have an account?
                    <SignupLink href="/register">Sign up</SignupLink>
                     here!
                </div>
            </FormWrapper>
        </FormPageContainer>
    )
}


const ForgetPasswordLink = styled(CustomLink)`
    color: rgb(82, 82, 82); 
    font-size: 0.8rem;
`

const SignupLink = styled(CustomLink)`
  color: rgb(82, 82, 82);
  font-size: 0.9rem;
  margin: 0 6px;
  font-weight: bold;
`