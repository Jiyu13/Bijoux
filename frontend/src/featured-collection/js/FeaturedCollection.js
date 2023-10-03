import styled from "styled-components";

import earring from "../images/earring.jpg"
import necklace from "../images/necklace.jpg"
import ring from "../images/ring.jpg"
import {useContext} from "react";
import {UserContext} from "../../global/user-context/UserContext";
import {FeaturedItem} from "../FeaturedItem";

export function FeaturedCollection() {

    const {isMobile, isTablet} = useContext(UserContext)

    // const left = isMobile || isTablet ?

    return (
        <FeatureCollectionContainer>
            <CollectionItemList style={{ flexDirection: isMobile ? "column" : " row"}}>
                {/*<CollectionItem style={{ width: isMobile ? "80%" : "30%" }}>*/}
                {/*    <SloganContainer style={{left: "10%"}}>*/}
                {/*        <SloganText>Hot Summer Collection</SloganText>*/}
                {/*        <SloganButton>Shop Now</SloganButton>*/}
                {/*    </SloganContainer>*/}
                {/*    <Img src={ring} alt="ring collection"/>*/}
                {/*</CollectionItem>*/}
                {/*<CollectionItem*/}
                {/*    style={{ width: isMobile ? "80%" : "30%" }}>*/}
                {/*    <SloganContainer style={{left: "40%"}}>*/}
                {/*        <SloganText>Hot Summer Collection</SloganText>*/}
                {/*        <SloganButton>Shop Now</SloganButton>*/}
                {/*    </SloganContainer>*/}
                {/*    <Img src={earring} alt="earring collection"/>*/}

                {/*</CollectionItem>*/}
                {/*<CollectionItem style={{ width: isMobile ? "80%" : "30%" }}>*/}
                {/*    <SloganContainer style={{left: "60%"}}>*/}
                {/*        <SloganText>Hot Summer Collection</SloganText>*/}
                {/*        <SloganButton>Shop Now</SloganButton>*/}
                {/*    </SloganContainer>*/}

                {/*    <Img src={necklace} alt="necklace collection"/>*/}
                {/*</CollectionItem>*/}
                <FeaturedItem />

            </CollectionItemList>

        </FeatureCollectionContainer>
    )

}

const FeatureCollectionContainer = styled.div`
  margin: 24px auto;
  box-sizing: border-box;
`
const CollectionItemList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: space-between;
  gap: 8px;
`
const CollectionItem = styled.li`
  flex: 1;        // each item to take equal space in the flex container
  text-align: center;
  position: relative;
  cursor: pointer;
`

const SloganContainer = styled.div`
  position: absolute;
  color: white;
  top: 30%;
  
`
const SloganText = styled.div`
  width: 90px;
  white-space: normal;
  overflow-wrap: break-word;
`
const SloganButton = styled.div`
  font-size: 12px;
  font-weight: bold;
  
  //color: white;
  //background-color: #282c34;
  width: 90px;
  
  &:hover {
    text-decoration: underline;
  }
`

const Img = styled.img`
  max-width: 100%;
  height: auto;
    /* If you want the image to always fill its container (like a background),
    you can use these properties, but note they might cause cropping */
    // width: 100%;
    // height: 100%;
    // object-fit: cover;
`