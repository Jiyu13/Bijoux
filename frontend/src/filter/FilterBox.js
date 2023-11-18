import styled from "styled-components";

export function FilterBox({handleFilterBy}) {
    return (
        <FilterBoxContainer>
            <CategoryList>
                <CategoryItem id="New Arrivals" onClick={handleFilterBy}>New Arrivals</CategoryItem>
                <CategoryItem id="Best Sellers" onClick={handleFilterBy}>Best Sellers</CategoryItem>
                <CategoryItem id="Earrings" onClick={handleFilterBy}>Earrings</CategoryItem>
                <CategoryItem id="Rings" onClick={handleFilterBy}>Rings</CategoryItem>
                <CategoryItem id="Necklaces" onClick={handleFilterBy}>Necklaces</CategoryItem>
                <CategoryItem id="Bracelets" onClick={handleFilterBy}>Bracelets</CategoryItem>
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
  background-color: antiquewhite;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
`