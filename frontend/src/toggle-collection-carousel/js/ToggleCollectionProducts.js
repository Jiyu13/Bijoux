import "../css/best-sellers.css"

import {SliderTemplate} from "../../item-sliders-template/js/SliderTemplate";

export function ToggleCollectionProducts({products, isSelected}) {
    return (
        <SliderTemplate
            products={products}
            sectionContent={isSelected}
        />
    )
}
