import {useContext, useState} from "react";
import {UserContext} from "../global/user-context/UserContext";
import styled from "styled-components";
import {EditAddress} from "./EditAddress";
import {DarkButton, LightButton} from "../components/buttons";
import {NewAddress} from "./NewAddress";

export function AddressesPage() {

    const [isEditAddress, setEditAddress] = useState(false)
    const [isNewAddress, setNewAddress] = useState(false)

    const { currentUser, isMobile } = useContext(UserContext)

    const userFullName = currentUser?.first_name + " " + currentUser?.last_name


    function handleEditAddressClick() {
        setEditAddress(!isEditAddress)
        setNewAddress(false)
    }

    function handleNewAddressClick() {
        setEditAddress(false)
        setNewAddress(!isNewAddress)
    }

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
                    <div style={{display: "flex", margin: "12px 0", gap: "12px"}}>
                        <LightButton onClick={handleEditAddressClick}>Edit</LightButton>
                        <LightButton>Delete</LightButton>
                        <DarkButton onClick={handleNewAddressClick}>
                            Add New Address
                        </DarkButton>
                    </div>
                </div>
            </section>
            {isEditAddress && (<EditAddress />)}
            {isNewAddress && (<NewAddress />)}
        </div>
    )
}
