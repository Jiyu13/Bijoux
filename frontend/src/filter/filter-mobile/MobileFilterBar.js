import sort_black_24dp from "../../backup/filter-backup/icons/sort_black_24dp.svg"
import styled from "styled-components";
import {useContext, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {SidebarOverlay} from "./SidebarOverlay";
import {MobileFilterSidebar} from "./MobileFilterSidebar";

export function MobileFilterItems() {


    const {isMobile,
    } = useContext(UserContext)

    // ============= toggle filter sideber ==================================
    const [isOpenFilterSidebar, setOpenFilterSidebar] = useState(false)
    function handleOpenFilterSidebar() {
        setOpenFilterSidebar(!isOpenFilterSidebar)
    }

    return (
        <>
            {isMobile && isOpenFilterSidebar && (<MobileFilterSidebar handleOpenFilterSidebar={handleOpenFilterSidebar}/>)}
            {isMobile && isOpenFilterSidebar && (<SidebarOverlay handleOpenFilterSidebar={handleOpenFilterSidebar}/>)}


            <FilterItemsContainer onClick={handleOpenFilterSidebar}>
                <FilterIcon>
                    <Img src={sort_black_24dp} alt="filter icon"/>
                </FilterIcon>
                <FilterText>Filter</FilterText>

            </FilterItemsContainer>
        </>
    )
}

const Img = styled.img``
const FilterIcon = styled.div``
const FilterText = styled.div`
    margin-left: 12px;
    font-size: 1.2rem;
`

const FilterItemsContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  cursor: pointer;
`