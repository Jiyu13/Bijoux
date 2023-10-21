import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../global/user-context/UserContext";
import {client, fetchFromAPI} from "../helper-functions/fetchFromAPI";
import {useNavigate} from "react-router-dom";

export function AccountPage() {

    const { currentUser, setCurrentUser, setIsLogin, isMobile, isTablet} = useContext(UserContext)


    const userFullName = currentUser?.first_name + " " + currentUser?.last_name
    const userEmail = currentUser?.email


    let navigate = useNavigate()
    function handleLogout() {
        client.post('/logout/', {withCredentials: true})
            .then(res => {
                setIsLogin(false)
                setCurrentUser(null)
                navigate('/login')

            })
            .catch(error => console.log(error.response.data))
    }


    return (
        <AccountPageContainer style={{margin: isMobile ? "0 16px" : ""}}>
            <div style={{
                // display: "flex",
                // justifyContent: "space-between",
                padding: "100px 0 35px",
                // borderBottom: "1px solid #dddddd"
            }}>
                <h1>Account</h1>
                <LogoutText onClick={handleLogout}>
                    Sign Out
                </LogoutText>
            </div>

            <UserInfo
                style={{
                    flexDirection: isMobile ? "column" : "row",

                }}
            >
                <div style={{marginRight: "24px"}}>
                    <h3>Account Details</h3>
                    <InfoField>{userFullName}</InfoField>
                    <InfoField>{userEmail}</InfoField>
                    <InfoField style={{marginTop: "36px"}}>
                        <ViewAddressLink href="/account/addresses">
                            View Addresses
                            {/*({addresses?.length})*/}
                        </ViewAddressLink>
                    </InfoField>
                </div>
                <div>
                    <h3>
                        Orders
                    </h3>
                    <div>You haven't placed any orders yet.</div>
                </div>
            </UserInfo>
        </AccountPageContainer>
    )
}

const AccountPageContainer = styled.div`
  //width: 85%;
`
const LogoutText = styled.div`
    margin: auto 0;
    cursor: pointer;
    color: rgb(82, 82, 82);
    font-size: 0.875rem;
    text-decoration-line: underline;
    text-underline-offset: 0.3rem;
  
    &:hover {
        text-decoration-line: underline;
        text-decoration-thickness: 2px;
    }
`
const UserInfo = styled.section`
  display: flex;
  gap: 12px;
`

const InfoField = styled.div`
  margin: 12px 0;
`

const ViewAddressLink = styled.a`
  color: rgb(82, 82, 82);
  font-size: 0.875rem;
  text-underline-offset: 0.3rem;
  &:hover {
        text-decoration-line: underline;
        text-decoration-thickness: 2px;
  }
`