import styled from "styled-components";

export function SearchBar() {
    return (
        // <InputContainer>
            <Input
                type="text"
                defaultValue="Search..."
            />
        // </InputContainer>
    )
}

const InputContainer = styled.div`
  //height: 100%;
  //display: flex;
  //box-sizing: border-box;
`

const Input = styled.input`
  border: none;
  font-size: 1rem;
  //&:hover {
  //  border-bottom: solid 1px black;
  //}
  //&:focus {
  //  border-bottom: solid 1px black;
  //}
`