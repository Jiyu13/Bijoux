import styled from "styled-components"

import {SearchBar} from "../search-bar/SearchBar"
import {Accessibility} from "../accessibility/Accessibility"
export function TopHeader() {
    return (
        <TopHeaderContainer>
            <SearchBar />
            <Accessibility />
        </TopHeaderContainer>
    )
}

const TopHeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 24px;
  margin-bottom: 24px;
  background-color: white;
  display: grid;
  grid-template-columns: 3fr 1fr;
`