import {Carousels} from "../carousels/js/Carousels";
import {Collections} from "../categories/js/Collections";
import {BestSellers} from "../best-sellers/js/BestSellers";
import {NewArrivals} from "../new-arrivals/js/NewArrivals";

export function Home({categories, products}) {
    return (
        <>
            <Carousels />
            <Collections categories={categories}/>
            <BestSellers products={products}/>
            <NewArrivals products={products}/>
        </>
    )
}