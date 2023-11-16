import {Carousels} from "../carousels/js/Carousels";
import {Collections} from "../categories/js/Collections";
import {ToggleCollectionProducts} from "../toggle-collection-carousel/js/ToggleCollectionProducts";
import {NewArrivals} from "../new-arrivals/js/NewArrivals";
import {FeaturedCollection} from "../featured-collection/js/FeaturedCollection";
import {useState} from "react";
import {Collections2} from "../categories/js/Collections2";
import {BestSellers} from "../best-sellers/js/BestSellers";

export function Home({collections, products}) {

    const [isSelected, setIsSelected] = useState("Best Sellers")

    function handleChangeCollection(e) {
        // console.log(e.target.dataset.value)
        setIsSelected(e.target.dataset.value)
    }

    return (
        <>
            <Carousels />
            {/*<FeaturedCollection />*/}
            {/*<Collections collections={collections} isSelected={isSelected} handleChangeCollection={handleChangeCollection} products={products}/>*/}
            {/*<ToggleCollectionProducts products={products} isSelected={isSelected}/>*/}
            {/*/!*<NewArrivals products={products}/>*!/*/}
            <Collections2 />
            <BestSellers />
        </>
    )
}