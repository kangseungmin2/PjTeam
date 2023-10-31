import axios from 'axios'; // npm install -f axios@^1.3.5
const DEPOSITLIST_API_CUSTOMER = "http://15.165.6.111:8083/depositList";
const DEPOSITPRODUCT_API_ADMIN = "http://15.165.6.111:8083/depositProductList";


class deposit {
// ========================DepositProduct(관리자)
    // list
    fetchdeposits(){
        console.log('fetchdeposits() 호출');
        return axios.get(DEPOSITPRODUCT_API_ADMIN); // 스프링부트와 통신
    }

    // insert
    addDeposit(inputData){
        console.log('addDeposit 호출!!', inputData);
        return axios.post(DEPOSITPRODUCT_API_ADMIN, inputData);
    }
    // 1건 select
    fetchDepositByNum(yeNo){
        console.log('fetchDepositByNum 호출!!', yeNo);
        return axios.get(DEPOSITPRODUCT_API_ADMIN + "/"+yeNo, yeNo);
    }
    // update
    editDeposit(inputData){
        console.log('editDeposit 호출!!  이거 타라', inputData);
        return axios.put(DEPOSITPRODUCT_API_ADMIN + "/"+ inputData.yeNo, inputData);
    }
    // delete
    deleteDeposit(yeNo){
        console.log('deleteDeposit 호출!!', yeNo);
        return axios.delete(DEPOSITPRODUCT_API_ADMIN + "/"+ yeNo);
    }

    // ====================deposit(고객)=====================
    // list
    fetchdepositsPL(){
        console.log('fetchdepositsPL() 호출');
        return axios.get(DEPOSITLIST_API_CUSTOMER); // 스프링부트와 통신
    }

    // 1건 select
    fetchdepositDetailByNum(yeNo){
        console.log('fetchfetchdepositsPLDetailByNum 호출!!', yeNo);
        return axios.get(DEPOSITLIST_API_CUSTOMER + "/"+yeNo, yeNo);
    }
}

export default new deposit();    