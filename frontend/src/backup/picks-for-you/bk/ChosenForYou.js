import styled from "styled-components";
import "../css/carousel-template.css"
import {CarouselTemplateItem} from "./CarouselTemplateItem";
import {CarouselTemplateControls} from "./CarouselTemplateControls";

export function ChosenForYou({products}) {

    let carouselTemplateContainer = document.querySelector(".carousel-template-items")



    function handleScrollPrev() {
        let width = carouselTemplateContainer?.clientWidth
        carouselTemplateContainer.scrollLeft = carouselTemplateContainer.scrollLeft - width + 200
    }

    function handleScrollNext() {
        let width = carouselTemplateContainer?.clientWidth
        carouselTemplateContainer.scrollLeft = carouselTemplateContainer.scrollLeft + width - 200
    }

    return (
        <ChosenContainer className="carousel-template-container">
            <ChosenWrapper>
                <TextWrapper>
                    <Text>Picks For You</Text>
                </TextWrapper>

                <CarouselTemplateContainer >
                    <CarouselTemplateInner>
                        <CarouselTemplateItems
                            className="carousel-template-items"
                        >
                            {products?.map((p, index) => {
                                return (
                                    <CarouselTemplateItem product={p} key={index}/>
                                )

                            })}

                        </CarouselTemplateItems>

                        <CarouselTemplateControls
                            handleScrollPrev={handleScrollPrev}
                            handleScrollNext={handleScrollNext}
                        />
                    </CarouselTemplateInner>

                </CarouselTemplateContainer>


            </ChosenWrapper>

        </ChosenContainer>
    )
}

const ChosenContainer = styled.div``
const ChosenWrapper  = styled.div``

const TextWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    gap: 0px;
    margin-left: 8px;
`
const Text = styled.h2`
  white-space: pre-wrap;
  overflow-wrap: break-word;
  margin-bottom: 0;
  font-size: 20px;
`

const CarouselTemplateContainer = styled.div``
const CarouselTemplateInner = styled.div`
  position: relative;
  z-index: 0;
  overflow: hidden;
  display: block;
`
const CarouselTemplateItems = styled.ul`
  box-sizing: border-box;
  display: flex;
  padding: 16px 8px;
  margin-top: 0;
  scroll-padding: 8px;  // screen media min-w 768: gap 12px, scroll-padding: 16px;
  overflow: hidden hidden;
  overscroll-behavior-x: none;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  list-style: none;
  gap: 16px;
`

