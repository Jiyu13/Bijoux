// import {PasswordRestrictions} from "../account/PasswordRestrictions";
// import {Field, Input, Label} from "../account/CreateAccount";
// import {LogoutText} from "../account/AccountPage";
// import {useContext} from "react";
// import {UserContext} from "../global/user-context/UserContext";
//
// export function ContactPage() {
//
//     const {isMobile} = useContext(UserContext)
//
//     return (
//         <div style={{margin: isMobile ? "0 16px" : ""}}>
//             <div style={{
//                 // display: "flex",
//                 // justifyContent: "space-between",
//                 padding: "100px 0 35px",
//                 // borderBottom: "1px solid #dddddd"
//             }}>
//                 <h1>Contact Us</h1>
//             </div>
//
//             <UserInfo
//                 style={{
//                     flexDirection: isMobile ? "column" : "row",
//
//                 }}
//             >
//                 <div style={{marginRight: isMobile ? "" :  "72px"}}>
//                     <h3>Account Details</h3>
//                     <InfoField>{userFullName}</InfoField>
//                     <InfoField>{userEmail}</InfoField>
//                     <InfoField style={{marginTop: "36px"}}>
//                         <ViewAddressLink href="/account/addresses">
//                             View Addresses
//                             {/*({addresses?.length})*/}
//                         </ViewAddressLink>
//                     </InfoField>
//                 </div>
//                 <div>
//                     <h3>
//                         Orders
//                     </h3>
//                     <div>You haven't placed any orders yet.</div>
//                 </div>
//             </UserInfo>
//         </div>
//     )
// }