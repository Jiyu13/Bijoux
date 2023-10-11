export function SelectedOptions({selectedFilters, handleCheckboxChange}) {

    // console.log(selectedOptions)

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                // marginLeft: "0",
                // paddingLeft: "0"
            }}
        >
            {selectedFilters?.map(option => {
                // console.log("===============option====================",option)
                    return <button
                        key={option}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            margin: "12px 8px 12px 0",
                            border: "solid 1px",
                            borderRadius: "20px",
                            cursor: "pointer"
                        }}
                        value={option}
                        onClick={handleCheckboxChange}
                    >

                        <div

                            style={{
                                padding: "2px 12px",
                                // margin: "12px 4px 12px 0",
                                fontSize: "0.9rem",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {option}
                        </div>
                        <div style={{padding: "2px 12px"}}>x</div>
                    </button>
                }

            )}
        </div>

    )
}