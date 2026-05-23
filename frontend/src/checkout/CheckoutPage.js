import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {DarkButton} from "../components/buttons";
import {UserContext} from "../global/user-context/UserContext";
import {client, formatCheckoutItems} from "../helper-functions/fetchFromAPI";
import {EmbeddedPaymentForm} from "./EmbeddedPaymentForm";

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
    const {isLogin, currentUser, cart, shoppingCartItems} = useContext(UserContext)
    const [shippingInfo, setShippingInfo] = useState(initialShippingInfo)
    const touchedFieldsRef = useRef({})
    const [publishableKey, setPublishableKey] = useState("")
    const [orderId, setOrderId] = useState(null)
    const [clientSecret, setClientSecret] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const stripePromise = useMemo(() => {
        return publishableKey ? loadStripe(publishableKey) : null
    }, [publishableKey])

    const cartItems = isLogin ? cart?.[0]?.cart_items || [] : shoppingCartItems || []
    const checkoutItems = formatCheckoutItems(cartItems)
    const isCartEmpty = checkoutItems.length === 0
    const requiredFields = ['email', 'first_name', 'last_name', 'address_line_1', 'city', 'state', 'zip_code', 'country']
    const isShippingComplete = requiredFields.every(field => shippingInfo[field])
    const isPaymentReady = Boolean(clientSecret)
    const orderTotal = cartItems.reduce((total, item) => {
        const price = item.product?.product_price || item.product_price || 0
        return total + price * item.quantity
    }, 0)
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

    const paymentElementOptions = useMemo(() => ({
        clientSecret,
        appearance: {
            theme: 'stripe',
            variables: {
                borderRadius: '2px',
                colorPrimary: '#1f1f1f',
                colorText: '#1f1f1f',
                colorDanger: '#a00000',
                fontFamily: 'Arial, sans-serif',
                spacingUnit: '4px',
            },
        },
    }), [clientSecret])

    const applyShippingPrefill = useCallback((prefillData) => {
        setShippingInfo(prev => {
            return Object.entries(prefillData).reduce((updatedShippingInfo, [field, value]) => {
                if (!value || touchedFieldsRef.current[field]) {
                    return updatedShippingInfo
                }

                return {
                    ...updatedShippingInfo,
                    [field]: value,
                }
            }, prev)
        })
    }, [])

    useEffect(() => {
        async function getStripeConfig() {
            try {
                const response = await client.get('/stripe/config/')
                if (!response.data.publishable_key) {
                    setError("Stripe publishable key is missing.")
                    return
                }
                setPublishableKey(response.data.publishable_key)
            } catch (error) {
                setError(error.response?.data?.error || "Unable to load payment settings.")
            }
        }

        getStripeConfig()
    }, [])

    useEffect(() => {
        if (!isLogin || !currentUser) {
            return
        }

        applyShippingPrefill({
            email: currentUser.email,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
        })
    }, [isLogin, currentUser, applyShippingPrefill])

    useEffect(() => {
        if (!isLogin) {
            return
        }

        async function prefillDefaultAddress() {
            try {
                const response = await client.get('/addresses/')
                const addresses = response.data || []
                const defaultAddress = addresses.find(address => address.is_default) || addresses[0]

                if (!defaultAddress) {
                    return
                }

                applyShippingPrefill({
                    first_name: defaultAddress.first_name,
                    last_name: defaultAddress.last_name,
                    phone: defaultAddress.phone,
                    address_line_1: defaultAddress.address_line_1,
                    address_line_2: defaultAddress.address_line_2,
                    city: defaultAddress.city,
                    state: defaultAddress.state,
                    zip_code: defaultAddress.zip_code,
                    country: defaultAddress.country,
                })
            } catch (error) {
                console.log(error.response || error)
            }
        }

        prefillDefaultAddress()
    }, [isLogin, applyShippingPrefill])

    useEffect(() => {
        const pendingCheckoutOrderId = sessionStorage.getItem('pending_checkout_order_id')

        if (!pendingCheckoutOrderId) {
            return
        }

        async function cancelPendingCheckoutOrder() {
            try {
                await client.post('/orders/checkout-cancel/', {
                    order_id: pendingCheckoutOrderId,
                })
            } catch (error) {
                console.log(error.response || error)
            } finally {
                sessionStorage.removeItem('pending_checkout_order_id')
            }
        }

        cancelPendingCheckoutOrder()
    }, [])

    function handleChange(e) {
        const {name, value} = e.target
        touchedFieldsRef.current[name] = true
        setShippingInfo(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleEditShipping() {
        if (orderId) {
            try {
                await client.post('/orders/checkout-cancel/', {
                    order_id: orderId,
                })
            } catch (error) {
                console.log(error.response || error)
            }
        }

        sessionStorage.removeItem('pending_checkout_order_id')
        setOrderId(null)
        setClientSecret("")
    }

    async function handlePreparePayment() {
        setError("")

        if (isCartEmpty) {
            setError("Your cart is empty.")
            return
        }

        if (!isShippingComplete) {
            setError("Please complete the required shipping fields.")
            return
        }

        if (!publishableKey) {
            setError("Payment settings are not ready.")
            return
        }

        setIsSubmitting(true)

        try {
            const orderResponse = await client.post('/orders/', {
                cart_items: checkoutItems,
                shipping_info: shippingInfo,
            })

            const paymentIntentResponse = await client.post(`/orders/${orderResponse.data.id}/payment-intent/`, {})

            setOrderId(orderResponse.data.id)
            setClientSecret(paymentIntentResponse.data.client_secret)
            sessionStorage.setItem('pending_checkout_order_id', orderResponse.data.id)
        } catch (error) {
            setError(error.response?.data?.error || "Checkout failed.")
        } finally {
            setIsSubmitting(false)
        }
    }

    function formatCurrency(value) {
        return Number(value || 0).toFixed(2)
    }

    function getProductImage(item) {
        return item.product?.product_img || item.product_image || item.product?.product_image
    }

    function getProductTitle(item) {
        return item.product?.product_title || item.product_title
    }

    function getProductPrice(item) {
        return item.product?.product_price || item.product_price || 0
    }

    return (
        <CheckoutContainer>
            <CheckoutTopBar>
                <BrandLink type="button" onClick={() => navigate('/')}>Bijoux</BrandLink>
                <TopBarActions>
                    <span>{totalQuantity} {totalQuantity === 1 ? "item" : "items"}</span>
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                </TopBarActions>
            </CheckoutTopBar>

            <CheckoutGrid>
                <CheckoutMain>
                    <CheckoutTitle>
                        <h1>Bijoux Checkout</h1>
                    </CheckoutTitle>

                    <CheckoutSection>
                        <SectionHeader>
                            <h2>Contact</h2>
                            {isPaymentReady && (
                                <TextButton type="button" onClick={handleEditShipping}>Edit</TextButton>
                            )}
                        </SectionHeader>

                        <FieldGroup>
                            <label>Email</label>
                            <input
                                name="email"
                                type="email"
                                value={shippingInfo.email}
                                onChange={handleChange}
                                disabled={isPaymentReady}
                                required
                            />
                        </FieldGroup>
                    </CheckoutSection>

                    <CheckoutSection>
                        <h2>Delivery</h2>

                        <TwoColumn>
                            <FieldGroup>
                                <label>First name</label>
                                <input name="first_name" value={shippingInfo.first_name} onChange={handleChange} disabled={isPaymentReady} required />
                            </FieldGroup>
                            <FieldGroup>
                                <label>Last name</label>
                                <input name="last_name" value={shippingInfo.last_name} onChange={handleChange} disabled={isPaymentReady} required />
                            </FieldGroup>
                        </TwoColumn>

                        <FieldGroup>
                            <label>Phone</label>
                            <input name="phone" value={shippingInfo.phone} onChange={handleChange} disabled={isPaymentReady} />
                        </FieldGroup>

                        <FieldGroup>
                            <label>Address</label>
                            <input name="address_line_1" value={shippingInfo.address_line_1} onChange={handleChange} disabled={isPaymentReady} required />
                        </FieldGroup>

                        <FieldGroup>
                            <label>Apartment, suite, etc.</label>
                            <input name="address_line_2" value={shippingInfo.address_line_2} onChange={handleChange} disabled={isPaymentReady} />
                        </FieldGroup>

                        <TwoColumn>
                            <FieldGroup>
                                <label>City</label>
                                <input name="city" value={shippingInfo.city} onChange={handleChange} disabled={isPaymentReady} required />
                            </FieldGroup>
                            <FieldGroup>
                                <label>State</label>
                                <input name="state" value={shippingInfo.state} onChange={handleChange} disabled={isPaymentReady} required />
                            </FieldGroup>
                        </TwoColumn>

                        <TwoColumn>
                            <FieldGroup>
                                <label>ZIP code</label>
                                <input name="zip_code" value={shippingInfo.zip_code} onChange={handleChange} disabled={isPaymentReady} required />
                            </FieldGroup>
                            <FieldGroup>
                                <label>Country</label>
                                <input name="country" value={shippingInfo.country} onChange={handleChange} disabled={isPaymentReady} required />
                            </FieldGroup>
                        </TwoColumn>
                    </CheckoutSection>

                    <CheckoutSection>
                        <h2>Shipping method</h2>
                        <ShippingNotice>Shipping is calculated after address review.</ShippingNotice>
                    </CheckoutSection>

                    <CheckoutSection>
                        <h2>Payment</h2>
                        <PaymentHelp>All transactions are secure and encrypted.</PaymentHelp>

                        <PaymentPanel>
                            <PaymentPanelHeader>
                                <span>Credit card</span>
                                <CardBrands aria-label="Accepted cards">
                                    <span>Visa</span>
                                    <span>Mastercard</span>
                                    <span>Amex</span>
                                </CardBrands>
                            </PaymentPanelHeader>

                        {!isPaymentReady && (
                            <PaymentPlaceholder>
                                <PlaceholderLine>Card fields will appear here after contact and delivery are ready.</PlaceholderLine>
                                <PayButton
                                    type="button"
                                    onClick={handlePreparePayment}
                                    disabled={isSubmitting || isCartEmpty || !isShippingComplete}
                                >
                                    {isSubmitting ? "Preparing payment..." : "Continue to payment"}
                                </PayButton>
                            </PaymentPlaceholder>
                        )}

                        {stripePromise && clientSecret && (
                            <Elements stripe={stripePromise} options={paymentElementOptions}>
                                <EmbeddedPaymentForm
                                    orderId={orderId}
                                    disabled={isCartEmpty}
                                    onError={setError}
                                />
                            </Elements>
                        )}
                        </PaymentPanel>
                    </CheckoutSection>

                    {error && <ErrorText>{typeof error === 'string' ? error : JSON.stringify(error)}</ErrorText>}
                </CheckoutMain>

                <OrderSummary>
                    <SummaryHeader>
                        <h2>Order summary</h2>
                        <span>${formatCurrency(orderTotal)}</span>
                    </SummaryHeader>
                    <SummaryItems>
                    {cartItems.map((item, index) => {
                        const productTitle = getProductTitle(item)
                        const price = getProductPrice(item)
                        const productImage = getProductImage(item)

                        return (
                            <SummaryItem key={`${item.product?.product_id || item.product_id}-${index}`}>
                                <ImageWrap>
                                    {productImage && <img src={productImage} alt={productTitle}/>}
                                    <QuantityBadge>{item.quantity}</QuantityBadge>
                                </ImageWrap>
                                <ItemCopy>
                                    <span>{productTitle}</span>
                                </ItemCopy>
                                <ItemPrice>${formatCurrency(price * item.quantity)}</ItemPrice>
                            </SummaryItem>
                        )
                    })}
                    </SummaryItems>
                    <DiscountRow>
                        <input placeholder="Discount code or gift card" />
                        <button type="button">Apply</button>
                    </DiscountRow>
                    <MoneyRow>
                        <span>Subtotal</span>
                        <span>${formatCurrency(orderTotal)}</span>
                    </MoneyRow>
                    <MoneyRow>
                        <span>Shipping</span>
                        <span>Enter shipping address</span>
                    </MoneyRow>
                    <SummaryTotal>
                        <span>Total</span>
                        <strong>USD ${formatCurrency(orderTotal)}</strong>
                    </SummaryTotal>
                </OrderSummary>
            </CheckoutGrid>
        </CheckoutContainer>
    )
}

const CheckoutContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  background-color: #ffffff;
  color: #1f1f1f;
`

const CheckoutTopBar = styled.header`
  box-sizing: border-box;
  width: 100%;
  padding: 28px 72px;
  border-bottom: 1px solid #e6e2dc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;

  button {
    border: 0;
    background: none;
    cursor: pointer;
  }

  @media (max-width: 800px) {
    padding: 22px 20px;
  }
`

const BrandLink = styled.button`
  border: 0;
  background: none;
  padding: 0;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
`

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #555555;
`

const CheckoutGrid = styled.div`
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto;
  padding: 56px 0 72px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 420px);
  gap: 48px;
  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    padding-top: 32px;
  }
`

const CheckoutMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
`

const CheckoutTitle = styled.div`
  h1 {
    margin: 0;
    font-size: 1.65rem;
    font-weight: 500;
  }
`

const CheckoutSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 32px;
  border-bottom: 1px solid #e6e2dc;

  h2 {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 500;
  }
`

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    color: #4f4b46;
    font-size: 0.95rem;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    min-height: 48px;
    padding: 12px 14px;
    border: 1px solid #cfc8c0;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #ffffff;
  }

  input:disabled {
    background-color: #f7f7f7;
    color: #555555;
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
  box-sizing: border-box;
  border-left: 1px solid #e6e2dc;
  background-color: #f7f5f2;
  padding: 32px;
  align-self: start;
  position: sticky;
  top: 32px;
  min-height: calc(100vh - 64px);

  h2 {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 500;
  }

  @media (max-width: 800px) {
    position: static;
    min-height: auto;
    border-left: 0;
  }
`

const SummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-bottom: 24px;
`

const SummaryItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-bottom: 24px;
  border-bottom: 1px solid #ded8d0;
`

const SummaryItem = styled.div`
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
`

const ImageWrap = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border: 1px solid #ded8d0;
  border-radius: 8px;
  background-color: #ffffff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`

const QuantityBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background-color: #5f5a54;
  color: #ffffff;
  font-size: 0.8rem;
  line-height: 22px;
  text-align: center;
`

const ItemCopy = styled.div`
  min-width: 0;

  span {
    display: block;
    line-height: 1.35;
  }
`

const ItemPrice = styled.div`
  white-space: nowrap;
`

const DiscountRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  padding: 24px 0;
  border-bottom: 1px solid #ded8d0;

  input {
    box-sizing: border-box;
    min-height: 46px;
    padding: 12px;
    border: 1px solid #cfc8c0;
    border-radius: 4px;
    background-color: #ffffff;
  }

  button {
    min-height: 46px;
    padding: 0 18px;
    border: 0;
    border-radius: 4px;
    background-color: #d8d2ca;
    cursor: pointer;
  }
`

const MoneyRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 16px;
  color: #4f4b46;
`

const ErrorText = styled.div`
  color: #a00000;
`

const PayButton = styled(DarkButton)`
  width: 100%;
  margin: 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`

const TextButton = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
  text-decoration: underline;
`

const ShippingNotice = styled.div`
  border: 1px solid #ded8d0;
  border-radius: 4px;
  padding: 14px;
  color: #555555;
  background-color: #faf9f7;
`

const PaymentHelp = styled.p`
  margin: 0;
  color: #555555;
`

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
  font-size: 1.25rem;
`

const PaymentPanel = styled.div`
  border: 1px solid #cfc8c0;
  border-radius: 6px;
  overflow: hidden;
`

const PaymentPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #e6e2dc;
  background-color: #faf9f7;
`

const CardBrands = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  span {
    border: 1px solid #cfc8c0;
    border-radius: 3px;
    padding: 3px 6px;
    background-color: #ffffff;
    font-size: 0.75rem;
  }
`

const PaymentPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
`

const PlaceholderLine = styled.div`
  color: #605b55;
`
