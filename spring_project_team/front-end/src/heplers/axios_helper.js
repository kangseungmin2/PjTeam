import axios from 'axios'; // npm install axios 부터
import { Component } from 'react';
import Nav from 'react-bootstrap/Nav';

axios.defaults.baseURL = 'http://localhost:8083';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 로그인 완료시 JWT 저장
// getAuthToken
export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}
// setAuthToken
export const setAuthToken = (token) => {
    window.localStorage.setItem("auth_token", token);
}
export const data = (id) =>{
    return id;
}
export function add(id){
    console.log('여기타야됨'+id)
    if(id == null){
        console.log('로그인 안된')
        return <Nav >        
            <Nav.Link href="/join" style={style}>회원가입</Nav.Link>
            <Nav.Link eventKey={2} href="/login" style={style}>
            로그인
            </Nav.Link>
        </Nav>
    }
    else if(id != null){
        console.log('로그인 됨')
        return <Nav>       
            <Nav.Link href="/join" style={style}>${id}</Nav.Link>
            <Nav.Link eventKey={2} href="/login" style={style}>
            {id}
            </Nav.Link>
        </Nav>
    } 
}

class Log extends Component{

    render(){
       
        return(
            add()
        );
    }
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
const style={
    backgroundColor:'#46B8FF',
    color:'white'
}
export default Log;