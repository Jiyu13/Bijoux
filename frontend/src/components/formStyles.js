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
    border-radius: 4px;
    border-width: 1px;

`

export const SubmitInputButton = styled.input`
    background-color: rgba(40,44,52, 1);
    color: whitesmoke;
    padding: 12px 24px;
    border: none;
    letter-spacing: 0.1rem;
    cursor: pointer;
    transition: .3s ease;
    margin: 2rem 0 2rem;
    border-radius: 4px;
    width: 100%;
  
    //border-radius: 4px;
    //width: 100%;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
    }
`

export const CancelButton = styled.button`
    background: none;
    color: rgb(82, 82, 82);
    padding: 12px 24px;
    border: solid 0.5px #282c34;
    letter-spacing: 0.1rem;
    transition: .3s ease;
    cursor: pointer;
    transition: .3s ease;
    margin: 2rem 0;
    border-radius: 4px;
    box-sizing: border-box;
    
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
    }
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