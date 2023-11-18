
import {ProductList} from "../products/products-list/ProductList";
import { FilterTriggerMenu} from "../filter/FilterTriggerMenu";
import styled from "styled-components";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"


export function ShopAllPage2({products}) {

    const [filterQuery, setFilterQuery] = useState("")
    const [selectedFilters, setSelectedFilters] = useState([])
    const [resultProducts, setResultProducts] = useState(null)

    const navigate = useNavigate()
    useEffect(() => {
        const params = new URLSearchParams()
        if (filterQuery) {
            params.append("filter", filterQuery)
        } else {
            params.delete("filter")
        }

        navigate({pathname: "/shop", search: filterQuery === "" ? "" :`?filter=${filterQuery}`})
    }, [filterQuery, navigate]);

    function handleFilterBy(e) {
        const filter = e.target.id
        if (!selectedFilters.includes(filter) ) {
            setSelectedFilters(prev => [...prev, e.target.id])

            // =================== update product list ===========================
            const results = [...products].filter(p => {
                return p.collection.collection_name === filter
            })
            setResultProducts(results)
            setFilterQuery(filter)

        } else {
            const updatedFilters = selectedFilters.filter(f => {
                return f !== filter
            })
            setSelectedFilters(updatedFilters)
            setResultProducts(products)
            setFilterQuery("")
        }
    }
    console.log(selectedFilters)

    return (
        <ProductPageContainer>
            <FilterTriggerMenu
                products={products}
                handleFilterBy={handleFilterBy}
            />

            <ProductList products={resultProducts ? resultProducts : products}/>
        </ProductPageContainer>

    )
}

const ProductPageContainer = styled.div`
  margin: 10rem auto 0;
  box-sizing: border-box;
`