import styled from "styled-components";
import "../css/category-list.css"
import {API_URL} from "../../helper-functions/Helpers"
import { Link } from "react-router-dom";

export function Categories( {categories} ) {
    return (
        <CategoryContainer>
            <CategoryTitle>
                Shop By Collections
            </CategoryTitle>
            <CategoryItems className="category-list">

                {categories?.map((c, index) => {
                    return (
                        <CategoryItem key={index} className="category-item">
                            <Link to="" style={{textDecoration: "none", color: "inherit"}}>
                                <ItemWrapper>
                                    <Img src={`${API_URL}${c.cover_image}`} alt={`shop by ${c.category_name}`}/>
                                    <Text>{c.category_name}</Text>
                                </ItemWrapper>

                            </Link>
                        </CategoryItem>
                    )
                })}
            </CategoryItems>
        </CategoryContainer>
    )
}

const CategoryContainer = styled.div`
    font-family: "Helvetica for Target", HelveticaForTarget, Targetica, "HelveticaNeue for Target", "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    margin: 0 auto 24px;
    display: flex;
    flex-direction: column;
`
const CategoryTitle = styled.h2`
    margin-bottom: 0;
    font-weight: 700;
    white-space: nowrap;
`
const CategoryItems = styled.ul`
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
    justify-content: center;
`
const CategoryItem = styled.li``
const ItemWrapper = styled.div`
    box-sizing: border-box;
    text-align: center;
    &:hover {
      text-decoration: underline;
      transition: opacity 200ms ease-out;
    }
`

const Img = styled.img`
  border-radius: 16px;
  width: 100%;
  transition: transform .8s;
  
  &:hover {
    transform: scale(1.05);
  }
`
const Text = styled.p`
  margin-bottom: 0;
`

