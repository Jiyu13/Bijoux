import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";

export function OverlayBackground() {

    const {setOpenCart} = useContext(UserContext)
    function handleClickOverlay(){
        setOpenCart(false)
    }

    return (
        <div
            style={{width: "calc(100% - 420px)", height: "100%"}}
            onClick={handleClickOverlay}
        >

        </div>
    )
}