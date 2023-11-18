// import {ProductList} from "../products/products-list/ProductList";
// import styled from "styled-components";
// import {FilterList} from "../filter/filter-redux/FilterList";
// import {useState} from "react";
// import {SelectedOptions} from "../selected-options/SelectedOptions";
//
// export function ShopAllPage({products}) {
//
//     // product.collection.collection_name
//     // product.materials -- array
//     // product.price
//
//     const [selectedFilters, setSelectedFilters] = useState([])
//     const [resultProducts, setResultProducts] = useState(null)
//
//     function handleCheckboxChange(e) {
//
//         const value = e.target.value ? e.target.value : e.currentTarget.value
//
//         let filters = selectedFilters
//         if (e.target.checked) {   // deal with checkbox
//             filters = [...filters, value]
//         } else {                 // deal with selected filters showed below filterbox and unchecked checkbox
//             filters = filters.filter(filter => filter !== value)
//         }
//
//         // ========================= filter by collections ================================================
//         let filteredProducts = []
//         let sortFilters = filters.filter(f => f.includes("Sort:"))
//         let collectionFilters = filters.filter(f => f.includes("Collections:"))
//         let materialFilters = filters.filter(f => f.includes("Materials:"))
//
//         collectionFilters.forEach(f => {
//             const filterTerm = f.split(": ")[1]
//             const results = [...products]?.filter(p => {
//                 return p.collection.collection_name === filterTerm
//             })
//
//             filteredProducts = [...filteredProducts, ...results]
//         })
//
//         if (collectionFilters.length === 0) {
//             filteredProducts = products
//         }
//
//         // =========================== filter by materials ======================================
//         let materialProducts = []
//         materialFilters.forEach(f => {
//             const filterTerm = f.split(": ")[1]
//             // filteredProducts is set to products if length===0
//             const results = [...filteredProducts]?.filter(p => {
//                 return p.materials.some(material => material.material_name === filterTerm)
//             })
//
//             materialProducts = [...materialProducts, ...results]
//         })
//
//         if (materialFilters.length > 0)  {
//             // avoid adding duplicate products to the list when materialFilters is active
//             // if materialFilters is 0, materialProducts should be products
//             filteredProducts =  [...new Set(materialProducts)]
//         }
//
//         // ========================= "sort" products ================================================
//
//         if (sortFilters.includes("Sort: Highest Price")) {
//             filteredProducts = filteredProducts.sort(function (a, b) {
//                 return b.price - a.price
//             })
//         } else if (sortFilters.includes("Sort: Lowest Price")) {
//               filteredProducts = filteredProducts.sort(function (a, b) {
//                 return a.price - b.price
//             })
//         }
//
//         setResultProducts(filteredProducts)
//         setSelectedFilters(filters)
//     }
//
//     return (
//         <ProductPageContainer>
//             <FilterList
//                 handleCheckboxChange={handleCheckboxChange}
//                 selectedFilters={selectedFilters}
//             />
//             <SelectedOptions
//                 selectedFilters={selectedFilters}
//                 handleCheckboxChange={handleCheckboxChange}
//             />
//             <ProductList
//                 products={resultProducts ? resultProducts : products}
//             />
//         </ProductPageContainer>
//
//     )
// }
//
// const ProductPageContainer = styled.div`
//   margin: 1rem auto;
// `