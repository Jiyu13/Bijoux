import arrow_back_ios_white_24dp from "../arrows/arrow_back_ios_white_24dp.svg";
import arrow_forward_ios_white_24dp from "../arrows/arrow_forward_ios_white_24dp.svg";

import "../css/slider-template.css"
import styled from "styled-components"
import {API_URL} from "../../helper-functions/fetchFromAPI";
import {useEffect, useRef, useState} from "react";

export function SliderTemplate( props ) {

    const {products, sectionContent, backgroundColor, borderRadius} = props

    let className = sectionContent.split(" ").join("-")

    const [buttonBackground, setBackground] = useState("none")
    const [isDisplay, setDisplay] = useState("none")
    const [prevDisable, setPrevDisable] = useState(true)
    const [nextDisable, setNextDisable] = useState(false);
    const sliderRef = useRef(null);


    const checkButtons = () => {
        if (sliderRef?.current) {
            const offsetWidthValue = sliderRef.current.offsetWidth
            const scrollWidthValue = sliderRef.current.scrollWidth
            const scrollLeftValue = sliderRef.current.scrollLeft

            setPrevDisable(scrollLeftValue === 0)
            setNextDisable(scrollLeftValue + offsetWidthValue >= scrollWidthValue)
        }
    }

    function handleScrollLeft() {
        // console.log(sliderRef)
        if (sliderRef.current) {
            console.log("click left")
            sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth / 2;
            checkButtons();
        }
    }
    function handleScrollRight() {
         if (sliderRef.current) {
             sliderRef.current.scrollLeft += sliderRef.current.offsetWidth / 2;
             checkButtons();
         }
    }

    useEffect(() => {
        checkButtons()
    }, []);

    function handleOnMouseEnter() {
        let target = sliderRef.current.className
        if (target.includes(className)) {
            setDisplay("")
            setBackground("rgba(0,0,0, 0.6)")
        }
    }

    function handleMouseLeave() {
        setDisplay("none")
        setBackground("none")
    }

    return (
        <ComponentContainer
            style={{
                backgroundColor: backgroundColor,
                borderRadius: borderRadius
            }}
        >
            <ComponentWrapper>
                 <TitleWrapper>
                    <Title>{sectionContent}</Title>
                 </TitleWrapper>


                <SliderContainer >
                    <SliderWrapper
                        className={className}
                        ref={sliderRef}
                        onMouseOver={handleOnMouseEnter}
                        onMouseOut={handleMouseLeave}
                    >
                            {
                                products?.map((product, index) => {
                                    return (

                                        <SliderItem key={index}>
                                            <Link to="" >
                                                <div>
                                                    <Img
                                                        src={`${API_URL}${product.image}`}
                                                        alt={`${product.title} image`}
                                                        className="item-image"
                                                    />
                                                </div>
                                                <ItemTitleWrapper>
                                                    <ItemTitle style={{fontSize: "0.875rem"}}>{product.title}</ItemTitle>
                                                    <ItemTitle>${product.price}</ItemTitle>
                                                </ItemTitleWrapper>
                                            </Link>

                                        </SliderItem>
                                    )
                                })
                            }
                        <SliderButton
                            style={{left: "1rem", display: isDisplay, backgroundColor: buttonBackground}}
                            className={prevDisable ? "disabled" : "slider-btn"}
                            aria-disabled={prevDisable}
                            onClick={handleScrollLeft}

                        >
                            <img src={arrow_back_ios_white_24dp} alt="previouse arrow button"/>
                        </SliderButton>
                        <SliderButton
                            style={{right: "1rem", display: isDisplay, backgroundColor: buttonBackground}}
                            className={nextDisable ? "disabled" : "slider-btn"}
                            aria-disabled={nextDisable}
                            onClick={handleScrollRight}
                        >
                            <img src={arrow_forward_ios_white_24dp} alt="next arrow button"/>
                        </SliderButton>

                    </SliderWrapper>
                </SliderContainer>
            </ComponentWrapper>
        </ComponentContainer>
    )
}

//
const ComponentContainer = styled.div`
  margin: 24px auto;
`
const ComponentWrapper = styled.div``
const TitleWrapper = styled.div`
    font-family: "Helvetica for Target", HelveticaForTarget, Targetica, "HelveticaNeue for Target", "Helvetica Neue", Helvetica, Arial, sans-serif;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    gap: 0px;
    margin-left: 8px;
`
const Title = styled.h2`
    margin-bottom: 0;
    font-weight: 700;
    white-space: nowrap;
`

// Slider Styling
const SliderContainer = styled.div`
    position: relative;
`
const SliderWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    padding: 16px 8px;
    scroll-padding: 8px;
    overflow: hidden hidden;
    overscroll-behavior-x: none;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    align-items: center;
    gap: 16px;
`
const SliderItem = styled.div`
    scroll-snap-align: start;
    flex-shrink: 0;
    display: flex;
`
const Link = styled.a`
    display: flex;
    width: 100%;
    font-size: 14px;
    line-height: 1.25;
    //background-color: rgb(255, 255, 255);
    border-radius: 4px;
    text-align: left;
    position: relative;
    //box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 6px;
    overflow: hidden;
    flex-direction: column;
    cursor: pointer;
    //position: relative;

`
const Img = styled.img`
    height: 100%;
    transition: transform .8s;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 6px;

  
    &:hover {
    transform: scale(1.05);
    }
`
const ItemTitleWrapper = styled.div`
    //position: absolute;
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    padding: 12px 0;
`
const ItemTitle = styled.span`
    overflow-wrap: break-word;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    display: block;
    font-size: 1rem;
    //margin-left: 8px;
    margin-bottom: 0.125em;
    //font-weight: 700;
    //color: white;
`

const SliderButton = styled.div`
    margin-left: 8px;
    margin-right: 8px;
    z-index: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: center;
    transition: opacity 300ms ease 0s;
    //background-color: rgba(0,0,0, 0.2);
    border-radius: 50%;
    border: none;
    width: 48px;
    cursor: pointer;
    //
    //&:hover {
    //  background-color: rgba(0,0,0, 0.6);
    //}
`
