import styled from "styled-components";

export function SortBox({handleSort}) {
    return (
        <FilterBoxContainer>
            {/*<CategoryList>*/}
            {/*    <CategoryItem id="New Arrivals" onClick={handleSort}>New Arrivals</CategoryItem>*/}
            {/*    <CategoryItem id="Best Sellers" onClick={handleSort}>Best Sellers</CategoryItem>*/}
                <CategoryItem id="Lowest Price" onClick={handleSort}>Lowest Price</CategoryItem>
                <CategoryItem id="Highest Price" onClick={handleSort}>Highest Price</CategoryItem>
            {/*</CategoryList>*/}

        </FilterBoxContainer>
    )
}

const FilterBoxContainer = styled.ul`
  padding: 0;
  margin: 0;
  background-color: white;
  //height: 50px;
  width: 8rem;
  list-style: none;
  //width: fit-content;
  border: 1px solid #282c34;
  box-sizing: border-box;
  position: absolute;
  top: 30px;
  right: 50px;
  z-index: 1000;
`

// const CategoryList = styled.ul`
//   padding: 0;
//   margin: 0;
//   display: flex;
//   flex-direction: column;
//   column-gap: 6px;
//   row-gap: 6px;
//   list-style: none;
//   flex-wrap: wrap;
//   width: fit-content;
// `

const CategoryItem = styled.li`
  padding: 0.5rem;
  //background-color: antiquewhite;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  
  &:hover {
        background-color: rgba(40,44,52, 0.8);
        color: whitesmoke;
        cursor: pointer;
  } 
`