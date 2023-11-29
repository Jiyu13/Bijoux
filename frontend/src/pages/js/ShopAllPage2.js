
import {ProductList} from "../../products/products-list/ProductList";
import { FilterTriggerMenu} from "../../filter/FilterTriggerMenu";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"

import styled from "styled-components";
import "../css/shop-all-page.css"


export function ShopAllPage2({products}) {

    const [filterQuery, setFilterQuery] = useState("")
    const [selectedSort, setSelectedSort] = useState(null)
    const [selectedFilters, setSelectedFilters] = useState(null)
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

    function handleSort(e) {
        const sort = e.target.id
        // console.log(sort)
        setSelectedSort(sort)

        let sortedProducts
        if (sort === "Lowest Price") {
            if (resultProducts) {
                sortedProducts = resultProducts?.sort((a, b) => {
                    // console.log(a)
                    return a.price - b.price
                })
            } else {
                sortedProducts = [...products].sort((a, b) => {
                    // console.log(a)
                    return a.price - b.price
                })
            }
        } else {
            if (resultProducts) {
                sortedProducts = resultProducts?.sort((a, b) => {
                    // console.log(a)
                    return b.price - a.price
                })
            } else {
                sortedProducts = [...products].sort((a, b) => {
                    // console.log(a)
                    return b.price - a.price
                })
            }
        }
        setResultProducts(sortedProducts)
        // console.log(sortedProducts)
        // console.log(products)
    }
    function handleFilterBy(e) {
        const filter = e.target.id
        if (selectedFilters === filter) {
            setSelectedFilters(null)
            setFilterQuery("")
            setResultProducts(products)
        } else {
            setSelectedFilters(filter)
            setFilterQuery(filter)

            // =================== update product list ===========================
            const results = [...products].filter(p => {
                return p.collection.collection_name === filter
            })
            setResultProducts(results)
        }
        // if (!selectedFilters.includes(filter) ) {
        //     setSelectedFilters(prev => [...prev, e.target.id])
        //     // =================== update product list ===========================
        //     const results = [...products].filter(p => {
        //         return p.collection.collection_name === filter
        //     })
        //     setResultProducts(results)
        //     setFilterQuery(filter)
        //
        // } else {
        //     const updatedFilters = selectedFilters.filter(f => {
        //         return f !== filter
        //     })
        //     setSelectedFilters(updatedFilters)
        //     setResultProducts(products)
        //     setFilterQuery("")
        // }
    }
    // console.log("resultProducts", resultProducts)
    // console.log("sort", selectedSort)



    return (
        <ProductPageContainer className='shop-all-page'>
            <FilterTriggerMenu
                products={products}
                handleSort={handleSort}
                handleFilterBy={handleFilterBy}
                selectedFilters={selectedFilters}
            />

            <ProductList products={resultProducts ? resultProducts : products}/>
        </ProductPageContainer>

    )
}

const ProductPageContainer = styled.div`
  margin: 10rem auto 0;
  box-sizing: border-box;
`