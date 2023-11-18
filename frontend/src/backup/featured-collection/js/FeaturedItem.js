import earring from "../images/earring.jpg"
import necklace from "../images/necklace.jpg"
import ring from "../images/ring.jpg";
import styled from "styled-components";
import {useContext} from "react";
import {UserContext} from "../../../global/user-context/UserContext";

export function FeaturedItem() {

    const {isMobile, isTablet} = useContext(UserContext)
    return (
        <>

            {isMobile && (
                <div>
                    <MobileCollectionItem style={{ width: "80%", backgroundImage: `url(${ring})`}}>
                        <MobileSloganContainer style={{left: "10%"}} >
                            <MobileSloganText>Hot Summer Collection</MobileSloganText>
                            <MobileSloganButton>Shop Now</MobileSloganButton>
                        </MobileSloganContainer>
                        {/*<MobileImg src={ring} alt="ring collection"/>*/}
                    </MobileCollectionItem>
                    <MobileCollectionItem style={{ width: "80%", backgroundImage: `url(${earring})`}}>
                        <MobileSloganContainer style={{left: "50%"}}>
                            <MobileSloganText>Hot Summer Collection</MobileSloganText>
                            <MobileSloganButton>Shop Now</MobileSloganButton>
                        </MobileSloganContainer>
                        {/*<MobileImg src={earring} alt="earring collection"/>*/}
                    </MobileCollectionItem>
                    <MobileCollectionItem style={{ width: "80%", backgroundImage: `url(${necklace})`}}>
                        <MobileSloganContainer style={{left: "10%"}}>
                            <MobileSloganText>Hot Summer Collection</MobileSloganText>
                            <MobileSloganButton>Shop Now</MobileSloganButton>
                        </MobileSloganContainer>
                        {/*<MobileImg src={necklace} alt="necklace collection"/>*/}
                    </MobileCollectionItem>
                </div>
            )}

            {!isMobile && (
                <div style={{display: "flex", padding: "0 1.8rem"}}>
                    <CollectionItem style={{ width: "30%"}}>
                        <SloganContainer style={{left: "10%"}}>
                            <SloganText>Hot Summer Collection</SloganText>
                            <SloganButton>Shop Now</SloganButton>
                        </SloganContainer>
                        <Img src={ring} alt="ring collection"/>
                    </CollectionItem>
                    <CollectionItem style={{ width: "30%"}}>
                        <SloganContainer style={{left: "40%"}}>
                            <SloganText>Hot Summer Collection</SloganText>
                            <SloganButton>Shop Now</SloganButton>
                        </SloganContainer>
                        <Img src={earring} alt="earring collection"/>
                    </CollectionItem>
                    <CollectionItem style={{ width: "30%"}}>
                        <SloganContainer style={{left: "50%"}}>
                            <SloganText>Hot Summer Collection</SloganText>
                            <SloganButton>Shop Now</SloganButton>
                        </SloganContainer>
                        <Img src={necklace} alt="necklace collection"/>
                    </CollectionItem>
                </div>
            )}
        </>
    )
}
// ======================== mobile version css styles ===============================
const MobileCollectionItem = styled.li`
  margin: 0 auto;
  position: relative;
  cursor: pointer;
  height: 200px;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`
const MobileSloganContainer = styled.div`
  position: absolute;
  color: white;
  top: 25%;
  text-align: center;
`
const MobileSloganText = styled.div`
  font-size: 24px;
  width: 200px;
  white-space: normal;
  overflow-wrap: break-word;`

const MobileSloganButton = styled.div`
  font-size: 16px;
  font-weight: bold;
  width: 90px;
  margin: 16px auto;
  
  &:hover {
    text-decoration: underline;
  }
`
const MobileImg = styled.img`
  width: 100%;
`
// ======================================================================
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