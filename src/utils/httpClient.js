import axios from "axios";

// const  BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = 'http://localhost:9090/api'
console.log('base URL >>', BASE_URL);
const http =axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    timeoutErrorMessage: "Takes too long for response"
});

const getheaders = (secured) => {
    let options = {
        "Content-Type": "application/json"
    }
    if(secured){
        console.log("token is >> ", localStorage.getItem('token'));
        options['Authorization'] = localStorage.getItem("token")
    }
    return options
}

const GET = (url, isSecured = false, params={})=> {
    return http.get(url,{
        headers: getheaders(isSecured),
        params
    })
}

const POST = (url, data,  isSecured = false, params={})=> {
    return http.post(url, data, {
        headers: getheaders(isSecured),
        params
    })
}

const PUT = (url, data, isSecured = false, params={})=> {
    return http.put(url,data, {
        headers: getheaders(isSecured),
        params
    })
}

const DELETE = (url, isSecured = false, params={})=> {
    return http.delete(url,{
        headers: getheaders(isSecured),
        params
    })
}

export const httpClient = {
    GET,
    POST,
    PUT,
    DELETE
}