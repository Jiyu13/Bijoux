import {useContext, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import styled from "styled-components";
import {DarkButton} from "../components/buttons";
import {client} from "../helper-functions/fetchFromAPI";
import {UserContext} from "../global/user-context/UserContext";

export function CheckoutSuccessPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const {
        setCart,
        setCartItems,
        setTotalCartQuantity,
        setShoppingCartItems,
        setShoppingCartItemQuantity,
    } = useContext(UserContext)
    const [confirmation, setConfirmation] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const sessionId = searchParams.get('session_id')
        const paymentIntentId = searchParams.get('payment_intent')

        if (!sessionId && !paymentIntentId) {
            setError("Missing payment confirmation.")
            return
        }

        async function confirmPayment() {
            try {
                const response = sessionId ?
                    await client.get('/orders/checkout-success/', {
                        params: {session_id: sessionId},
                    })
                    :
                    await client.get('/orders/payment-success/', {
                        params: {payment_intent: paymentIntentId},
                    })
                sessionStorage.removeItem('pending_checkout_order_id')

                if (response.data.order?.status === 'paid') {
                    localStorage.setItem('shopping_cart_items', JSON.stringify([]))
                    setShoppingCartItems([])
                    setShoppingCartItemQuantity(0)
                    setCartItems([])
                    setTotalCartQuantity(0)
                    setCart(prev => prev?.map(cart => ({
                        ...cart,
                        total_quantity: 0,
                        total_cost: 0,
                        cart_items: [],
                    })) || prev)
                }

                setConfirmation(response.data)
            } catch (error) {
                setError(error.response?.data?.error || "Unable to confirm payment.")
            }
        }

        confirmPayment()
    }, [
        searchParams,
        setCart,
        setCartItems,
        setShoppingCartItems,
        setShoppingCartItemQuantity,
        setTotalCartQuantity,
    ])

    const order = confirmation?.order
    const isPaid = order?.status === 'paid'

    return (
        <SuccessContainer>
            {!confirmation && !error && (
                <>
                    <h1>Confirming Payment</h1>
                    <p>Please wait while we confirm your order.</p>
                </>
            )}

            {error && (
                <>
                    <h1>Payment Confirmation Failed</h1>
                    <p>{error}</p>
                </>
            )}

            {confirmation && (
                <>
                    <h1>{isPaid ? "Payment Confirmed" : "Payment Pending"}</h1>
                    <p>
                        {isPaid ?
                            `Thank you. Order #${order.id} has been paid.`
                            :
                            "Stripe has not marked this payment as paid yet."
                        }
                    </p>
                </>
            )}

            <DarkButton type="button" onClick={() => navigate('/')}>
                Continue Shopping
            </DarkButton>
        </SuccessContainer>
    )
}

const SuccessContainer = styled.div`
  width: min(720px, calc(100% - 32px));
  margin: 0 auto 64px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    margin: 0;
  }
`
