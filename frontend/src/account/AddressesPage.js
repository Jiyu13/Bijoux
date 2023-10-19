import {useContext} from "react";
import {UserContext} from "../global/user-context/UserContext";
import styled from "styled-components";

export function AddressesPage() {

    const { currentUser, isMobile } = useContext(UserContext)

    const userFullName = currentUser?.first_name + " " + currentUser?.last_name


    return (
        <div style={{margin: isMobile ? "0 16px" : "0 auto"}}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "100px 0 35px",
                // borderBottom: "1px solid #dddddd"
            }}>
                <h1>Addresses</h1>
            </div>

            <section>
                <div>
                    <div>{userFullName} (Default address)</div>
                    <div>
                        address
                    </div>
                    <div style={{display: "flex", margin: "12px 0"}}>
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </div>
                   <Button
                       style={{
                           backgroundColor: "rgba(40,44,52, 1)",
                           margin: "12px 0",
                           color: "whitesmoke"
                       }}
                   >
                        Add New Address
                    </Button>

                </div>
            </section>
        </div>
    )
}


const Button = styled.button`
  padding: 12px 24px;
  border: solid 1px #282c34;
  transition: .3s ease;
  cursor: pointer;
  margin-right: 12px;
  background: none;
  &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
  }
`