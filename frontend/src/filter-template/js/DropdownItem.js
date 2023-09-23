import styled from "styled-components";

export function DropdownItem( {option} ) {
    return (
        <DropdownContainer>
            <Checkbox
                type="checkbox"
                id={option}
                name={option}
                value={option}
            />
            <Label htmlFor={option}>{option}</Label>
        </DropdownContainer>
    )
}

const DropdownContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    line-height: 1;
    position: relative;
    padding: 0.5rem  1rem;
    color: #3e3e3e;
    font-size: 16px;
    align-items: center;
  
    &:hover {
        background-color: #f1f2f6;
        color: black;
        cursor: pointer;
    }
`
const Checkbox = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`
const Label = styled.label``

