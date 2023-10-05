import arrow_back_ios_white_24dp from "../arrows/arrow_back_ios_white_24dp.svg";
import arrow_forward_ios_white_24dp from "../arrows/arrow_forward_ios_white_24dp.svg";

import "../css/slider-template.css"
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

    // function handleOnMouseEnter() {
    //     let target = sliderRef.current.className
    //     // console.log(target)
    //     if (target.includes(className)) {
    //         setDisplay("")
    //         setBackground("rgba(0,0,0, 0.6)")
    //     }
    // }

    // function handleMouseLeave() {
    //     setDisplay("none")
    //     setBackground("none")
    // }

    return (
        <ComponentContainer>
            <ComponentWrapper>
                 <TitleWrapper style={{marginLeft: isMobile || isTablet ? "8px" : ""}}>
                    <Title>collection / {sectionContent}</Title>
                     <a href="/shop" style={{fontSize: "14px", textDecoration: "none", color: "#0097e6"}}>view all</a>
                 </TitleWrapper>


                <SliderContainer >
                    <SliderWrapper
                        // className={className}
                        ref={sliderRef}
                        // onMouseOver={handleOnMouseEnter}
                        // onMouseOut={handleMouseLeave}
                    >
                        {
                            products?.map((product, index) => {
                                return (
                                    <SliderItem key={index}>
                                        {/*product.split(" ").join("-")*/}
                                        <Link href={`/products/${product.id}/`} >
                                            <Img
                                                src={`${API_URL}${product.image}`}
                                                alt={`${product.title} image`}
                                                className="item-image"
                                            />
                                            {/*<ItemTitleWrapper>*/}
                                                <ProductTitle
                                                    style={{
                                                        // fontSize: "0.875rem",
                                                        margin: "12px 0"
                                                    }}
                                                >{product.title}</ProductTitle>
                                                <ProductPrice
                                                    style={{
                                                        // marginTop: ".125rem"
                                                        fontSize: "1rem",
                                                    }}
                                                >${product.price}</ProductPrice>
                                            {/*</ItemTitleWrapper>*/}
                                        </Link>

                                    </SliderItem>
                                )
                            })
                        }

                        <SliderButton
                            style={{
                                left: "0.5rem",
                                // display: isDisplay,
                                backgroundColor: buttonBackground
                        }}
                            className={prevDisable ? "disabled" : "slider-btn"}
                            aria-disabled={prevDisable}
                            onClick={handleScrollLeft}

                        >
                            <img src={arrow_back_ios_white_24dp} alt="previouse arrow button"/>
                        </SliderButton>
                        <SliderButton
                            style={{
                                right: "0.5rem",
                                // display: isDisplay,
                                backgroundColor: buttonBackground
                        }}
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
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    gap: 0px;
`
const Title = styled.div`
    font-size: 12px;
    white-space: nowrap;
    text-decoration: underline;
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
    max-width: 156px;
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
`
const Img = styled.img`
    height: 100%;
    transition: transform .8s;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 6px;
    width: 156px;

  
    &:hover {
    transform: scale(1.05);
    }
`
const ItemTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    padding: 12px 0;
`
const ItemTitle = styled.div`
    max-width: 100%;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    
    font-size: 1rem;
    margin: 12px 0 0.125em;
    display: block;
    word-break: break-word;
    white-space: normal;
`

const SliderButton = styled.div`
    margin-left: 8px;
    margin-right: 8px;
    z-index: 1;
    position: absolute;
    top: 42%;
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
