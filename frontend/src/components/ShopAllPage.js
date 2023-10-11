import {ProductList} from "../products/products-list/ProductList";
import styled from "styled-components";
import {FilterList} from "../filter/filter-redux/FilterList";
import {useEffect, useState} from "react";
import {SelectedOptions} from "../selected-options/SelectedOptions";

export function ShopAllPage({products} ) {

    // product.collection.collection_name
    // product.materials -- array
    // product.price
    // console.log(products)
    const [selectedFilters, setSelectedFilters] = useState([])
    const [resultProducts, setResultProducts] = useState(null)
    // const [sortedResults, setSortedResults] = useState(null)
    // const [filterResults, setFilterResults] = useState(null)

    function handleCheckboxChange(e) {

        const value = e.target.value ? e.target.value : e.currentTarget.value
        //
        // if (selectedFilters.includes(value)) {
        //     setSelectedFilters(prev => prev.filter(o => o !== value))
        // } else {
        //     setSelectedFilters(prev => [...prev, value])
        // }

        if (selectedFilters.includes(value)) {

            setSelectedFilters(prev => prev.filter(o => o !== value))

            if (value === "Sort: Highest Price" || value === "Sort: Lowest Price") {
                setResultProducts(products)
            } else {
                console.log(resultProducts)
                setResultProducts(resultProducts)
            }

        } else {

            setSelectedFilters(prev => [...prev, value])

            if (value === "Sort: Highest Price") {
                // [...products] copy products
                const sortHighest = [...products]?.sort(function(a, b) { return b.price - a.price})
                setResultProducts(sortHighest)
            } else if (value === "Sort: Lowest Price") {
                // [...products] copy products
                const sortLowest = [...products]?.sort(function(a, b) { return a.price - b.price})
                setResultProducts(sortLowest)
            } else {
                if (value.includes("Collections")) {
                    const filterTerm = value.split(": ")[1]
                    const results = [...products]?.filter(p => {
                        return p.collection.collection_name === filterTerm
                    })
                    setResultProducts(results)
                }
            }
        }


    }

    // setSelectedFilters(prev =>
    //     prev.includes(value) ?
    //         prev.filter(o => o !== value)
    //         :
    //         [...prev, value]
    // )
    // console.log("==============after selectedOptions===================", selectedOptions)
    // let results = products
    // for (let option in selectedFilters) {
    //     if (option === "Sort: Highest Price") {
    //         const results = results?.sort(function(a, b) { return b.price - a.price})
    //     } else if (option === "Sort: Lowest Price") {
    //         const results = results?.sort(function(a, b) { return a.price - b.price})
    //     } else if (option.includes("Collections")){
    //         const results = results?.filter(product => product.collection.collection_name !== option)
    //     } else if (option.includes("Materials")){
    //         const results = results?.filter(product => !option in product.Materials)
    //     }
    //
    // }
    // setResultProducts(results)

    return (
        <ProductPageContainer>
            <FilterList
                handleCheckboxChange={handleCheckboxChange}
                selectedFilters={selectedFilters}
            />
            <SelectedOptions
                selectedFilters={selectedFilters}
                handleCheckboxChange={handleCheckboxChange}
            />
            <ProductList
                products={resultProducts ? resultProducts : products}
            />
        </ProductPageContainer>

    )
}

const ProductPageContainer = styled.div`
  margin: 1rem auto;
`