import axios from "axios";


export const API_URL = "http://127.0.0.1:8000"
export function fetchFromAPI(endpoint, setter) {
    async function fetchData() {
        console.log(`${API_URL}${endpoint}`)
        try {
            const response = await axios.get(`${API_URL}${endpoint}`)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    fetchData().then(res => setter(res.data))
}

// async function fetchData() {
//     try {
//         const response = await axios.get(`${API_URL}/categories/`)
//         return response
//     } catch (error) {
//         console.log(error)
//     }
// }
// fetchData().then(res => setCategories(res.data))


// async function fetchData() {
//     try {
//         const response = await axios.get(`${API_URL}/carousels/`)
//         return response
//     } catch(error) {
//         console.log(error)
//     }
// }
// fetchData().then(res => setCarousels(res.data))