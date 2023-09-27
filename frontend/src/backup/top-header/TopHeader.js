import styled from "styled-components"
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext"

import {SearchBar} from "../../global/search-bar/SearchBar"
import {Accessibility} from "../../accessibility/Accessibility"
export function TopHeader() {

    const {isMobile, isTablet} = useContext(UserContext)

    return (
        <TopHeaderContainer className="top-header">
            <SearchBar />
            {isMobile || isTablet ?  "" : <Accessibility />}
        </TopHeaderContainer>
    )
}

const TopHeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 36px;
  margin-bottom: 24px;
  background-color: white;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  box-sizing: border-box;
`