import styled from "styled-components";

export function FilterBox({handleFilterBy, selectedFilters}) {

    const selectedFilterBgColor = "rgba(40,44,52, 0.8)";
    const selectedFilterFontColor = "whitesmoke"

    return (
        <FilterBoxContainer>
            <CategoryList>
                <CategoryItem
                    id="New Arrivals"
                    onClick={handleFilterBy}
                    style={{
                        backgroundColor: selectedFilters === 'New Arrivals' ? selectedFilterBgColor : "antiquewhite",
                        color: selectedFilters === 'New Arrivals' ? selectedFilterFontColor: "#525252"
                    }}
                >
                    New Arrivals
                </CategoryItem>
                <CategoryItem
                    id="Best Sellers"
                    onClick={handleFilterBy}
                    style={{
                        backgroundColor: selectedFilters === 'Best Sellers' ? selectedFilterBgColor : "antiquewhite",
                        color: selectedFilters === 'Best Sellers' ? selectedFilterFontColor: "#525252"
                    }}
                >
                    Best Sellers
                </CategoryItem>
                <CategoryItem
                    id="Earrings"
                    onClick={handleFilterBy}
                    style={{
                        backgroundColor: selectedFilters === 'Earrings' ? selectedFilterBgColor : "antiquewhite",
                        color: selectedFilters === 'Earrings' ? selectedFilterFontColor: "#525252"
                    }}
                >
                    Earrings
                </CategoryItem>
                <CategoryItem
                    id="Rings"
                    onClick={handleFilterBy}
                    style={{backgroundColor: selectedFilters === 'Rings' ? selectedFilterBgColor : "antiquewhite",
                        color: selectedFilters === 'Rings' ? selectedFilterFontColor: "#525252"
                    }}
                >
                    Rings
                </CategoryItem>
                <CategoryItem
                    id="Necklaces"
                    onClick={handleFilterBy}
                    style={{
                        backgroundColor: selectedFilters === 'Necklaces' ? selectedFilterBgColor : "antiquewhite",
                        color: selectedFilters === 'Necklaces' ? selectedFilterFontColor: "#525252"
                    }}

                >
                    Necklaces
                </CategoryItem>
                <CategoryItem
                    id="Bracelets"
                    onClick={handleFilterBy}
                    style={{
                        backgroundColor: selectedFilters === 'Bracelets' ? selectedFilterBgColor : "antiquewhite",
                        color: selectedFilters === 'Bracelets' ? selectedFilterFontColor: "#525252"
                    }}
                >
                    Bracelets
                </CategoryItem>
            </CategoryList>

        </FilterBoxContainer>
    )
}

const FilterBoxContainer = styled.div`
  //background-color: #282c34;
  //width: 600px;
  //height: 50px;
  margin: 0;
  padding: 24px 24px 24px 0;
  //box-shadow: rgba(0, 0, 0, 0.04) 0px -1px 2px, rgba(0, 0, 0, 0.04) 0px 1px 2px, rgba(0, 0, 0, 0.04) 0px 3px 4px;

`

const CategoryList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  //grid-template-columns: repeat(3, 1fr);
  column-gap: 6px;
  row-gap: 6px;
  list-style: none;
  flex-wrap: wrap;
`

const CategoryItem = styled.li`
  padding: 0.5rem 1.5rem;
  //background-color: antiquewhite;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(40,44,52, 0.8) !important;
    color: whitesmoke !important;
  } 
`