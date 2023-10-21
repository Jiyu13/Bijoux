import {useContext, useEffect, useState} from "react";
import {UserContext} from "../global/user-context/UserContext";
import {DarkButton} from "../components/buttons";
import {NewAddress} from "./NewAddress";
import {client, fetchFromAPI} from "../helper-functions/fetchFromAPI";
import {Address} from "./Address";

export function AddressesPage() {

    const [editingAddressId, setEditingAddressId] = useState(null)

    const [isNewAddress, setNewAddress] = useState(false)
    const [addresses, setAddresses] = useState(null)

    const { currentUser, isMobile } = useContext(UserContext)


    useEffect(() => {
        fetchFromAPI('/addresses/', setAddresses)
    }, []);


    function handleNewAddressClick() {
        setNewAddress(!isNewAddress)
    }

    function handleEditAddressClick(id) {
        if (editingAddressId === id) {
            setEditingAddressId(null)
        } else {
            setEditingAddressId(id)
        }
        setNewAddress(false)
    }

    function onUpdateAddress(updatedAddress) {
        const updatedAddresses = addresses?.map(address => {
            if (address.id === updatedAddress.id) {
                return updatedAddress
            } else {
                return address
            }
        })

        setAddresses(updatedAddresses)
    }


    function handleDeleteAddressClick(e) {
        const id = parseInt(e.target.value)
        client.delete(`/address/${id}/`, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                onDeleteAddress(id)
            })
            .catch(error => console.log(error.response.data))
    }
    function onDeleteAddress(deleteId) {
        const updatedAddresses = addresses?.filter(address => {
            return address.id !== deleteId
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
                                    handleDeleteAddressClick={handleDeleteAddressClick}
                                />
                        )})}
                    </ul>

                </div>
            </section>


        </div>
    )
}
