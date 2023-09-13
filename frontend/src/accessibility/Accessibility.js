import styled from "styled-components";
import account_circle_black_24 from "./icons/account_circle_black_24dp.svg"
import expand_more_black_24 from "./icons/expand_more_black_24dp.svg"
import shopping_cart_black from "./icons/shopping_cart_black_24dp.svg"


export function Accessibility() {
    return (
        <Container>
            <ContainerItem>
                <img src={account_circle_black_24} alt="account icon" />
                <img src={expand_more_black_24} alt="dropdown icon"/>
            </ContainerItem>
            <ContainerItem>
                <img src={shopping_cart_black} alt="dropdown icon"/>
            </ContainerItem>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    //grid-template-columns: 2fr 1fr;
    justify-content: flex-end;
    align-items: center;
`

const ContainerItem = styled.div`
    margin-right: 12px;
`