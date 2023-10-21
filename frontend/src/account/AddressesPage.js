import {useContext, useEffect, useState} from "react";
import {UserContext} from "../global/user-context/UserContext";
import {DarkButton} from "../components/buttons";
import {NewAddress} from "./NewAddress";
import {fetchFromAPI} from "../helper-functions/fetchFromAPI";
import {Address} from "./Address";

export function AddressesPage() {

    const [editingAddressId, setEditingAddressId] = useState(null)

    const [isNewAddress, setNewAddress] = useState(false)
    const [addresses, setAddresses] = useState(null)

    const { currentUser, isMobile } = useContext(UserContext)


    useEffect(() => {
        fetchFromAPI('/addresses/', setAddresses)
    }, []);


    function handleEditAddressClick(id) {
        if (editingAddressId === id) {
            setEditingAddressId(null)
        } else {
            setEditingAddressId(id)
        }
        setNewAddress(false)
    }

    function handleNewAddressClick() {
        setNewAddress(!isNewAddress)
    }

    function onUpdateAddress(updatedAddress) {
        const updatedAddresses = addresses.map(address => {
            if (address.id === updatedAddress.id) {
                return updatedAddress
            } else {
                return address
            }
        })

        setAddresses(updatedAddresses)
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

                    <DarkButton onClick={handleNewAddressClick}>
                        Add New Address
                    </DarkButton>

                    {isNewAddress && (<NewAddress />)}

                    <ul style={{paddingLeft: "0", listStyle: "none"}}>
                        {addresses?.map((address, index) => {
                            return (
                                <Address
                                    key={`${currentUser?.first_name}-${index}`}
                                    address={address}
                                    isEditAddress={editingAddressId === address.id}
                                    handleEditAddressClick={() => handleEditAddressClick(address.id)}
                                    setEditingAddressId={setEditingAddressId}
                                    onUpdateAddress={onUpdateAddress}
                                />
                        )})}
                    </ul>

                </div>
            </section>


        </div>
    )
}
