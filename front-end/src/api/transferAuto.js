import axios from 'axios'; // npm install -f axios@^1.3.5


const TRANSFERLIST_API_CUSTOMER = "http://localhost:8083/trans";
const AUTOLIST_API_CUSTOMER = "http://localhost:8083/auto";

class transferAuto {

    // ------------- [ 1건이체/ 다건이체 transfer ] -------------
    // list
    transferList() {
        console.log("transferList호출");
        return axios.get(TRANSFERLIST_API_CUSTOMER);
    }

    // transferDetail
    transferDetail(TranNum) {
        console.log("transferDetail호출");
        return axios.get(TRANSFERLIST_API_CUSTOMER, TranNum);
    }

    // oneTransfer
    oneTransfer(TranNum) {
        console.log("oneTransfer호출",TranNum);
        return axios.post(TRANSFERLIST_API_CUSTOMER+"/oneTransfer", TranNum);
    }

    // alterAuto
    alterAuto(TranNum) {
        console.log("alterAuto호출");
        return axios.get(TRANSFERLIST_API_CUSTOMER, TranNum);
    }

    // ------------- [ 자동이체 auto ] -------------
    // autoList
    autoList(AutoNum) {
        console.log("autoList");
        return axios.get(AUTOLIST_API_CUSTOMER, AutoNum);
    }

     // changeAuto => 변경/해지 페이지
     changeAuto(AutoNum) {
        console.log("changeAuto");
        return axios.get(AUTOLIST_API_CUSTOMER, AutoNum);
    }

    // alterAuto => 변경
    alterAuto(AutoNum) {
        console.log("alterAuto");
        return axios.get(AUTOLIST_API_CUSTOMER, AutoNum);
    }

    // cancleAuto => 해지
    cancleAuto(AutoNum) {
        console.log("cancleAuto");
        return axios.get(AUTOLIST_API_CUSTOMER, AutoNum);
    }

    // TrAccountList => 이체 전 계좌열람 (trnasAccount)
    trAccountList(id) {
        console.log("trAccountList");
        return axios.get(TRANSFERLIST_API_CUSTOMER+"/trAccountList/"+ id);
    }
    

   











}

export default new transferAuto();