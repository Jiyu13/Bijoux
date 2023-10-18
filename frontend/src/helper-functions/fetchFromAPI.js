import axios from "axios";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true

export const client = axios.create({
    baseURL: "http://127.0.0.1:8000/"
})


// const cors = require('cors');

export const API_URL = "http://127.0.0.1:8000"
export function fetchFromAPI(endpoint, setter) {
    // async function fetchData() {
    //     // console.log(`${API_URL}${endpoint}`)
    //     try {
    //         const response = await axios.get(`${API_URL}${endpoint}`)
    //         return response
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // fetchData().then(res => {
    //     // console.log(res)
    //     setter(res.data)
    // })
    client.get(`${endpoint}`, { withCredentials: true })
        .then(res => {
            // console.log(res)
            setter(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
}

export function postFromAPI(endpoint, data, setter, errorSetter) {
    client.post(
        `${endpoint}`,
        data,
        { withCredentials: true }
    )
    .then(res => {
        // console.log(res.data)
        setter(res.data)
    })
    .catch(error => errorSetter(error.response.data))
}