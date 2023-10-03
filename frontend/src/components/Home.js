import {Carousels} from "../carousels/js/Carousels";
import {Collections} from "../categories/js/Collections";
import {ToggleCollection} from "../toggle-collection-carousel/js/ToggleCollection";
import {NewArrivals} from "../new-arrivals/js/NewArrivals";
import {FeaturedCollection} from "../featured-collection/js/FeaturedCollection";
import {useState} from "react";

export function Home({categories, products}) {

    const [isSelected, setIsSelected] = useState("Best Sellers")

    function handleChangeCollection(e) {
        // console.log(e.currentTarget.dataset.value)
        setIsSelected(e.currentTarget.dataset.value)
    }

    return (
        <>
            <Carousels />
            <FeaturedCollection />
            <Collections categories={categories} isSelected={isSelected} handleChangeCollection={handleChangeCollection} products={products}/>
            <ToggleCollection products={products} isSelected={isSelected}/>
            {/*<NewArrivals products={products}/>*/}
        </>
    )
}