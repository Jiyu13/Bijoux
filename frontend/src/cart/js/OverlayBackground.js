export function OverlayBackground({action, setAction}) {

    function handleClickOverlay(){
        setAction(false)
    }

    return (
        <div
            style={{
                width: "calc(100% - 420px)",
                height: "100%",
                float: action === "cart" ? "left" : "right"
            }}
            onClick={handleClickOverlay}
        >

        </div>
    )
}