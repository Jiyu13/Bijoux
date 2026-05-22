import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import styled from "styled-components";
import {client} from "../helper-functions/fetchFromAPI";

export function CheckoutCancelPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [message, setMessage] = useState("Returning to checkout...")

    useEffect(() => {
        const orderId = searchParams.get('order_id')

        if (!orderId) {
            navigate('/checkout', {replace: true})
            return
        }

        async function cancelCheckoutSession() {
            try {
                await client.post('/orders/checkout-cancel/', {
                    order_id: orderId,
                })
            } catch (error) {
                setMessage(error.response?.data?.error || "Unable to cancel checkout.")
                return
            }

            sessionStorage.removeItem('pending_checkout_order_id')
            navigate('/checkout', {replace: true})
        }

        cancelCheckoutSession()
    }, [navigate, searchParams])

    return (
        <CancelContainer>
            <h1>Checkout Cancelled</h1>
            <p>{message}</p>
        </CancelContainer>
    )
}

const CancelContainer = styled.div`
  width: min(720px, calc(100% - 32px));
  margin: 0 auto 64px;

  p {
    margin: 0;
  }
`
