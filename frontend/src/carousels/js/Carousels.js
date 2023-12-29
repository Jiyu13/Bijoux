import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import styled from "styled-components";
import "../css/carousel.css"

import arrow_back_ios_black_24dp from "../arrows/arrow_back_ios_black_24dp.svg"
import arrow_forward_ios_black_24dp from "../arrows/arrow_forward_ios_black_24dp.svg"

import {API_URL} from "../../helper-functions/fetchFromAPI"

export function Carousels() {

    const {carousels, isMobile} = useContext(UserContext)
    const [currentImg, setCurrentImg] = useState(0)
    const [itemStyleTransform, setItemStyleTransform] = useState(null)

    const carouselHeight = isMobile ? "36rem" : "default"

    useEffect(() => {
        setItemStyleTransform(`translateX(${currentImg * -100}%)`)
    }, [currentImg]);

    function scrollPrev() {
        if (currentImg === 0) return
        setCurrentImg(curr=> curr - 1)
    }

    function scrollNext() {
        if (currentImg === carousels.length - 1) return
        setCurrentImg(curr => curr + 1)
    }

    return (
        <div>
            <CarouselContainer1 className="carousel-container" style={{minHeight: "clamp(350px, 100vh, 450px)"}}>
                <CarouselInner1 className="carousel-viewport">
                    <CarouselItems
                        className="items"
                        style={{transform: itemStyleTransform, minHeight: "clamp(350px, 100vh, 450px)"}}
                    >
                        {carousels?.map((carousel, index) => {
                            return (
                                 <CarouselItem key={index} className="item">
                                    <Img src={`${API_URL}${carousel.image}`} alt={carousel.theme}/>
                                     <SloganText>
                                         <Text>{carousel.caption}</Text>
                                         <ShopButton>Shop Now</ShopButton>
                                    </SloganText>
                                </CarouselItem>
                        )})}


                    </CarouselItems>
                </CarouselInner1>
                <LeftArrow1
                    className="carousel-control prev"
                    onClick={scrollPrev}
                >
                    <ArrowImg src={arrow_back_ios_black_24dp} />
                </LeftArrow1>

                <RightArrow1
                    className="carousel-control next"
                    onClick={scrollNext}
                >
                    <ArrowImg src={arrow_forward_ios_black_24dp} />
                </RightArrow1>


            </CarouselContainer1>
            {/*<CarouselDots className="carousel-dots">*/}
            {/*    <Dot className="dot active">1</Dot>*/}
            {/*    <Dot className="dot">2</Dot>*/}
            {/*    <Dot className="dot">3</Dot>*/}
            {/*</CarouselDots>*/}

            <div
                style={{
                    textAlign: "center",
                    margin: "5rem 1.8rem"
                }}
            >
                <h2 style={{fontSize: "1.3rem"}}>Discover Your Signature</h2>
                 Find your signature piece that reflects your style and personality. It's time to shine your way.
            </div>
        </div>



    )
}


const CarouselContainer1 = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template: "carousel-container" 1fr;
  place-items: center;
  place-content: center;
  overflow: hidden;
  //max-height: clamp(450px, 100vh, 700px);
  margin: 0 auto;
  width: 100%;
  //color: white;
`
const CarouselInner1 = styled.div`
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  
  //z-index: -1;
`

const CarouselItems = styled.ul`
  width: 100%;
  position: relative;
  display: flex;
  transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1);
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: clamp(450px, 100vh, 700px);
`

const CarouselItem = styled.li`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  min-width: 100%;
  transform: translateZ(0);
`
const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  cursor: pointer;
  //border-radius: 16px;
`

const SloganText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    //background-color: #282c34;
    width: 60%; /* Adjust width as needed */
    padding: 10px;
    border-radius: 10px; /* Optional: for rounded corners */
    text-align: center;
`

const Text = styled.div`
    font-size: 1.5rem; /* You can customize this value */
    font-weight: bolder;
    line-height: 1.5rem;
`

const  ShopButton = styled.div`
    color: white;
    background-color: rgba(40,44,52, 0.6);
    //width: 30%;
    display: inline-block;
    padding: 12px 20px;
    margin: 32px auto 0;
    cursor: pointer;
    font-size: 0.9rem;
    
    &:hover{
      background-color: rgba(40,44,52, 0.9);
    }
`

const LeftArrow1 = styled.button`
    margin: 0;
    place-self: center left;
`

const RightArrow1 = styled.button`
  margin: 0;
  place-self: center right;
`
const ArrowImg = styled.img`
  width: 60%;
  height: 60%;
  pointer-events: none;
  margin: auto 0
`

// const CarouselDots = styled.ol`
//   place-self: end center;
//   //display: grid;
//   //grid-template-columns: repeat(3, 1fr);
//   //gap: 1rem;
//   display: flex;
//   justify-content: center;
//   list-style-type: none;
//   padding: 0;
//   z-index: 1;
// `
//
// const Dot = styled.li`
//     display: flex;
//     gap: 1rem;
//     padding: 1rem;
//     margin: 0 12px;
//    
// `