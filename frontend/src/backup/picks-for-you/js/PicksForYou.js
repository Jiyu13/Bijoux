import {SliderTemplate} from "../../../item-sliders-template/js/SliderTemplate1";

export function PicksForYou( {products} ) {
    return (
        <SliderTemplate
            products={products}
            sectionContent="Picks For You"
            // backgroundColor="rgb(163, 72, 148, 0.2)"
            backgroundColor="none"
            borderRadius="16px"
        />
    )
}