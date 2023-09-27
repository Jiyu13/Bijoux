import {filterInfo} from "../filter-options/filterInfo";
import FilterBox from './FilterBox';
import styled from "styled-components";
import {MobileFilterItems} from "../filter-mobile/MobileFilterBar";
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";

export function FilterList() {

    const {isMobile} = useContext(UserContext)


    return (
        <FilterContainer>

            {!isMobile && (
                <FilterItemsContainer>
                    <FilterBox filterName={filterInfo[0].item} options={filterInfo[0].options}/>
                    <FilterBox filterName={filterInfo[1].item} options={filterInfo[1].options}/>
                    <FilterBox filterName={filterInfo[2].item} options={filterInfo[2].options}/>
                </FilterItemsContainer>
            )}

            {isMobile && (<MobileFilterItems /> )}

            <TotalResultNumber className="count-products">
                {/* should be the length of results*/}
                1000 results
            </TotalResultNumber>
        </FilterContainer>

    )
}

const TotalResultNumber = styled.div`
  text-align: end;
  margin: auto 0;
  white-space: nowrap;
`

const FilterItemsContainer = styled.div`
  display: flex;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 6px;
`