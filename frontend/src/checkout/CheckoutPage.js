import {useContext, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {DarkButton} from "../components/buttons";
import {UserContext} from "../global/user-context/UserContext";
import {client, formatCheckoutItems, redirectToOrderCheckout} from "../helper-functions/fetchFromAPI";

const initialShippingInfo = {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
}

export function CheckoutPage() {
    const navigate = useNavigate()
    const {isLogin, cart, shoppingCartItems} = useContext(UserContext)
    const [shippingInfo, setShippingInfo] = useState(initialShippingInfo)
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const cartItems = isLogin ? cart?.[0]?.cart_items || [] : shoppingCartItems || []
    const checkoutItems = formatCheckoutItems(cartItems)
    const isCartEmpty = checkoutItems.length === 0
    const requiredFields = ['email', 'first_name', 'last_name', 'address_line_1', 'city', 'state', 'zip_code', 'country']
    const isShippingComplete = requiredFields.every(field => shippingInfo[field])

    function handleChange(e) {
        const {name, value} = e.target
        setShippingInfo(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        if (isCartEmpty) {
            setError("Your cart is empty.")
            return
        }

        if (!isShippingComplete) {
            setError("Please complete the required shipping fields.")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await client.post('/orders/', {
                cart_items: checkoutItems,
                shipping_info: shippingInfo,
            })

            await redirectToOrderCheckout(response.data.id, setError)
        } catch (error) {
            setError(error.response?.data?.error || "Checkout failed.")
            setIsSubmitting(false)
        }
    }

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <h1>Checkout</h1>
                <button type="button" onClick={() => navigate(-1)}>Back</button>
            </CheckoutHeader>

            <CheckoutGrid>
                <ShippingForm onSubmit={handleSubmit}>
                    <h2>Shipping</h2>

                    <FieldGroup>
                        <label>Email</label>
                        <input name="email" type="email" value={shippingInfo.email} onChange={handleChange} required />
                    </FieldGroup>

                    <TwoColumn>
                        <FieldGroup>
                            <label>First name</label>
                            <input name="first_name" value={shippingInfo.first_name} onChange={handleChange} required />
                        </FieldGroup>
                        <FieldGroup>
                            <label>Last name</label>
                            <input name="last_name" value={shippingInfo.last_name} onChange={handleChange} required />
                        </FieldGroup>
                    </TwoColumn>

                    <FieldGroup>
                        <label>Phone</label>
                        <input name="phone" value={shippingInfo.phone} onChange={handleChange} />
                    </FieldGroup>

                    <FieldGroup>
                        <label>Address</label>
                        <input name="address_line_1" value={shippingInfo.address_line_1} onChange={handleChange} required />
                    </FieldGroup>

                    <FieldGroup>
                        <label>Apartment, suite, etc.</label>
                        <input name="address_line_2" value={shippingInfo.address_line_2} onChange={handleChange} />
                    </FieldGroup>

                    <TwoColumn>
                        <FieldGroup>
                            <label>City</label>
                            <input name="city" value={shippingInfo.city} onChange={handleChange} required />
                        </FieldGroup>
                        <FieldGroup>
                            <label>State</label>
                            <input name="state" value={shippingInfo.state} onChange={handleChange} required />
                        </FieldGroup>
                    </TwoColumn>

                    <TwoColumn>
                        <FieldGroup>
                            <label>ZIP code</label>
                            <input name="zip_code" value={shippingInfo.zip_code} onChange={handleChange} required />
                        </FieldGroup>
                        <FieldGroup>
                            <label>Country</label>
                            <input name="country" value={shippingInfo.country} onChange={handleChange} required />
                        </FieldGroup>
                    </TwoColumn>

                    {error && <ErrorText>{typeof error === 'string' ? error : JSON.stringify(error)}</ErrorText>}

                    <PayButton type="submit" disabled={isSubmitting || isCartEmpty || !isShippingComplete}>
                        {isSubmitting ? "Redirecting..." : "Pay"}
                    </PayButton>
                </ShippingForm>

                <OrderSummary>
                    <h2>Order Summary</h2>
                    {cartItems.map((item, index) => {
                        const productTitle = item.product?.product_title || item.product_title
                        const price = item.product?.product_price || item.product_price

                        return (
                            <SummaryRow key={`${item.product?.product_id || item.product_id}-${index}`}>
                                <span>{productTitle} x {item.quantity}</span>
                                <span>${price * item.quantity}</span>
                            </SummaryRow>
                        )
                    })}
                </OrderSummary>
            </CheckoutGrid>
        </CheckoutContainer>
    )
}

const CheckoutContainer = styled.div`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto 64px;
`

const CheckoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  button {
    border: 0;
    background: none;
    cursor: pointer;
  }
`

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 32px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const ShippingForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
    border: 1px solid #c8c8c8;
  }
`

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const OrderSummary = styled.aside`
  border: 1px solid #e0e0e0;
  padding: 20px;
  align-self: start;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #eeeeee;
`

const ErrorText = styled.div`
  color: #a00000;
`

const PayButton = styled(DarkButton)`
  margin: 8px 0 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`
