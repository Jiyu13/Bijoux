import {FilterItemTemplate} from "../filter-template/js/FilterItemTemplate";
import styled from "styled-components";
import {filterInfo} from "../../../filter/filter-options/filterInfo";

export function FilterItems() {

    const filterItemList = filterInfo

    return (
        <FilterItemsContainer>

            <FilterItemTemplate
                filterItemName={filterItemList[0].item}
                filterOptions={filterItemList[0].options}
            />
            <FilterItemTemplate
                filterItemName={filterItemList[1].item}
                filterOptions={filterItemList[1].options}
            />
            <FilterItemTemplate
                filterItemName={filterItemList[2].item}
                filterOptions={filterItemList[2].options}
            />
        </FilterItemsContainer>
    )
}

const FilterItemsContainer = styled.div`
  display: flex;
`