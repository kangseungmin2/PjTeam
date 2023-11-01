import axios from 'axios'; // npm install -f axios@^1.3.5

const ACCOUNT_API_BASE_URL = "http://15.165.6.111:8083/allAccount";
//const ACCOUNT_API_BASE_URL = "http://localhost:8083/allAccount";
class account {

    // ---[ 서윤 계좌 ]
    // 계좌생성
    accountOpen(inputData){
        console.log('accountOpen 호출!!', inputData);
        return axios.post(ACCOUNT_API_BASE_URL, inputData);
    }

    //생성 완료된 계좌
    successAccount(id){
        console.log('successList 호출!!', );
        return axios.get(ACCOUNT_API_BASE_URL+"/su/"+id,id)
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

    // 관리자 결산
    openAccountData(){
        console.log('openAccountData 호출~');
        return axios.get(ACCOUNT_API_BASE_URL+"/adminAccount");
    }   

    // 관리자 결산 - 대출
    openAccountData2(){
        console.log('openAccountData2 호출~');
        return axios.get(ACCOUNT_API_BASE_URL+"/d/adminAccount2");
    } 

    // 관리자 결산 - 펀드
    openAccountData3(){
        console.log('openAccountData3 호출~');
        return axios.get(ACCOUNT_API_BASE_URL+"/f/adminAccount3");
    }  

    // 관리자 결산 - 예금
    openAccountData4(){
        console.log('openAccountData3 호출~');
        return axios.get(ACCOUNT_API_BASE_URL+"/y/adminAccount4");
    }  

    // 관리자 결산 - 적금
    openAccountData5(){
        console.log('openAccountData3 호출~');
        return axios.get(ACCOUNT_API_BASE_URL+"/j/adminAccount5");
    }  

}
export default new account();