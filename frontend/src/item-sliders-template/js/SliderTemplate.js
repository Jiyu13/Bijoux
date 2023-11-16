import arrow_back_ios_white_24dp from "../arrows/arrow_back_ios_white_24dp.svg";
import arrow_forward_ios_white_24dp from "../arrows/arrow_forward_ios_white_24dp.svg";

import styled from "styled-components"
import {API_URL} from "../../helper-functions/fetchFromAPI";
import { useEffect, useRef, useState} from "react";
import {ProductContent} from "../../best-sellers/js/BestSellers";

export function SliderTemplate( props ) {

    const {products} = props

    const [pagination, setPagination] = useState(1)
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

        if (pagination > 1) {
            setPagination(pre => pre - 1)
        }

        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth / 2;
            checkButtons();
        }
    }
    function handleScrollRight() {

        if (pagination < 7) {
            setPagination(pre => pre + 1)
        }

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
                                if (index <= 7) {
                                    return (
                                        <SliderItem key={index}>
                                            <Link href={`/products/${product.id}/`}>
                                                <Img
                                                    src={`${API_URL}${product.image}`}
                                                    alt={`${product.title} image`}
                                                    className="item-image"
                                                />
                                                <ProductContent>
                                                    <h3
                                                        style={{
                                                            fontSize: "14px", margin: "6px 0"
                                                        }}
                                                    >
                                                        {product.title}
                                                    </h3>
                                                    <div style={{ fontSize: "1rem", }}>
                                                    ${product.price}</div>
                                                </ProductContent>
                                            </Link>

                                        </SliderItem>
                                    )
                                }
                            })
                        }

                    </SliderWrapper>
                </SliderContainer>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "60px",
                        justifyContent: "center",
                        fontSize: "0.8rem",
                        margin: "0 auto",
                    }}
                >
                    <SliderButton
                        className={prevDisable ? "disabled" : "slider-btn"}
                        aria-disabled={prevDisable}
                        onClick={handleScrollLeft}

                    >
                        <ButtonImg src={arrow_back_ios_white_24dp} alt="previouse arrow button"/>
                    </SliderButton>
                    <Pagination>
                        <span> {pagination} </span>
                        <span> / </span>
                        <span> 7 </span>
                    </Pagination>
                    <SliderButton
                        className={nextDisable ? "disabled" : "slider-btn"}
                        aria-disabled={nextDisable}
                        onClick={handleScrollRight}
                    >
                        <ButtonImg src={arrow_forward_ios_white_24dp} alt="next arrow button"/>
                    </SliderButton>
                </div>

            </ComponentWrapper>
        </ComponentContainer>
    )
}


const ComponentContainer = styled.div`
    margin: 24px auto 0;
`
const ComponentWrapper = styled.div``

// ============================== Slider Styling ==============================
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
    margin: 2rem 0 0;
    padding: 2rem;
    transform: translateY(-50%);
    transition: opacity 300ms ease 0s;
    border: none;
    width: 24px;
    height: 24px;
    cursor: pointer;
`
const ButtonImg = styled.img`
  width: 50%;
  height: 50%;
`

const Pagination = styled.div`
    margin: 1.5rem 0 0;
`