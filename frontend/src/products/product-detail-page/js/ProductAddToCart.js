import styled from "styled-components";

export function ProductAddToCart() {
    return (
        <ButtonWrapper>
            <ButtonInput type="submit" value="ADD TO CART"/>
        </ButtonWrapper>
    )
}

const ButtonWrapper = styled.div`
  margin: 32px 0;
  width: 100%;
  box-sizing: border-box;
`

const ButtonInput = styled.input`
  padding: 12px;
  //font-size: 12px;
  border: solid 1px;
  background: none;
  width: 100%;
  transition: .2s ease;

  
  &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
  } 
`

