import axios from 'axios'; // npm install -f axios@^1.3.5


const TRANSFERLIST_API_CUSTOMER = "http://15.165.6.111:8083/trans"; // 이체 transfer
const AUTOLIST_API_CUSTOMER = "http://15.165.6.111:8083/auto";      // 자동이체 auto

class transferAuto {

    // ------------- [ 1건이체 transfer ] -------------
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

    // (관리자)deleteLimit => 관리자 한도심사화면에서 열람시
    adminTransfer(){
        console.log('deleteLimit 호출!!');
        return axios.get(TRANSFERLIST_API_CUSTOMER + "/adminTransfer/");
    }

    // ------------- [ 한도 limit ] -------------
    //  limitAccount 한도 변경 요청 전 계좌 선택
    limitAccount(id) {
        console.log("limitAccount");
        return axios.get(TRANSFERLIST_API_CUSTOMER+ "/limitAccount/"+ id);
    }
    
    // changeLimit 한도 변경 요청화면
    changeLimit(limitNum) {
        console.log("changeLimit");
        return axios.post(TRANSFERLIST_API_CUSTOMER+ "/changeLimit" , limitNum);
    }

    // (관리자)transferLimit => 관리자 한도심사화면
    transferLimit() {
        console.log("transferLimit");
        return axios.get(TRANSFERLIST_API_CUSTOMER+ "/transferLimit");
    }

    // (관리자)transferLimit => 관리자 한도심사완료시
    afterLimit() {
        console.log("afterLimit");
        return axios.get(TRANSFERLIST_API_CUSTOMER+ "/afterLimit");
    }

    // (관리자)updateLimit => 관리자 한도심사화면에서 승인시
    updateLimit(limitNum, accountDTO) {
        console.log('updateLimit 호출!!');
        return axios.put(TRANSFERLIST_API_CUSTOMER + "/updateLimit/" + limitNum, accountDTO);
    }

    // (관리자)deleteLimit => 관리자 한도심사화면에서 삭제시
    deleteLimit(limitNum){
        console.log('deleteLimit 호출!!', limitNum);
        return axios.put(TRANSFERLIST_API_CUSTOMER + "/deleteLimit/"+ limitNum);
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
    autoWithdrawal(inputData) {
        console.log("autoWithdrawal", inputData);
        return axios.post(AUTOLIST_API_CUSTOMER+"/autoWithdrawal/", inputData);
    }

     // changeAuto => 해지 페이지
    changeAuto(){
        console.log('changeAuto 호출!!');
        return axios.get(AUTOLIST_API_CUSTOMER + "/changeAuto/");
    }

    // cancleAuto 자동이체 해지버튼
    cancleAuto(autoNum) {
        console.log("cancleAuto", autoNum);
        return axios.put(AUTOLIST_API_CUSTOMER+ "/cancleAuto/" +autoNum);
    }

     // adminAuto
     adminAuto() {
        console.log("adminAuto");
        return axios.get(AUTOLIST_API_CUSTOMER+ "/adminAuto/");
    }
    

}

export default new transferAuto();