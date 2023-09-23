import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../../user-context/UserContext";
import {MobileFilterItems} from "./MobileFilterBar";
import {FilterItems} from "./FilterItems";

export function FilterBar( ) {

    const {isMobile} = useContext(UserContext)

    return(
        <FilterContainer>
            {!isMobile && (<FilterItems />) }

            {isMobile && (<MobileFilterItems /> )}


            <TotalResultNumber className="count-products">
                1000 results
            </TotalResultNumber>
        </FilterContainer>

    )
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 6px;
`

const TotalResultNumber = styled.div`
  text-align: end;
  margin: auto 0;
  white-space: nowrap;
`