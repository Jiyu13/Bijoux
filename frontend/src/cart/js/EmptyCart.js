import styled from "styled-components";

export function EmptyCart() {
    return (
        <EmptyCartContainer>
            <h3>Your cart is Empty!</h3>
            <div style={{color: "#6d6e70", fontSize: "0.8rem", lineHeight: "1.4rem"}}>Add your favourite items to your cart.</div>
            <div style={{margin: "2rem auto 2rem"}}>
                <ToShopLink href='/shop'>Shop Now</ToShopLink>
            </div>
        </EmptyCartContainer>
    )
}

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: auto 0;
  padding: 40px 20px;
  width: 100%;
  text-align: center;
`

const ToShopLink = styled.a`
  text-decoration: none;
  background-color: rgba(40,44,52, 1);
  color: whitesmoke;
  padding: 12px 24px;
`