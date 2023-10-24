import styled from "styled-components";

export const DarkButton = styled.button`
    background-color: rgba(40,44,52, 1);
    color: whitesmoke;
    padding: 12px 24px;
    border: none;
    letter-spacing: 0.1rem;
    cursor: pointer;
    transition: .3s ease;
    margin: 2rem 0;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
    }
`

export const LightButton = styled.button`
    background: none;
    color: rgb(82, 82, 82);
    padding: 12px 24px;
    border: solid 0.5px #282c34;
    letter-spacing: 0.1rem;
    transition: .3s ease;
    cursor: pointer;
    transition: .3s ease;
    margin: 2rem 0;
    box-sizing: border-box;
    
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
    }
`