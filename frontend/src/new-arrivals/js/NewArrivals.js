import arrow_back_ios_black_24dp from "../arrows/arrow_back_ios_black_24dp.svg";
import arrow_forward_ios_black_24dp from "../arrows/arrow_forward_ios_black_24dp.svg";

import styled from "styled-components"
import {API_URL} from "../../helpers/Helpers";
import {useEffect, useRef, useState} from "react";

export function NewArrivals( {products} ) {

    const [prevDisable, setPrevDisable] = useState(true)
    const [nextDisable, setNextDisable] = useState(false);
    const sliderRef = useRef(null);

    const checkButtons = () => {
        if (sliderRef?.current) {
            const offsetWidthValue = sliderRef.current.offsetWidth
            const scrollWidthValue = sliderRef.current.scrollWidth
            const scrollLeftValue = sliderRef.current.scrollLeft

            setPrevDisable(scrollLeftValue <= 0)
            setNextDisable(scrollLeftValue + offsetWidthValue >= scrollWidthValue)
        }
    }

    function handleScrollLeft() {
        console.log(sliderRef)
        if (sliderRef.current) {
            console.log("click left")
            sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth / 2;
            console.log(sliderRef.current.scrollLeft)
            checkButtons();
        }
    }
    function handleScrollRight() {
        console.log("click right")
         if (sliderRef.current) {
             sliderRef.current.scrollLeft += sliderRef.current.offsetWidth / 2;
             console.log(sliderRef.current.scrollLeft)
             checkButtons();
         }
    }

    useEffect(() => {
        checkButtons()
    }, []);

    // let classNam

    return (
        <ComponentContainer>
            <ComponentWrapper>
                 <TextWrapper>
                    <Text>Picks For You</Text>
                 </TextWrapper>


                <SliderContainer >
                    <SliderWrapper ref={sliderRef}>
                            {
                                products?.map((product, index) => {
                                    return (

                                        <SliderItem key={index}>
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

                                        </SliderItem>
                                    )
                                })
                            }
                        <SliderButton
                            style={{left: "1rem"}}
                            className={prevDisable ? "disabled" : ""}
                            aria-disabled={prevDisable}
                            onClick={handleScrollLeft}
                        >
                            <img src={arrow_back_ios_black_24dp}/>
                        </SliderButton>
                        <SliderButton
                            style={{right: "1rem"}}
                            className={nextDisable ? "disabled" : ""}
                            aria-disabled={nextDisable}
                            onClick={handleScrollRight}
                        >
                            <img src={arrow_forward_ios_black_24dp}/>
                        </SliderButton>

                    </SliderWrapper>
                </SliderContainer>
            </ComponentWrapper>
        </ComponentContainer>
    )
}

//
const ComponentContainer = styled.div``
const ComponentWrapper = styled.div``
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
    background-color: rgba(255,255,255, 0.5);
    border-radius: 50%;
    border: none;
    width: 48px;
    cursor: pointer;
`
