import styled from "styled-components";
import expand_more_black_24dp from "../backup/filter-backup/filter-template/icons/expand_more_black_24dp.svg";
import {useState} from "react";
import {FilterBox} from "./FilterBox";
import {SortBox} from "./SortBox";

export function FilterTriggerMenu({products, handleFilterBy, selectedFilters}) {


    const [isOpenFilter, setOpenFilter] = useState(false)
    const [isOpenSort, setOpenSort] = useState(false)

    function handleTogglerFilter() {
        setOpenFilter(!isOpenFilter)
        setOpenSort(false)
    }

    function handleTogglerSort() {
        setOpenSort(!isOpenSort)
        setOpenFilter(false)
    }

    return (
        <div style={{position: "relative"}}>
            <FilterTriggerContainer>
                <Wrapper onClick={handleTogglerFilter}>
                    <FilterWrapper >
                        <div style={{margin:"auto 0"}}>
                            Filter
                        </div>

                        <img src={expand_more_black_24dp} alt="expand icon"/>
                    </FilterWrapper>

                </Wrapper>

                {/*<SortWrapper>*/}

                {/*</SortWrapper>*/}
                {/*style={{position: "absolute"}}*/}
                <Wrapper onClick={handleTogglerSort} >
                    <FilterWrapper>
                        <div style={{margin:"auto 0"}}>
                            Sort
                        </div>

                        <img src={expand_more_black_24dp} alt="expand icon"/>
                    </FilterWrapper>
                    <TotalResultNumber className="count-products">
                        {/* should be the length of results*/}
                        {products?.length} results
                    </TotalResultNumber>
                    {isOpenSort && (<SortBox/>)}
                </Wrapper>

            </FilterTriggerContainer>

            {isOpenFilter && (<FilterBox handleFilterBy={handleFilterBy} selectedFilters={selectedFilters}/>)}


        </div>
    )
}

const FilterTriggerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  //padding: 6px 6px 6px 0;
  margin: 8rem 0 0;
`
const Wrapper = styled.div`
  display: flex;
  column-gap: 24px;
  justify-content: center;  

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