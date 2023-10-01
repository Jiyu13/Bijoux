import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchFromAPI} from "../../helper-functions/fetchFromAPI";

export function ProductDetail() {

    const [productDetail, setProductDetail] = useState(null)

    const id = useParams()
    console.log(id.id)

    useEffect(() => {
        fetchFromAPI(`/products/${id.id}/`, setProductDetail)
    }, [id])

    // console.log(detail)

    return
}