import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchFromAPI} from "../../helper-functions/fetchFromAPI";

export function ProductDetail() {

    const [detail, setDetail] = useState(null)

    const id = useParams()
    console.log(id.id)

    useEffect(() => {
        fetchFromAPI(`/products/${id.id}`, setDetail)
    }, [id])

    // console.log(detail)

    return
}