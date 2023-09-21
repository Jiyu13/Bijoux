import {SliderTemplate} from "../../item-sliders-template/js/SliderTemplate";

export function NewArrivals({products}) {

    return (
        <SliderTemplate
            products={products}
            sectionContent="New Arrivals"
            // backgroundColor="rgb(163, 72, 148, 0.2)"
            borderRadius="0px"
        />
    )
}