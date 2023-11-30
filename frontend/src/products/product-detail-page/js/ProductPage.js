import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchFromAPI} from "../../../helper-functions/fetchFromAPI";
import {ProductDetails} from "./ProductDetails";
import {RelatedProducts} from "../../related-products/RelatedProducts";
import {UserContext} from "../../../global/user-context/UserContext";
import {ProductImagesSection} from "./ProductImagesSection";

import styled from "styled-components";
import '../css/product_detail.css'

export function ProductPage() {

    const {isMobile} = useContext(UserContext)

    const [productDetail, setProductDetail] = useState(null)

    const id = useParams()

    useEffect(() => {
        fetchFromAPI(`/products/${id.id}/`, setProductDetail)
    }, [id])

    // console.log(productDetail)
    return (
        <DetailPageContainer className='product-detail-page'>
            {/* =================== Product details =================== */}
            <section>
                <section style={{padding: "8px 0"}}>

                    <div style={{display: "flex", flexDirection: isMobile ? "column" : "row"}}>
                        {/*=================== Product Image ===================*/}
                        <ProductImagesSection
                            coverImage={productDetail?.image}
                            otherImages={productDetail?.product_images}
                        />

                        {/*<div >*/}
                        {/*    <img src={productDetail?.image} style={{width: "100%"}}/>*/}
                        {/*</div>*/}

                        {/*=================== Detail and order ================*/}
                        <ProductDetails productDetail={productDetail}/>
                    </div>
                </section>
            </section>

            {/* =================== Related Products ===================*/}
            <RelatedProducts productDetail={productDetail}/>

        </DetailPageContainer>
    )
}

const DetailPageContainer = styled.main`
  box-sizing: border-box;
  margin: 32px auto 0;
  //padding: 0 15px;
`