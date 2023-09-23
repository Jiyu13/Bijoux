import {Carousels} from "../carousels/js/Carousels";
import {Categories} from "../categories/js/Categories";
import {BestSellers} from "../best-sellers/js/BestSellers";
import {NewArrivals} from "../new-arrivals/js/NewArrivals";

export function Home({categories, products}) {
    return (
        <>
            <Carousels />
            <Categories  categories={categories}/>
            <BestSellers products={products}/>
            <NewArrivals products={products}/>
        </>
    )
}