import axios from 'axios'; // npm install -f axios@^1.3.5

const MEMBER_API_BASE_URL = "http://15.165.6.111:8083/member";

class member {
    memberInfo(id){
        console.log("memberInfo호출", id)
        return axios.get(MEMBER_API_BASE_URL+"/"+id,id);
    }
    memberEdit(inputData){
        console.log("memberEdit호출",inputData)
        return axios.put(MEMBER_API_BASE_URL,inputData);
    }
    memberList(){
        console.log('memberList 호출~');
        return axios.get(MEMBER_API_BASE_URL+"/management");
    }
    memberdelete(){
        console.log('memberdelete 호출~');
        return axios.delete(MEMBER_API_BASE_URL);
    }
}
export default new member();