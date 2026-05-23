import {useState} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import styled from "styled-components";
import {DarkButton} from "../components/buttons";

export function EmbeddedPaymentForm({orderId, disabled, onError}) {
    const stripe = useStripe()
    const elements = useElements()
    const [isPaying, setIsPaying] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (!stripe || !elements || disabled) {
            return
        }

        setIsPaying(true)
        onError("")

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success?order_id=${orderId}`,
            },
        })

        if (error) {
            onError(error.message || "Payment failed.")
            setIsPaying(false)
        }
    }

    return (
        <PaymentForm onSubmit={handleSubmit}>
            <PaymentElement />
            <PayButton type="submit" disabled={!stripe || !elements || disabled || isPaying}>
                {isPaying ? "Processing..." : "Pay now"}
            </PayButton>
        </PaymentForm>
    )
}

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`

const PayButton = styled(DarkButton)`
  margin: 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`
