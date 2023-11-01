import {FormPageContainer} from "../components/formStyles";

export function MessageSentSuccessfully() {
    return (
        <FormPageContainer>
            <div style={{padding: "50px 0 35px",}}>
                <h1>Message Sent Successfully!</h1>
                <p>We'll get back to you as soon as possible.</p>
            </div>
        </FormPageContainer>
    )
}