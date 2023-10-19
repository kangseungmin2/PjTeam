import axios from 'axios'; // npm install -f axios@^1.3.5

const MEMBER_API_BASE_URL = "http://localhost:8083/member";

class member {
    memberInfo(id){
        console.log("memberInfo호출", id)
        return axios.get(MEMBER_API_BASE_URL+"/"+id,id);
    }
    memberEdit(inputData){
        console.log("memberEdit호출",inputData)
        return axios.put(MEMBER_API_BASE_URL,inputData);
    }
}
export default new member();