import styled from "styled-components"

import arrow_back_ios_black_24dp from "../arrows/arrow_back_ios_black_24dp.svg";
import arrow_forward_ios_black_24dp from "../arrows/arrow_forward_ios_black_24dp.svg";

export function CarouselTemplateControls( {handleScrollPrev, handleScrollNext} ) {
    return (
        <>
            <CarouselTemplateButton
                className="control-prev"
                style={{left: "0"}}
                onClick={handleScrollPrev}
            >
                <img src={arrow_back_ios_black_24dp}/>
            </CarouselTemplateButton>
            <CarouselTemplateButton
                className="control-next"
                style={{right: "0"}}
                onClick={handleScrollNext}
            >
                <img src={arrow_forward_ios_black_24dp}/>
            </CarouselTemplateButton>
    </>
    )
}

const CarouselTemplateButton = styled.button`
    margin-left: 8px;
    margin-right: 8px;
    z-index: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 300ms ease 0s;
    background-color: rgba(255,255,255, 0.5);
    color: rgb(255, 255, 255);
    font-size: 18px;
    border-radius: 9999px;
    border: none;
    width: 48px;
    cursor: pointer;
`