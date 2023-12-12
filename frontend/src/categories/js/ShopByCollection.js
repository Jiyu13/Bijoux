import {useParams} from "react-router-dom";
import {client} from "../../helper-functions/fetchFromAPI";
import {useEffect, useState} from "react";
import {ProductList} from "../../products/products-list/ProductList";
import styled from "styled-components";
import {FilterTriggerMenu} from "../../filter/FilterTriggerMenu";

export function ShopByCollection() {

    const [collectionProducts, setCollectionProducts] = useState(null)

    const collection = useParams()["collection"]

    useEffect(() => {
        client.get(`collections/${collection}/`)
            .then(res => {
                setCollectionProducts(res.data[0].products)
                return res.data
            })
            .catch(error => console.log(error))
    }, [collection]);

    function handleSort(e) {
        const sort = e.target.id

        if (sort === "Lowest Price") {
            const sortedLowToHigh = [...collectionProducts]?.sort((a, b) => {
                return a.price - b.price
            })
            setCollectionProducts(sortedLowToHigh)
        } else {
            const sortedHighToLow = [...collectionProducts]?.sort((a, b) => {
                return b.price - a.price
            })
            setCollectionProducts(sortedHighToLow)
        }
    }

    return (
            <ProductPageContainer className='shop-all-page'>
                <FilterTriggerMenu
                products={collectionProducts}
                handleSort={handleSort}
            />
                <ProductList products={collectionProducts}/>
            </ProductPageContainer>
    )
}

const ProductPageContainer = styled.div`
  margin: 10rem auto 0;
  max-width: 1440px;
  box-sizing: border-box;
`