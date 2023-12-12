import new_arrival from '../images/new_arrival.jpg'
import bracelet  from '../images/bracelet.jpg'
import earrings from '../images/earrings.jpg'
import necklace from '../images/necklace.jpg'
import rings from '../images/rings.jpg'
import styled from "styled-components";
import "../css/collections_2.css"
import {ShopButtonLink} from "../../components/buttons";


export function Collections2() {
    return (
        <CategoryContainer className='category-container'>

             {/* ============= Earrings =======================   */}
            <CategoryItem className="earrings" href={'/shop/earrings'}>
                <Img src={earrings} alt="earrings"/>
                <ShopButton>
                    <ShopButtonLink href={'/shop/earrings'}>Earrings</ShopButtonLink>
                </ShopButton>
            </CategoryItem>

            {/* ============= Necklace =======================   */}
            <CategoryItem className="necklace" href={'/shop/necklaces'}>
                <Img src={necklace} alt="necklace"/>
                <ShopButton>
                    <ShopButtonLink href={'/shop/necklaces'}>Necklaces</ShopButtonLink>
                </ShopButton>
            </CategoryItem>

            {/* ============= Rings ==========================   */}
            <CategoryItem className="rings" href={'/shop/rings'}>
                <Img src={rings} alt="rings"/>
                <ShopButton>
                    <ShopButtonLink href={'/shop/rings'}>Rings</ShopButtonLink>
                </ShopButton>
            </CategoryItem >

            {/* ============= Bracelets ======================   */}
            <CategoryItem className="bracelet" href={'/shop/bracelets'}>
                <Img src={bracelet} alt="bracelet"/>
                <ShopButton>
                    <ShopButtonLink href={'/shop/bracelets'}>Bracelets</ShopButtonLink>
                </ShopButton>
            </CategoryItem>


            {/* ============= New Arrivals ===================  */}
            <CategoryItem className="new_arrivals" href={'/shop/new-arrivals'}>
                <Img src={new_arrival} alt="new arrivals"/>
                <ShopButton>
                    <ShopButtonLink href={'/shop/new-arrivals'}>New Arrivals</ShopButtonLink>
                </ShopButton>

            </CategoryItem>


        </CategoryContainer>
    )
}

const CategoryContainer = styled.div`
  display: grid;
  grid-gap: 15px;
  margin: 0 auto;
  max-width: 1440px;
  box-sizing: border-box;
`
const CategoryItem = styled.a`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block; 
    margin: 0px;
    position: relative;
    cursor: pointer;
`

const  ShopButton = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -80%)  // horizontally, vertically
`



// const  ShopButtonLink = styled.a`
//     color: white;
//     background-color: rgba(40,44,52, 0.6);
//     //width: 30%;
//     display: inline-block;
//     padding: 12px 20px;
//     margin: 32px auto 0;
//     cursor: pointer;
//     font-size: 0.9rem;
//
//     &:hover{
//       background-color: rgba(40,44,52, 0.9);
//     }
// `
const Img = styled.img`
  width: 100%;
  height: 100%;
`