import styled from "styled-components";

export const ModalContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  //right: 0;
  //bottom: 0;
  background: rgba(83, 92, 104, 0.5);
  opacity: 1;
  box-sizing: border-box;
`
export const ModalDialog = styled.div`
  position: relative;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%); // ????
  background-color: white;
  border-radius: 4px;
  z-index: 1001;
  line-weight: 1.6;
`
export const ModalContent = styled.div`
  position: relative;
  margin: auto;
  background-color: #fff;
  background-clip: padding-box;
  //border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 6px;
  outline: 0;
`

export const ModalHeader = styled.div`
  padding: 20px 15px 5px;
  //border-bottom: 1px solid #e5e5e5;
`
export const HeaderText = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5em;
  margin: 0;
  color: #6d6e70;
`
export const ModalBody = styled.div`
    //height: calc(100% - 160px);
    //overflow-y: scroll;
    //position: relative;
    //display: flex;
    //flex-direction: column;
    //flex: 1 1 auto;
    padding: 0 15px 15px;
    //overflow-y: visible; not working
`
export const BodyText = styled.p`
  margin: 0 0 10px;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  font-size: 1em;
`

export const ModalFooter = styled.div`
  box-sizing: border-box;
  //border-radius: 0 0 4px 4px;
  padding: 20px 16px;
  margin-bottom: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  //height: 180px;
  background-color: white;
  //text-align: right;
  //border-top: 1px solid #ddd;
`
