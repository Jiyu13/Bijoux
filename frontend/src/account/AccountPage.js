import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {client} from "../../helper-functions/fetchFromAPI";
import {useNavigate} from "react-router-dom";

export function AccountPage() {

    const { currentUser, setCurrentUser, setIsLogin} = useContext(UserContext)

    // console.log(currentUser)

    const userFullName = currentUser?.first_name + " " + currentUser?.last_name
    const userEmail = currentUser?.email


    let navigate = useNavigate()
    function handleLogout() {
        client.post('/logout/', {withCredential: true})
            .then(res => {
                setIsLogin(false)
                setCurrentUser(null)
                navigate('/login')

            })
            .catch(error => console.log(error.response.data))
    }


    return (
        <AccountPageContainer>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "100px 0 35px",
                borderBottom: "1px solid #dddddd"
            }}>
                <h1>Account</h1>
                <LogoutText
                    onClick={handleLogout}
                >
                    Sign Out
                </LogoutText>
            </div>

            <UserInfo>
                <div>
                    <div>{userFullName}</div>
                    <div>{userEmail}</div>
                    <div>
                        <a href="/account/addresses">
                            View Addresses
                        </a>
                    </div>
                </div>
                <div></div>
            </UserInfo>
        </AccountPageContainer>
    )
}

const AccountPageContainer = styled.div``
const LogoutText = styled.div`
    margin: auto 0;
    cursor: pointer;
    color: rgb(82, 82, 82);
    &:hover {
        text-decoration-line: underline;
        text-decoration-thickness: 2px;
    }
`
const UserInfo = styled.section`
  
`
