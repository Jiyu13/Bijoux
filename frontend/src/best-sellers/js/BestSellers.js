import "../css/best-sellers.css"

import {SliderTemplate} from "../../item-sliders-template/js/SliderTemplate";

export function BestSellers({products}) {
    return (
        <SliderTemplate
            products={products}
            sectionContent="Best Sellers"
            backgroundColor="rgb(163, 72, 148, 0.2)"
            borderRadius="0px"
        />
    )
}
