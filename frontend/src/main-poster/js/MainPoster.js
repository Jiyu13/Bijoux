import styled from "styled-components";
import homepage_poster from "../images/homepage_poster.jpg"

export function MainPoster() {
    return (
        <PosterContainer>
            {/*<PosterImage src={homepage_poster} alt="homepage poster"/>*/}
            <PosterContent>
                <Title>ZetaMaitia Studios</Title>
                <ShopButton type="button" value="Shop">Shop Now</ShopButton>
            </PosterContent>


        </PosterContainer>
    )
}

const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #282c34;
  background-image: url(${homepage_poster});
  background-size: cover;
  height: 450px;
  background-repeat: no-repeat;
`
const PosterContent = styled.div`
  max-width: 80%;

`
const Title = styled.h1`
  font-size: 60px;
  text-align: center;
`
const ShopButton = styled.button`
  display: flex;
  font-size: 1rem;
  border: none;
  background-color: #eb4d4b;
  padding: 8px 36px;
  margin: 0 auto
`