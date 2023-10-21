import {LightButton} from "../components/buttons";
import {EditAddressForm} from "./EditAddressForm";
import styled from "styled-components";
import {client} from "../helper-functions/fetchFromAPI";

export function Address( props ) {

    const {
        address, isEditAddress, handleEditAddressClick,
        setEditingAddressId, onUpdateAddress, handleDeleteAddressClick
    } = props

    const firstName = address?.first_name
    const lastName = address?.last_name
    const addressLine1 = address?.address_line_1
    const addressLine2 = address?.address_line_2
    const city = address?.city
    const country = address?.country
    const isDefault = address?.is_default
    const phone = address?.phone
    const state = address?.state
    const zipCode = address?.zip_code


    return (
        <AddressItem>

            <div style={{marginTop: "12px"}}>
                {isDefault && (
                    <div
                        style={{
                            color: "#c1c1c1",
                            marginBottom: "12px"
                        }}
                    >
                        Default address
                    </div>
                )}
                <div>{firstName} {lastName}</div>
                <div>{addressLine1}</div>

                {addressLine2 && (<div>{addressLine2}</div>)}

                <div>{city}, {state}, {zipCode}</div>
                <div>{country}</div>

                <div style={{display: "flex", gap: "12px"}}>
                    <LightButton
                        value={address.id}
                        onClick={handleEditAddressClick}
                    >
                        Edit
                    </LightButton>
                    <LightButton
                        value={address.id}
                        onClick={handleDeleteAddressClick}
                    >
                        Delete
                    </LightButton>

                </div>
            </div>
            {isEditAddress && (
                <EditAddressForm
                    address={address}
                    setEditingAddressId={setEditingAddressId}
                    onUpdateAddress={onUpdateAddress}
                />
            )}

        </AddressItem>
    )
}

const AddressItem = styled.li`
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-top: 1px solid #dddddd;
    margin: 24px 0;
  
    //&:last-child {
    //  border-bottom: 1px solid #dddddd;
    //}
`