// import {filterInfo} from "../filter-options/filterInfo";
// import FilterBox from './FilterBox';
// import styled from "styled-components";
// import {MobileFilterItems} from "../filter-mobile/MobileFilterBar";
// import {useContext, useEffect, useState} from "react";
// import {UserContext} from "../../global/user-context/UserContext";
// import {fetchFromAPI} from "../../helper-functions/fetchFromAPI";
//
// export function FilterList({handleCheckboxChange, selectedFilters}) {
//
//     const {isMobile, collections, products} = useContext(UserContext)
//
//     const [materials, setMaterials] = useState(null)
//
//
//     const materialOptions = materials?.map(material => material.material_name)
//     const collectionOptions = collections?.map(collection => collection.collection_name)
//
//     useEffect(() => {
//         fetchFromAPI("/materials/", setMaterials)
//     }, []);
//
//
//     return (
//         <FilterContainer>
//
//             {!isMobile && (
//                 <FilterItemsContainer>
//                     <FilterBox
//                         key="Sort"
//                         filterName={filterInfo[0].item}
//                         options={filterInfo[0].options}
//                         handleCheckboxChange={handleCheckboxChange}
//                         selectedFilters={selectedFilters}
//                     />
//                     <FilterBox
//                         key="Collections"
//                         filterName="Collections"
//                         options={collectionOptions}
//                         handleCheckboxChange={handleCheckboxChange}
//                         selectedFilters={selectedFilters}
//                     />
//                     <FilterBox
//                         key="Materials"
//                         filterName="Materials"
//                         options={materialOptions}
//                         handleCheckboxChange={handleCheckboxChange}
//                         selectedFilters={selectedFilters}
//                     />
//                 </FilterItemsContainer>
//             )}
//
//             {isMobile && (<MobileFilterItems /> )}
//
//             <TotalResultNumber className="count-products">
//                 {/* should be the length of results*/}
//                 {products?.length} results
//             </TotalResultNumber>
//         </FilterContainer>
//
//     )
// }
//
// const TotalResultNumber = styled.div`
//   text-align: end;
//   margin: auto 0;
//   white-space: nowrap;
// `
//
// const FilterItemsContainer = styled.div`
//   display: flex;
// `
//
// const FilterContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   box-sizing: border-box;
//   padding: 6px 6px 6px 0;
//   margin: 24px 0;
// `