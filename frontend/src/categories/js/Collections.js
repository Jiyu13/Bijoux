import styled from "styled-components";
import "../css/category-list.css"
import { Link } from "react-router-dom";
import {ToggleCollection} from "../../toggle-collection-carousel/js/ToggleCollection";


export function Collections({categories, handleChangeCollection, isSelected, products} ) {



    // const bgColor = isSelected ?

    return (
        <>

            <CategoryContainer>
                <CategoryTitle>
                    Our Collections
                </CategoryTitle>
                <Description>
                    {/*Delve into an exquisite array of jewelry collections, */}
                    Explore and find a piece that resonates with your personal style.
                </Description>

                <CategoryItems>

                    {categories?.map((c, index) => {
                        return (
                            <CategoryItem
                                key={index}
                                data-value={c["category_name"]}
                                onClick={handleChangeCollection}
                                style={{backgroundColor: isSelected === c["category_name"] ? "rgba(40,44,52, 0.9)" : "rgba(40,44,52, 0.6)"}}
                            >
                                <Link to=""
                                    style={{
                                      textDecoration: "none",
                                      color: "inherit",
                                        // backgroundColor:
                                    }}
                                >
                                        <Text>{c["category_name"]}</Text>
                                </Link>
                            </CategoryItem>
                        )
                    })}
                </CategoryItems>
            </CategoryContainer>
        </>
    )
}

const CategoryContainer = styled.div`
    box-sizing: border-box;
    margin: 36px auto;
    display: flex;
    flex-direction: column;
    text-align: center;
`
const CategoryTitle = styled.h2`
  font-size: 20px;
    margin-bottom: 0;
    font-weight: 700;
    white-space: nowrap;
`
const Description = styled.p`
  font-size: 14px;
`
const CategoryItems = styled.ul`
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
    justify-content: center;
    gap: 24px;
`
const CategoryItem = styled.li`
  text-align: center;
  //background-color: rgba(40,44,52, 0.6);
  padding: 6px 12px;
  color: white;
  
  &:hover {
    background-color: rgba(40,44,52, 0.9);
  }

`
const Text = styled.div`
  margin-bottom: 0;
`

