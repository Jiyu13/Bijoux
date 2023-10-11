import {ProductList} from "../products/products-list/ProductList";
import styled from "styled-components";
import {FilterList} from "../filter/filter-redux/FilterList";
import {useState} from "react";
import {SelectedOptions} from "../selected-options/SelectedOptions";

export function ShopAllPage({products} ) {

    const [selectedOptions, setSelectedOptions] = useState([])

    function handleCheckboxChange(e) {
        // console.log
        // if (!selectedOptions.includes(e.target.value)) {
        //     setSelectedOptions([...selectedOptions, e.target.value])
        // }
        //
        // if (selectedOptions.includes(e.target.value)) {
        //
        //     setSelectedOptions(
        //         selectedOptions.filter(filter => filter !== e.target.value)
        //     )
        // }
        setSelectedOptions(prev =>
            prev.includes(e.target.value) ?
                prev.filter(o => o !== e.target.value)
                :
                [...prev, e.target.value]
        )
    }

    console.log(selectedOptions)

    return (
        <ProductPageContainer>
            <FilterList
                handleCheckboxChange={handleCheckboxChange}
                selectedOptions={selectedOptions}
            />
            <SelectedOptions selectedOptions={selectedOptions}/>
            <ProductList products={products}/>
        </ProductPageContainer>

    )
}

const ProductPageContainer = styled.div`
  margin: 1rem auto;
`