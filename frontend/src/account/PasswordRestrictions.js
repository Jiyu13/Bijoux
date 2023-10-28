export function PasswordRestrictions( props ) {

    const {lengthError, numericError, alphabeticError} = props

    const lengthErrorBgColor = lengthError?.length > 0 ? "#e74c3c" : "rgb(82, 82, 82)" // "#2ecc71"
    const numericErrorBgColor = numericError?.length > 0 ? "#e74c3c" : "rgb(82, 82, 82)" // "#2ecc71"
    const alphabeticErrorBgColor = alphabeticError?.length > 0 ? "#e74c3c" : "rgb(82, 82, 82)" //"#2ecc71"

    return (
        <div >
            <ul style={{paddingLeft: "0px"}}>
                Password Requirements
            </ul>
            <li style={{color: lengthErrorBgColor}}>A minimum of 8 characters.</li>
            <li style={{color: numericErrorBgColor}}>A numeric character.</li>
            <li style={{color: alphabeticErrorBgColor}}>An alphabetic character.</li>
        </div>
    )
}