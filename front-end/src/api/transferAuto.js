import axios from 'axios'; // npm install -f axios@^1.3.5


const TRANSFERLIST_API_CUSTOMER = "http://15.165.6.111:8083/trans"; // 이체 transfer
const AUTOLIST_API_CUSTOMER = "http://15.165.6.111:8083/auto";      // 자동이체 auto

class transferAuto {

    // ------------- [ 1건이체/ 다건이체 transfer ] -------------
    // list
    transferList() {
        console.log("transferList호출");
        return axios.get(TRANSFERLIST_API_CUSTOMER);
    }

    // transferDetail
    transferDetail(TranNum) {
        console.log("transferDetail호출",TranNum);
        return axios.get(TRANSFERLIST_API_CUSTOMER +"/transDetail/"+ TranNum);
    }

     // transAccount => 이체 전 계좌열람 
     transAccount(id) {
        console.log("transAccount");
        return axios.get(TRANSFERLIST_API_CUSTOMER+"/transAccount/"+ id);
    }

    // oneTransfer
    oneTransfer(TranNum) {
        console.log("oneTransfer호출",TranNum);
        return axios.post(TRANSFERLIST_API_CUSTOMER+"/oneTransfer", TranNum);
    }

    // ------------- [ 한도 limit ] -------------
    //  limitAccount 한도 변경 요청 전 계좌 선택
    limitAccount(id) {
        console.log("limitAccount");
        return axios.get(TRANSFERLIST_API_CUSTOMER+ "/limitAccount/"+ id);
    }
    
    // changeLimit 한도 변경 요청화면
    changeLimit(accountNum) {
        console.log("changeLimit");
        return axios.get(TRANSFERLIST_API_CUSTOMER+ "/changeLimit/"+ accountNum);
    }

    // (고객) 한도 심사요청 버튼 눌렀을 시 update 되게 백단까지 추가하기

    // limitList => 관리자 한도심사화면
    transferLimit() {
        console.log("transferLimit");
        return axios.get(TRANSFERLIST_API_CUSTOMER+ "/transferLimit/");
    }

    // ------------- [ 자동이체 auto ] -------------
    // autoList
    autoList() {
        console.log("autoList");
        return axios.get(AUTOLIST_API_CUSTOMER);
    }

     // autoDetail => 자동이체 상세페이지
     autoDetail(AutoNum) {
        console.log("autoDetail", AutoNum);
        return axios.get(AUTOLIST_API_CUSTOMER + "/autoDetail/" + AutoNum);
    }

     // autoAccount => 이체 전 계좌열람 
     autoAccount(id) {
        console.log("autoAccount");
        return axios.get(AUTOLIST_API_CUSTOMER+"/autoAccount/"+ id);
    }

    // autoWithdrawal => 자동이체
    autoWithdrawal(AutoNum) {
        console.log("autoWithdrawal",AutoNum);
        return axios.post(AUTOLIST_API_CUSTOMER+"/autoWithdrawal/", AutoNum);
    }

     // changeAuto => 변경/해지 페이지
     changeAuto(AutoNum) {
        console.log("changeAuto", AutoNum);
        return axios.get(AUTOLIST_API_CUSTOMER + "/changeAuto/" + AutoNum);
    }

    // changeAutoButton => 변경버튼
    changeAutoButton(AutoNum) {
        console.log("changeAutoButton");
        return axios.get(AUTOLIST_API_CUSTOMER + "/changeAutoButton/" +  AutoNum);
    }

    // alterAutoAccount => 자동이체 출금계좌 변경
    alterAutoAccount(AutoNum) {
        console.log("alterAutoAccount");
        return axios.get(AUTOLIST_API_CUSTOMER + "/alterAutoAccount/" +  AutoNum);
    }

    // alterAutoDate => 자동일체 출금일 변경
    alterAutoDate(AutoNum) {
        console.log("alterAutoDate");
        return axios.get(AUTOLIST_API_CUSTOMER + "/alterAutoDate/" +  AutoNum);
    }

    // cancleAuto => 해지
     cancleAuto(AutoNum) {
        console.log("cancleAuto");
        return axios.get(AUTOLIST_API_CUSTOMER, AutoNum);
    }

    

}

export default new transferAuto();