import styled from "styled-components";
import person_black_24 from "./icons/person_black_24dp.svg"
// import expand_more_black_24 from "./icons/expand_more_black_24dp.svg"
import shopping_bag_black from "./icons/shopping_bag_black_24dp.svg"
// import {SearchBar} from "../global/search-bar/SearchBar";
import search_black_24dp from "../global/search-bar/icons/search_black_24dp.svg";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../global/user-context/UserContext";


export function Accessibility() {

    const { isLogin } = useContext(UserContext)

    let navigate = useNavigate()
    function handleLogin() {
        {isLogin ? navigate('/account') : navigate('/login')}
    }


    return (
        <Container>
            <ContainerItem>
                <Img src={search_black_24dp} alt="search icon"/>
            </ContainerItem>
            <ContainerItem style={{display: "flex"}} onClick={handleLogin}>
                <Img src={person_black_24} alt="account icon" />
                {/*<UserName>*/}
                    {/*{currentUser ? ""}*/}
                {/*</UserName>*/}
                {/*<Img src={expand_more_black_24} alt="dropdown icon"/>*/}
            </ContainerItem>
            <ContainerItem>
                <Img src={shopping_bag_black} alt="cart icon"/>
            </ContainerItem>
        </Container>
    )
}

const Container = styled.ul`
    margin-left: 25px;
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const ContainerItem = styled.li`
  padding-left: 24px;
  display: flex;
  align-items: center;
  
`

const Img = styled.img`
`

const UserName = styled.div`
    white-space: nowrap;
`

// export function Accessibility() {
//     return (
//         <Container>
//             <ContainerItem>
//                 <Img src={account_circle_black_24} alt="account icon" />
//                 <UserName>Hi, ziru!</UserName>
//                 {/*<Img src={expand_more_black_24} alt="dropdown icon"/>*/}
//             </ContainerItem>
//             <ContainerItem>
//                 <Img src={shopping_cart_black} alt="cart icon"/>
//             </ContainerItem>
//         </Container>
//     )
// }
//
// const Container = styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
// `
//
// const ContainerItem = styled.div`
//     margin-right: 12px;
//     display: flex;
// `
//
// const Img = styled.img`
//   transition: all .2s ease-in-out;
//   width: 32px;
//   &:hover {
//     transform: scale(1.2);
//   }
// `
//
// const UserName = styled.div`
//   margin: auto 10px;
//   white-space: nowrap;
// `