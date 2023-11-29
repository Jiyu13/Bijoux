import {Carousels} from "../../carousels/js/Carousels";
import {Collections2} from "../../categories/js/Collections2";
import {BestSellers} from "../../best-sellers/js/BestSellers";

export function Home() {

    return (
        <>
            <Carousels />
            <Collections2 />
            <BestSellers />
        </>
    )
}