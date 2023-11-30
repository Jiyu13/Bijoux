import styled from "styled-components";

export function ProductMaterial() {
    return (
        <MaterialContainer className="material-radio-toolbar">
            <Title>Material</Title>
            <MaterialOptions>
                <OptionWrapper>
                    <OptionLabel htmlFor="Silver" >Silver</OptionLabel>
                    <OptionInput
                        type="checkbox"
                        id="Silver"
                        name="Sliver"
                    />
                </OptionWrapper>
                <OptionWrapper >
                    <OptionLabel htmlFor="Stainless Steel">Stainless Steel</OptionLabel>
                    <OptionInput
                        type="checkbox"
                        id="Stainless Steel"
                        name="Stainless Steel"
                    />
                </OptionWrapper>
            </MaterialOptions>
        </MaterialContainer>
    )
}

const MaterialContainer = styled.div`
    margin: 20px 0;
`
const Title = styled.div`
    color: rgba(40,44,52, 0.6);
    font-size: 0.9rem;
`
const MaterialOptions = styled.div`
    display: flex;
    gap: 6px;
    margin: 6px 0 24px;
`

const OptionWrapper = styled.div`
    //background-color: rgba(40,44,52, 0.8);
    padding: 8px 12px;
    border: solid 1px;
    //width: fit-content;
    &:hover {
      background-color: rgba(40,44,52, 1);
      color: whitesmoke;
    }
`

const OptionLabel = styled.label``
const OptionInput = styled.input`
    opacity: 0;
    position: fixed;
    width: 0;
`