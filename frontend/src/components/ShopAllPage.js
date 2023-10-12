import {ProductList} from "../products/products-list/ProductList";
import styled from "styled-components";
import {FilterList} from "../filter/filter-redux/FilterList";
import {useState} from "react";
import {SelectedOptions} from "../selected-options/SelectedOptions";

export function ShopAllPage({products}) {

    // product.collection.collection_name
    // product.materials -- array
    // product.price

    const [selectedFilters, setSelectedFilters] = useState([])
    const [resultProducts, setResultProducts] = useState(null)

    function handleCheckboxChange(e) {

        const value = e.target.value ? e.target.value : e.currentTarget.value

        let filters = selectedFilters
        if (e.target.checked) {
            filters = [...filters, value]
        } else {
            filters = filters.filter(filter => filter !== value)
        }

        // console.log(filters)

        // ========================= filters excluding "sort" ================================================
        let noSortFilters = filters.filter(f => !f.includes("Sort:"))
        let filteredProducts = []

        noSortFilters.forEach(f => {
            const filterTerm = f.split(": ")[1]


            const results = [...products]?.filter(p => {
                return p.collection.collection_name === filterTerm
            })
            filteredProducts = [...filteredProducts, ...results]
        })

        // ========================= "sort" products ================================================
        filteredProducts = noSortFilters.length > 0 ? filteredProducts : products

        if (filters.includes("Sort: Highest Price")) {
            filteredProducts = filteredProducts.sort(function (a, b) {
                return b.price - a.price
            })
        } else if(filters.includes("Sort: Lowest Price")) {
              filteredProducts = filteredProducts.sort(function (a, b) {
                return a.price - b.price
            })
        }

        setResultProducts(filteredProducts)
        setSelectedFilters(filters)
    }

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

//
// const getFilteredProducts = (f) =>{
//     console.log(f)
//     switch (f) {
//         case "Sort: Highest Price":
//             if (filteredProducts.length === 0) {
//                 return [...products]?.sort(function (a, b) {
//                     return b.price - a.price
//                 })
//             } else {
//                 return [...filteredProducts]?.sort(function (a, b) {
//                     return b.price - a.price
//                 })
//             }
//         case "Sort: Lowest Price":
//             if (filteredProducts.length === 0) {
//                 return [...products]?.sort(function (a, b) { return a.price - b.price})
//             } else {
//                 return [...filteredProducts]?.sort(function (a, b) { return a.price - b.price})
//             }
//         case f.includes("Materials"):
//             if (filteredProducts.length === 0 || filteredProducts.length === products.length) {
//
//                 const results = [...products]?.filter(p => {
//                     console.log(p)
//                     return p.materials.includes(filterTerm)
//                 })
//                 return results
//             } else {
//                 const results = [...products]?.filter(p => p.materials.includes(filterTerm))
//                 return [...filteredProducts, ...results]
//             }
//         default:
//
//             if (filteredProducts.length === 0 || filteredProducts.length === products.length) {
//                 const results = [...products]?.filter(p => p.collection.collection_name === filterTerm)
//                 return results
//             } else {
//                 const results = [...products]?.filter(p => p.collection.collection_name === filterTerm)
//                 return [...filteredProducts, ...results]
//             }
//     }
// }
// filteredProducts = getFilteredProducts(f)
// console.log(filteredProducts)