import axios from 'axios'; // npm install -f axios@^1.3.5

const SAVINGSLIST_API_CUSTOMER = "http://localhost:8083/savingsList";
const SAVINGSPRODUCT_API_ADMIN = "http://localhost:8083/savingsProductList";
class savings {
// ==============================SavingsProduct(관리자)
    // list
    fetchsavingss(){
        console.log('fetchsavingss() 호출');
        return axios.get(SAVINGSPRODUCT_API_ADMIN); // 스프링부트와 통신
    }

    // insert
    addSavings(inputData){
        console.log('addSavings 호출!!', inputData);
        return axios.post(SAVINGSPRODUCT_API_ADMIN, inputData);
    }
    // 1건 select
    fetchSavingsByNum(jNo){
        console.log('fetchSavingsByNum 호출!!', jNo);
        return axios.get(SAVINGSPRODUCT_API_ADMIN + "/"+jNo, jNo);
    }
    // update
    editSavings(inputData){
        console.log('editSavings 호출!!', inputData);
        return axios.put(SAVINGSPRODUCT_API_ADMIN + "/"+ inputData.jNo, inputData);
    }
    // delete
    deleteSavings(jNo){
        console.log('deleteSavings 호출!!', jNo);
        return axios.delete(SAVINGSPRODUCT_API_ADMIN + "/"+ jNo);
    }

     // ====================savings(고객)==========================
    // list
    fetchsavingssPL(){
        console.log('fetchsavingssPL() 호출');
        return axios.get(SAVINGSLIST_API_CUSTOMER); // 스프링부트와 통신
    }

    // 1건 select
    fetchsavingsDetailByNum(jNo){
        console.log('fetchsavingsDetailByNum 호출!!', jNo);
        return axios.get(SAVINGSLIST_API_CUSTOMER + "/"+jNo, jNo);
    }
}

export default new savings();