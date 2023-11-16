import new_arrival from '../images/new_arrival.jpg'
import bracelet  from '../images/bracelet.jpg'
import earrings from '../images/earrings.jpg'
import necklace from '../images/necklace.jpg'
import rings from '../images/rings.jpg'
import styled from "styled-components";
import "../css/collections_2.css"

export function Collections2() {
    return (
        <CategoryContainer className='category-container'>

             {/* ============= Earrings =======================   */}
            <CategoryItem className="earrings">
                <Img src={earrings} alt="earrings"/>
                <ShopButton
                    // style={{top: "60%", left: "35%"}}
                >
                    <ShopButtonText>Earrings</ShopButtonText>
                </ShopButton>
            </CategoryItem>

            {/* ============= Necklace =======================   */}
            <CategoryItem className="necklace">
                <Img src={necklace} alt="necklace"/>
                <ShopButton
                    // style={{top: "60%", left: "35%"}}
                >
                    <ShopButtonText>Necklaces</ShopButtonText>
                </ShopButton>
            </CategoryItem>

            {/* ============= Rings ==========================   */}
            <CategoryItem className="rings">
                <Img src={rings} alt="rings"/>
                <ShopButton
                    // style={{top: "60%", left: "35%"}}
                >
                    <ShopButtonText>Rings</ShopButtonText>
                </ShopButton>
            </CategoryItem >

            {/* ============= Bracelets ======================   */}
            <CategoryItem className="bracelet">
                <Img src={bracelet} alt="bracelet"/>
                <ShopButton
                    // style={{top: "60%", left: "35%"}}
                >
                    <ShopButtonText>Bracelets</ShopButtonText>
                </ShopButton>
            </CategoryItem>


            {/* ============= New Arrivals ===================  */}
            <CategoryItem className="new_arrivals">
                <Img src={new_arrival} alt="new arrivals"/>
                <ShopButton
                    // style={{top: "80%", left: "45%"}}
                >
                    <ShopButtonText>New Arrivals</ShopButtonText>
                </ShopButton>

            </CategoryItem>


        </CategoryContainer>
    )
}

const CategoryContainer = styled.div`
  display: grid;

  grid-gap: 15px;
  margin: 0 auto;
  box-sizing: border-box;
  //position: relative;
`
const CategoryItem = styled.figure`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; 
    margin: 0px;
    position: relative;
`

const  ShopButton = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -80%)  // horizontally, vertically
`



const  ShopButtonText = styled.div`
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
const Img = styled.img`
  width: 100%;
  height: 100%;
`