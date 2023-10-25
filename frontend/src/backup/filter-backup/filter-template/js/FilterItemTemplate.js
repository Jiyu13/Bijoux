import {useState, useRef, useEffect} from "react"

import styled from "styled-components";
import {DropdownItem} from "./DropdownItem";

import expand_more_black_24dp from "../icons/expand_more_black_24dp.svg"
export function FilterItemTemplate( props ) {

    const {filterItemName, filterOptions } = props

    const [isOpen, setOpen] = useState(false)

    function handleOpenDropdown(e) {
        setOpen(!isOpen)
    }

    let menuRef = useRef()
    useEffect(() => {
        let handler = (e) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(e.target)){
                setOpen(!isOpen)
            }
        }

        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [isOpen]);



    return (
        <FilterContainer >
            <MenuTrigger onClick={handleOpenDropdown}>
                <FilterItem id={filterItemName}>
                    <FilterName>{filterItemName}</FilterName>
                    <Img src={expand_more_black_24dp} alt="expand icon"/>
                </FilterItem>
            </MenuTrigger>
            {isOpen && (
                <MenuDropdownList ref={menuRef}>
                    {filterOptions.map(option =>{
                        return (
                            <DropdownItem
                                key={option}
                                option={option}
                            />
                        )
                    })}

                </MenuDropdownList>
            )}

        </FilterContainer>
    )
}


const MenuDropdownList = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 180px;
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
const MenuTrigger = styled.div``
const FilterContainer = styled.div`
  padding: 12px 18px;
  border: solid 1px black;
  margin: 0 2px;
`