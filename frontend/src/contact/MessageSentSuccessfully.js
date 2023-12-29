import { ModalContent} from "../components/popupStyles";

export function MessageSentSuccessfully() {
    return (
        // <ModalContainer>
        //     <ModalDialog>
        //         <ModalContent style={{padding: "24px 24px 1rem 24px", textAlign: "center"}}>
        //             <h2>Message Sent Successfully!</h2>
        //             <p>We'll get back to you as soon as possible.</p>
        //             <ModalFooter style={{padding: "0px", marginTop: "24px"}}>
        //                 <DarkButton style={{margin: "1rem 0px 0px 0px"}}>Close</DarkButton>
        //             </ModalFooter>
        //         </ModalContent>
        //     </ModalDialog>
        // </ModalContainer>
        <ModalContent
            style={{
                padding: "24px",
                textAlign: "center",
                marginBottom: "55px",
                backgroundColor: "rgba(46, 204, 113, 0.2)"
            }}
        >
            <h3>Message Sent Successfully!</h3>
            <p>We'll get back to you as soon as possible.</p>
        </ModalContent>
    )
}