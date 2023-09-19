import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../user-context/UserContext";
import styled from "styled-components";
import "../css/carousel.css"

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos"

import {API_URL} from "../../App";

export function Carousels() {

    const {carousels} = useContext(UserContext)
    const [currentImg, setCurrentImg] = useState(0)
    const [isClickArrow, setClickArrow] = useState(false)
    const [itemStyleTransform, setItemStyleTransform] = useState(null)

    let currentCarousel
    if (carousels) {
        currentCarousel = carousels[currentImg]
    }

    return (
            <CarouselContainer>
                <CarouselInner style={{backgroundImage: `url(${API_URL + currentCarousel?.image})`}}>
                    <LeftArrow>
                        <ArrowBackIosIcon/>
                    </LeftArrow>
                    <Center></Center>
                    <RightArrow>
                        <ArrowForwardIosIcon />
                    </RightArrow>

                    {/*<DotsSliders>*/}
                    {/*    ●*/}
                    {/*</DotsSliders>*/}

                </CarouselInner>

            </CarouselContainer>
    )
}

// =======================================================
const CarouselContainer = styled.div`
  width: 100%;
  height: 450px;
`
const CarouselInner = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  box-sizing: border-box;
`
// const Img = styled.img`
// `
// const CarouselImages = styled.div`width: 100px;height:100px;`

const LeftArrow = styled.div`
    flex: 5%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
    color: white;
    cursor: pointer;
`
const Center = styled.div`
    flex: 80%;
    height: 100%;
    display: grid;
    place-items: center;
    font-family: Arial, Helvetica, sans-serif;
    text-align: justify;
    text-align-last: center;
`
const RightArrow = styled.div`
    flex: 5%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
    color: white;
    cursor: pointer;
`

const DotsSliders = styled.div``