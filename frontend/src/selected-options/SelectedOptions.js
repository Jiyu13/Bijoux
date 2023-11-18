// import styled from "styled-components";
//
// export function SelectedOptions({selectedFilters, handleCheckboxChange}) {
//
//     return (
//         <SelectedOptionsContainer>
//             {selectedFilters?.map(option => {
//                 return (
//                     <OptionButton
//                         key={option}
//                         value={option}
//                         onClick={handleCheckboxChange}
//                     >
//
//                         <div
//                             style={{
//                                 padding: "2px 12px",
//                                 fontSize: "0.9rem",
//                                 whiteSpace: "nowrap"
//                             }}
//                         >
//                             {option}
//                         </div>
//                         <div style={{padding: "2px 12px"}}>x</div>
//                     </OptionButton>
//                 )}
//             )}
//         </SelectedOptionsContainer>
//
//     )
// }
//
// const SelectedOptionsContainer = styled.div`
//     display: flex;
//     flex-wrap: wrap;
// `
//
// const OptionButton = styled.button`
//     display: flex;
//     justify-content: center;
//     //align-content: center;
//     margin: 12px 8px 12px 0;
//     border: solid 1px;
//     border-radius: 20px;
//     cursor: pointer;
//     background: none;
//     &:hover {
//       box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
//     }
//
// `