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
    fetchSavingsByNum(juckNo){
        console.log('fetchSavingsByNum 호출!!', juckNo);
        return axios.get(SAVINGSPRODUCT_API_ADMIN + "/"+juckNo, juckNo);
    }
    // update
    editSavings(inputData){
        console.log('editSavings 호출!!', inputData);
        return axios.put(SAVINGSPRODUCT_API_ADMIN + "/"+ inputData.juckNo, inputData);
    }
    // delete
    deleteSavings(juckNo){
        console.log('deleteSavings 호출!!', juckNo);
        return axios.delete(SAVINGSPRODUCT_API_ADMIN + "/"+ juckNo);
    }

     // ====================savings(고객)==========================
    // list
    fetchsavingssPL(){
        console.log('fetchsavingssPL() 호출');
        return axios.get(SAVINGSLIST_API_CUSTOMER); // 스프링부트와 통신
    }

    // 1건 select
    fetchsavingsDetailByNum(juckNo){
        console.log('fetchsavingsDetailByNum 호출!!', juckNo);
        return axios.get(SAVINGSLIST_API_CUSTOMER + "/"+juckNo, juckNo);
    }
}

export default new savings();