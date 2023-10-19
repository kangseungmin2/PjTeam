import axios from 'axios'; // npm install -f axios@^1.3.5

const ACCOUNT_API_BASE_URL = "http://localhost:8083/allAccount";

class account {

    // ---[ 서윤 계좌 ]
    // 계좌생성
    accountOpen(inputData){
        console.log('accountOpen 호출!!', inputData);
        return axios.post(ACCOUNT_API_BASE_URL, inputData);
    }

    // 찐 전체 계좌조회
    account(id){
        console.log('accountList 호출~');
        return axios.get(ACCOUNT_API_BASE_URL+"/"+id,id);
    }    

    // 입출금 계좌조회
    accountList(id){
        console.log('accountList 호출~');
        return axios.get(ACCOUNT_API_BASE_URL+"/e/"+id,id);
    }

    // 예적금 계좌조회
    accountList2(id){
        console.log('accountList 호출~');
        return axios.get(ACCOUNT_API_BASE_URL+"/y/"+id,id);
    }

    // 1건 select
    fetchAccountByNum(accountNum){
        console.log('fetchSampleByNum() 호출!', accountNum);
        return axios.get(ACCOUNT_API_BASE_URL + "/" + accountNum,accountNum);
    }

    // 계좌 비밀번호 변경
    passwordModify(inputdata){
        console.log('passwordModify() 호출',inputdata);
        return axios.put(ACCOUNT_API_BASE_URL + "/" + inputdata.accountNum, inputdata);
    
    }

    // 계좌 해지
    deleteAccount(accountNum){
        console.log('deleteAccount() 호출', accountNum);
        return axios.put(ACCOUNT_API_BASE_URL + "/deleteAccount/" + accountNum, accountNum);
    }


}
export default new account();