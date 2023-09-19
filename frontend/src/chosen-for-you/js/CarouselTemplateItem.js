import {API_URL} from "../../helpers/Helpers";

import styled from "styled-components";
import "../css/carousel-template.css"


export function CarouselTemplateItem( {product} ) {
        return (
            <CarouselTemplateItemContainer>
                <Link to="" >
                    <div>
                        <Img
                            src={`${API_URL}${product.image}`}
                            alt={`${product.title}` + "image"}
                            className="item-image"
                        />
                    </div>
                    <Context>
                        <Title>{product.title}</Title>
                    </Context>
                </Link>
            </CarouselTemplateItemContainer>
        )

}

const CarouselTemplateItemContainer = styled.li`
  scroll-snap-align: start;
  flex-shrink: 0;
  display: flex;
`

const Link = styled.a`
    display: flex;
    width: 100%;
    font-size: 14px;
    line-height: 1.25;
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
    text-align: left;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 6px;
    overflow: hidden;
    padding-bottom: 12px;
    flex-direction: column;
`

const Img = styled.img``
const Context = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
`

const Title = styled.span`
    overflow-wrap: break-word;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    display: block;
    font-size: 12px;
    margin-left: 8px;
    margin-bottom: 0.125em;
    font-weight: 700;
`