import {useContext, useState} from "react";
import {UserContext} from "../../../global/user-context/UserContext";
import styled from "styled-components";

export function ProductImagesSection({coverImage,otherImages}) {

    const {isMobile} = useContext(UserContext)

    const [currentImage, setCurrentImage] = useState(null)
    function handleClick(e) {
        setCurrentImage(e.currentTarget.dataset.customAttribute)
    }

    const showcaseImage  = currentImage === null ? coverImage : currentImage

    return (
        <ProductImagesSectionBox style={{ width: isMobile ? "100%" : "65%" }} >

            {/*================= main image ==================================*/}
            <div>
                <img src={showcaseImage} style={{width: "100%"}} alt={showcaseImage}/>
            </div>



            {/*================= below main image list =======================*/}
            <SmallImagesList>

                {otherImages?.length > 0 && (
                    <ImageItem data-custom-attribute={coverImage} onClick={handleClick}>
                        <img src={coverImage} style={{width: "100%"}} alt={coverImage}/>
                    </ImageItem>
                )}

                {otherImages?.map((image, index) => {
                    return (
                        <ImageItem key={image.product_image} data-custom-attribute={image.product_image} onClick={handleClick}>
                            <img
                                src={image.product_image}
                                alt={image.product_image}
                                style={{width: "100%"}}
                            />
                        </ImageItem>
                    )
                })}
            </SmallImagesList>

        </ProductImagesSectionBox>
    )
}

const ProductImagesSectionBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const SmallImagesList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    column-gap: 9px;
    box-sizing: border-box;
    margin-top: 0.7rem;
    padding-left: 0;
    list-style: none;
`

const ImageItem = styled.li`
    flex-basis: 18%; // (5 images in a row)
    box-sizing: border-box; 
    cursor: pointer;
    
    //&:hover {
    //  border: 1px solid black
    //}
`