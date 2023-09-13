import styled from "styled-components";

export function SearchBar() {
    return (
        <>
            <Input
                type="text"
                defaultValue="Search..."
            />
        </>
    )
}

const Input = styled.input`
    border: none;
`