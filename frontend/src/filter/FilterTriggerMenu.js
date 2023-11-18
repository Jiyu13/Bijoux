import styled from "styled-components";
import expand_more_black_24dp from "../backup/filter-backup/filter-template/icons/expand_more_black_24dp.svg";

export function Filter({products}) {
    return (
        <FilterContainer>
            <FilterBox>
                <div style={{margin:"auto 0"}}>
                    Filter and sort
                </div>

                <img src={expand_more_black_24dp} alt="expand icon"/>
            </FilterBox>

            <TotalResultNumber className="count-products">
                {/* should be the length of results*/}
                {products?.length} results
            </TotalResultNumber>
        </FilterContainer>
    )
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  //padding: 6px 6px 6px 0;
  margin: 8rem 0 3rem;
`

const FilterBox = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 8px;
`

const TotalResultNumber = styled.div`
  text-align: end;
  margin: auto 0;
  white-space: nowrap;
`