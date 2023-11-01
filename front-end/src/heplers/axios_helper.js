import axios from 'axios'; // npm install axios 부터


axios.defaults.baseURL = 'http://15.165.6.111:8083';

axios.defaults.headers.post['Content-Type'] = 'application/json';

// 로그인 완료시 JWT 저장
// getAuthToken
export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}
// setAuthToken
export const setAuthToken = (token ,id) => {
    window.localStorage.setItem("auth_token", token);
    window.localStorage.setItem("id", id);
}
export const data = (id) =>{
    window.localStorage.setItem("admin",id);
}

export const request = (method, url, data) => {

    // let headers = {};
    // if(getAuthToken() != null && getAuthToken != "null") {
    //     headers = {"Authorization": 'Bearer ${getAuthToken()}'}; // 토큰 요청 헤더 => Authorization : <type> <credentials> 
    //     console.log('headers: ', headers);
    // }
    console.log('axios');
    console.log('method : ', method);
    console.log('url : ', url);
    console.log('data : ', data);

    return axios({
        method: method,
        // headers: headers,
        url: url,
        data: data
    });
}
