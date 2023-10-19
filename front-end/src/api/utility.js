import axios from 'axios'; // npm install -f axios@^1.3.5

const UTIL_API_BASE_URL = "http://localhost:8083/utilityList";

class utility {
    // ---[ 서윤 공과금 ]
    // 공과금 리스트
    utilityList(id){
        console.log('utilityList 호출~');
        return axios.get(UTIL_API_BASE_URL+"/"+id,id);
    }   
}
export default new utility();