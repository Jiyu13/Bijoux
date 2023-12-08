import {LoadingOverlay} from "./UserCartItemsList";
import loading_icon from "../icons/loading_icon.svg";

export function CartItemLoadingOverlay() {
    return (
        <LoadingOverlay>
            <img
                src={loading_icon}
                alt='loading icon'
                className='loading'
                style={{width: "36px", height: "36px"}}
            />
        </LoadingOverlay>

    )

}