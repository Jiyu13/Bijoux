import styled from "styled-components";
import account_circle_black_24 from "./icons/account_circle_black_24dp.svg"
import expand_more_black_24 from "./icons/expand_more_black_24dp.svg"
import shopping_cart_black from "./icons/shopping_cart_black_24dp.svg"


export function Accessibility() {
    return (
        <Container>
            <ContainerItem>
                <Img src={account_circle_black_24} alt="account icon" />
                <UserName>Hi, ziru!</UserName>
                <Img src={expand_more_black_24} alt="dropdown icon"/>
            </ContainerItem>
            <ContainerItem>
                <Img src={shopping_cart_black} alt="dropdown icon"/>
            </ContainerItem>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const ContainerItem = styled.div`
    margin-right: 12px;
    display: flex;
`

const Img = styled.img`
  transition: all .2s ease-in-out;
  width: 32px;
  &:hover {
    transform: scale(1.2);
  }
`

const UserName = styled.div`
  margin: auto 10px;
`