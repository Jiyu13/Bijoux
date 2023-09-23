import {FilterItemTemplate} from "../../filter-template/js/FilterItemTemplate";
import styled from "styled-components";
import {filterInfo} from "./filterInfo";

export function FilterItems() {

    const filterItemList = filterInfo

    return (
        <FilterItemsContainer>

            {filterItemList.map((each, index) => {
                return (
                    <FilterItemTemplate
                        key={index}
                        filterItemName={each.item}
                        filterOptions={each.options}
                    />
                )
                })
            }
            {/*<FilterItemTemplate*/}
            {/*    filterItemName="Sort"*/}
            {/*    filterOptions={["New Arrivals", "Best Sellers", "Highest Price", "Lowest Price"]}*/}
            {/*/>*/}
            {/*<FilterItemTemplate*/}
            {/*    filterItemName="Collections"*/}
            {/*    filterOptions={["Studs", "Drops", "Hoops", "Dangles", "Threaders", "Huggles"]}*/}
            {/*/>*/}
            {/*<FilterItemTemplate*/}
            {/*    filterItemName="Material"*/}
            {/*    filterOptions={["Metal", "Silver", "Polymer clay", "Beads", "Pearls", "Resin"]}*/}
            {/*/>*/}
        </FilterItemsContainer>
    )
}

const FilterItemsContainer = styled.div`
  display: flex;
`