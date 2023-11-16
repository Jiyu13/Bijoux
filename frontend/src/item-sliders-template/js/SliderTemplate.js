import arrow_back_ios_white_24dp from "../arrows/arrow_back_ios_white_24dp.svg";
import arrow_forward_ios_white_24dp from "../arrows/arrow_forward_ios_white_24dp.svg";

import styled from "styled-components"
import {API_URL} from "../../helper-functions/fetchFromAPI";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {ProductPrice, ProductTitle} from "../../products/related-products/RelatedProducts";

export function SliderTemplate( props ) {

    const {isMobile, isTablet} = useContext(UserContext)
    const {products, sectionContent} = props

    // let className = sectionContent.split(" ").join("-")

    const [buttonBackground, setBackground] = useState("none")
    // const [isDisplay, setDisplay] = useState("none")
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
        if (sliderRef.current) {
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


    return (
        <ComponentContainer>
            <ComponentWrapper>
                <SliderContainer >
                    <SliderWrapper ref={sliderRef}>
                        {
                            products?.map((product, index) => {
                                return (
                                    <SliderItem key={index}>
                                        <Link href={`/products/${product.id}/`} >
                                            <Img
                                                src={`${API_URL}${product.image}`}
                                                alt={`${product.title} image`}
                                                className="item-image"
                                            />
                                                <ProductTitle
                                                    style={{
                                                        margin: "12px 0"
                                                    }}
                                                >{product.title}</ProductTitle>
                                                <ProductPrice
                                                    style={{
                                                        fontSize: "1rem",
                                                    }}
                                                >${product.price}</ProductPrice>
                                        </Link>

                                    </SliderItem>
                                )
                            })
                        }

                    </SliderWrapper>
                </SliderContainer>
                <SliderButton
                    style={{left: "35%",backgroundColor: buttonBackground}}
                    className={prevDisable ? "disabled" : "slider-btn"}
                    aria-disabled={prevDisable}
                    onClick={handleScrollLeft}

                >
                    <img src={arrow_back_ios_white_24dp} alt="previouse arrow button"/>
                </SliderButton>
                <SliderButton
                    style={{right: "35%", backgroundColor: buttonBackground}}
                    className={nextDisable ? "disabled" : "slider-btn"}
                    aria-disabled={nextDisable}
                    onClick={handleScrollRight}
                >
                    <img src={arrow_forward_ios_white_24dp} alt="next arrow button"/>
                </SliderButton>
            </ComponentWrapper>
        </ComponentContainer>
    )
}


const ComponentContainer = styled.div`
    margin: 24px auto;
`
const ComponentWrapper = styled.div``

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
    gap: 12px;
`
const SliderItem = styled.div`
    scroll-snap-align: start;
    flex-shrink: 0;
    display: flex;
    width: 45%;
`
const Link = styled.a`
    display: flex;
    width: 100%;
    font-size: 14px;
    line-height: 1.25;
    border-radius: 4px;
    text-align: left;
    position: relative;
    overflow: hidden;
    flex-direction: column;
    cursor: pointer;
    text-decoration: none;
    color: #656565;
`
const Img = styled.img`
    height: 100%;
    transition: transform .8s;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 6px;
    width: 100%;

  
    &:hover {
    transform: scale(1.05);
    }
`

const SliderButton = styled.div`
    z-index: 1;
    position: absolute;
    margin: 8px;
    transform: translateY(-50%);
    display: flex;
    height: 48px;
    align-items: center;
    justify-content: center;
    transition: opacity 300ms ease 0s;
    border-radius: 50%;
    border: none;
    width: 48px;
    cursor: pointer;
    background-color: rgba(0,0,0, 0.6);
`
