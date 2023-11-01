import axios from 'axios'; // npm install -f axios@^1.3.5

const UTIL_API_BASE_URL = "http://15.165.6.111:8083/utilityList";


class utility {
    // ---[ 서윤 공과금 ]
    // 공과금 리스트
    utilityList(id){
        console.log('utilityList 호출~');
        return axios.get(UTIL_API_BASE_URL+"/a/"+id,id);
    }  
    
    join(id){
        console.log('join 호출~');
        return axios.get(UTIL_API_BASE_URL+"/j/"+id,id);
    }
    // 지로 납부하기
    utilPay1(UtilTransactionDTO){
        console.log('utilPay1 호출!!', UtilTransactionDTO);
        return axios.post(UTIL_API_BASE_URL, UtilTransactionDTO);
    }
    
    utilityCheck(utilityType,utilityId){
        console.log('utilityCheck 호출~',utilityType,utilityId);
        return axios.get(UTIL_API_BASE_URL+"/chk/"+utilityType+"/"+utilityId);
    }

    //상세내역
    utilityInfo(utilityId){
        console.log('utilityInfo 호출~',utilityId);
        return axios.get(UTIL_API_BASE_URL+"/info/"+utilityId);
    }

    // //즉시이체
    utilTransfer(UtilTransactionDTO) {
        console.log('utilTransfer() 호출',UtilTransactionDTO);
        return axios.post(UTIL_API_BASE_URL+"/utilTransfer",UtilTransactionDTO);
    }

    // 관리자 결산
    openAccountData2(){
        console.log('accountList 호출~');
        return axios.get(UTIL_API_BASE_URL+"/memberAccount");
    }   

}
export default new utility();