import styled from "styled-components";
import expand_more_black_24dp from "../backup/filter-backup/filter-template/icons/expand_more_black_24dp.svg";
import {useState} from "react";
import {SortBox} from "./SortBox";

export function FilterTriggerMenu({products, handleSort}) {


    const [isOpenSort, setOpenSort] = useState(false)

    function handleTogglerSort() {
        setOpenSort(!isOpenSort)
    }

    return (
        <div style={{position: "relative"}}>
            <FilterTriggerContainer>
                <FilterWrapper onClick={handleTogglerSort}>
                    <div style={{margin:"auto 0"}}>
                        Sort
                    </div>

                    <img src={expand_more_black_24dp} alt="expand icon"/>
                </FilterWrapper>
                <TotalResultNumber className="count-products">
                    {products?.length} results
                </TotalResultNumber>

                {isOpenSort && (<SortBox handleSort={handleSort} setOpenSort={setOpenSort}/>)}

            </FilterTriggerContainer>

        </div>
    )
}

const FilterTriggerContainer = styled.div`
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  margin: 8rem 0 0;
  gap: 12px;
`

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 2px;
  margin: 0;
`

const TotalResultNumber = styled.div`
  text-align: end;
  margin: auto 0;
  white-space: nowrap;
`