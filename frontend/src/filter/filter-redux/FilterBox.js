import {useDispatch, useSelector} from "react-redux";
import {toggleFilter} from "./store/filterSlice";
import {DropdownItem} from "../../backup/filter-backup/filter-template/js/DropdownItem";
import styled from "styled-components";
import expand_more_black_24dp from "../../backup/filter-backup/filter-template/icons/expand_more_black_24dp.svg";
import {useEffect, useRef} from "react";

export function FilterBox({ filterName, options, handleCheckboxChange, selectedFilters }) {

    // console.log("options", options)
    // console.log("selectedOptions", selectedOptions)

    const dispatch = useDispatch()
    const isOpen = useSelector((state) => state.filters[filterName])

    const handleToggle = () => {
        dispatch(toggleFilter(filterName))
    }

    const dropdownRef = useRef()
    useEffect(() => {
        let clickOutsideHandler = (e) => {
            // console.log(e)
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)){
                dispatch(toggleFilter(filterName))
            }
        }

        document.addEventListener("mousedown", clickOutsideHandler)
        return () => {
            document.removeEventListener("mousedown", clickOutsideHandler)
        }
    });

    return (
        <FilterContainer>
            <MenuTrigger onClick={handleToggle}>
                <FilterItem id={filterName}>
                    <FilterName>{filterName}</FilterName>
                    <Img src={expand_more_black_24dp} alt="expand icon"/>
                </FilterItem>
            </MenuTrigger>

                {isOpen && (
                    <MenuDropdownList className="dropdown" ref={dropdownRef}>
                        {/* Render the contents of the dropdown here */}
                        {options?.map((option, index) => {
                            return (
                                <DropdownItem
                                    key={option}
                                    filterName={filterName}
                                    option={option}
                                    handleCheckboxChange={handleCheckboxChange}
                                    selectedFilters={selectedFilters}
                                />)
                        })}
                    </MenuDropdownList>
                )}

        </FilterContainer>
    )
}

export default FilterBox;


const MenuDropdownList = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 150px;
    background-color: white;
    box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19) !important;
    width: 20rem;
    z-index: 9999;

    &:before {
    content: "";
    position: absolute;
    top: -5px;
    left: 8px;
    height: 20px;
    width: 20px;
    background-color: white;
    transform: rotate(45deg);
`

const Img = styled.img`
  margin-left: 6px;
`
const FilterName = styled.div``

const FilterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuTrigger = styled.div`
    padding: 12px 18px;
    border: solid 1px black;
    margin: 0 2px;
`
const FilterContainer = styled.div`
`
