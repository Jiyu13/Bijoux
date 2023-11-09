import axios from "axios";

export const API_URL = "http://127.0.0.1:8000"


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true

export const client = axios.create({
    baseURL: `${API_URL}/`,
    xsrfHeaderName: "X-CSRFToken",
    xsrfCookieName: "csrftoken",
    withCredentials: true,  // Important! This sends cookies with requests.

})

function getCSRFToken() {
    // split all cookies into an array of key-value pairs
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim())

    // loop through the cookies and find the one with the name 'csrftoken'
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=")
        if (name === "csrftoken") {
            return decodeURIComponent(value)
        }
    }
    // If the "csrftoken" cookie is not found, return null or handle it as needed
    return null
}
client.interceptors.request.use((config) => {
    // Get the CSRF token from the cookie
    const csrfToken = getCSRFToken();

    // Add the CSRF token to the request headers
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }

    return config;
})

export function fetchFromAPI(endpoint, setter) {

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