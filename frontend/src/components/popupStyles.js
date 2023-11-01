import styled from "styled-components";

export const ModalContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(83, 92, 104, 0.8);
  z-index: 1000;
  opacity: 1;
`
export const ModalDialog = styled.div`
  position: relative;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%); // ????
  background-color: white;
  border-radius: 4px;
  max-width: 600px;
  z-index: 1001;
  // font-size: 20px;
  line-weight: 1.6;
`
export const ModalContent = styled.div`
  position: relative;
  margin: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 6px;
  outline: 0;
`

export const ModalHeader = styled.div`
  padding: 5px 15px;
  border-bottom: 1px solid #e5e5e5;
`
export const HeaderText = styled.h3`
  text-align: center;
  font-size: 17px;
  line-height: 1.5em;
  margin: 10px 0;
  color: #6d6e70;
`
export const ModalBody = styled.div`
    position: relative;
    padding: 15px;
`
export const BodyText = styled.p`
  margin: 0 0 10px;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  font-size: 1em;
`

export const ModalFooter = styled.div`
  border-radius: 0 0 4px 4px;
  padding: 14px 15px 15px;
  margin-bottom: 0;
  text-align: right;
  border-top: 1px solid #ddd;
`
