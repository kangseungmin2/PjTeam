import axios from 'axios'; // npm install -f axios@^1.3.5
const DEPOSITLIST_API_CUSTOMER = "http://localhost:8083/depositList";
const DEPOSITPRODUCT_API_ADMIN = "http://localhost:8083/depositProductList";


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
    fetchDepositByNum(yNo){
        console.log('fetchLoanByNum 호출!!', yNo);
        return axios.get(DEPOSITPRODUCT_API_ADMIN + "/"+yNo, yNo);
    }
    // update
    editDeposit(inputData){
        console.log('editDeposit 호출!!', inputData);
        return axios.put(DEPOSITPRODUCT_API_ADMIN + "/"+ inputData.yNo, inputData);
    }
    // delete
    deleteDeposit(yNo){
        console.log('deleteDeposit 호출!!', yNo);
        return axios.delete(DEPOSITPRODUCT_API_ADMIN + "/"+ yNo);
    }

    // ====================deposit(고객)=====================
    // list
    fetchdepositsPL(){
        console.log('fetchdepositsPL() 호출');
        return axios.get(DEPOSITLIST_API_CUSTOMER); // 스프링부트와 통신
    }

    // 1건 select
    fetchdepositDetailByNum(yNo){
        console.log('fetchfetchdepositsPLDetailByNum 호출!!', yNo);
        return axios.get(DEPOSITLIST_API_CUSTOMER + "/"+yNo, yNo);
    }
}

export default new deposit();    