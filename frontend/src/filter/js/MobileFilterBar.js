import sort_black_24dp from "../icons/sort_black_24dp.svg"
import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../../user-context/UserContext";

export function MobileFilterItems() {

    const {handleOpenFilterSidebar} = useContext(UserContext)

    // const [isOpenFilterSidebar, setOpenFilterSidebar] = useState(false)
    //
    // function handleOpenFilterSidebar() {
    //     setOpenFilterSidebar(!isOpenFilterSidebar)
    // }

    return (

        <FilterItemsContainer onClick={handleOpenFilterSidebar}>
            <FilterIcon>
                <Img src={sort_black_24dp} alt="filter icon"/>
            </FilterIcon>
            <FilterText>Filter</FilterText>

        </FilterItemsContainer>
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