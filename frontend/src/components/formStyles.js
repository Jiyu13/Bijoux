import styled from "styled-components";


export const FormPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(82, 82, 82);
    margin: 0 auto;
    boxSizing: border-box;
`

export const FormWrapper = styled.div`
  padding: 25px 0 100px;
`
export const Form = styled.form``

export const FieldBox = styled.div`
  //margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`
export const FormLabel = styled.label`
    margin-bottom: 0.8rem;
    color: rgb(82, 82, 82);
    font-size: 0.8rem;
    margin-bottom: 0.2rem
`

export const FormInput = styled.input`
    margin-bottom: 1rem;
    padding: 10px 12px;
    font-size: 1.2rem;
    //border-radius: 4px;
    border-width: 1px;

`



export const FormHeader = styled.h3`
  margin: 12px 0 42px;
`

export const NameFieldBox = styled.div`
    display: flex;
`

// =============== link style ===============================
export const CustomLink = styled.a`
    &:hover {
        text-decoration-line: underline;
        text-decoration-thickness: 2px;
    }
`

// ============== select & options ===========================
export const SelectBox = styled.select`
    margin-bottom: 1rem;
    padding: 12px 12px;
    font-size: 1.2rem;
    //border-radius: 4px;
    border-width: 1px;
    font-size: 0.9rem;
`

export const OptionBox = styled.option`
    font-size: 0.8rem;
`