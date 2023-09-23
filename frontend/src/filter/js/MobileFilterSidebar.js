import styled from "styled-components";
import {filterInfo} from "./filterInfo";
import {DropdownItem} from "../../filter-template/js/DropdownItem";

// import add_black_24dp from "../icons/add_black_24dp.svg"
// import remove_black_24dp from "../icons/remove_black_24dp.svg"
import close_black_24dp from "../icons/close_black_24dp.svg"
import {useContext} from "react";
import {UserContext} from "../../user-context/UserContext";
export function MobileFilterSidebar() {
    const {handleOpenFilterSidebar} = useContext(UserContext)
    const filterItemList = filterInfo

    return(
        <SidebarContainer>
            <SidebarWrapper>
                <SidebarHeader>
                    <HeaderText>Filters</HeaderText>
                    {/*<CountProduct></CountProduct>*/}
                    <CloseButton onClick={handleOpenFilterSidebar}>
                        <Img src={close_black_24dp} alt="close button" />
                    </CloseButton>
                </SidebarHeader>
                <SidebarContent>
                    {filterItemList.map((each, index) => {
                        return (
                            <FilterItem key={index}>
                                <FilterGenre>{each.item}</FilterGenre>
                                {/*<ToggleOptions>*/}
                                {/*    <ToggleImg src={add_black_24dp}/>*/}
                                {/*</ToggleOptions>*/}
                                <FilterOptions>
                                    {each.options.map((option, index) => {
                                        return (
                                            <DropdownItem
                                                key={index}
                                                option={option}
                                            />
                                        )
                                    })}
                                </FilterOptions>
                            </FilterItem>
                        )
                    })}
                </SidebarContent>

            </SidebarWrapper>
        </SidebarContainer>
    )
}


const SidebarContainer = styled.div`
  width: 70%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  transition: 0.5s;
  z-index: 9999;
  background-color: whitesmoke;
`
const SidebarWrapper = styled.div``

// ================== Sidebar options ==================
const SidebarContent = styled.div`
  padding: 1rem;
`
const FilterItem = styled.div`
  margin-bottom: 1.5rem;

`
const FilterGenre = styled.div`
  padding: 0 1.2rem 0.5rem;
  font-weight: 500;
`
const FilterOptions = styled.div`
  
`


// const ToggleOptions = styled.div``
// const ToggleImg = styled.img``
// ================== Sidebar top ==================
const SidebarHeader = styled.div`
    padding: 12px;
    margin: auto;
    //display: flex;
    //justify-content: space-between;
    position: relative;
    border-bottom: solid 1px rgba(0, 0, 0, 0.4);
`
const HeaderText = styled.div`
    font-size: 1.5rem;
    text-align: center;
`
const CloseButton = styled.div`
    cursor: pointer;
    position: relative;
    float: right;
    top: -35px;
`
const Img = styled.img`
    width: 36px;
`