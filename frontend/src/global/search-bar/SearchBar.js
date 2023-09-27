import styled from "styled-components";

import search_black_24dp from "./icons/search_black_24dp.svg"

export function SearchBar() {
    return (
        <InputContainer>
            <Img src={search_black_24dp} />
            <Input
                type="text"
                defaultValue="Search..."
            />
        </InputContainer>
    )
}

const InputContainer = styled.div`
  //height: 100%;
  //display: flex;
  box-sizing: border-box;
  display: flex;
  //border: solid 1px black;
  background-color: rgb(169,169,169, 0.2);
  border-radius: 8px;
  
`
const Img = styled.img`
  margin: 8px;
`
const Input = styled.input`
  border: none;
  font-size: 1rem;
  background: none;
  width: 100%;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`