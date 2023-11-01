import axios from 'axios'; // npm install -f axios@^1.3.5

const EXCHANGE_API_BASE_URL = "http://15.165.6.111:8083/exchange";

class exchange {

    exchangList(){
        console.log('exchangList 호출!!')
        return axios.get(EXCHANGE_API_BASE_URL);
    }

    exchangeInsert(inputData){
        console.log('exchangeInsert 호출!!')
        return axios.post(EXCHANGE_API_BASE_URL,inputData);
    }

    myList(id){
        console.log('exchangeInsert 호출!!',id)
        return axios.get(EXCHANGE_API_BASE_URL+"/my/"+id,id);
    }

    allList(){
        console.log('allList 호출!!')
        return axios.get(EXCHANGE_API_BASE_URL+"/all");
    }
    detailNum(changeNum){
        console.log('detailNum 호출!!',changeNum);
        return axios.get(EXCHANGE_API_BASE_URL+"/num/"+changeNum,changeNum);
    }

    exchangeSuccess(changeNum){
        console.log('exchangeSuccess 호출!!',changeNum);
        return axios.put(EXCHANGE_API_BASE_URL+"/suc/"+changeNum,changeNum);
    }

    exchangeFali(changeNum){
        console.log('exchangeFali 호출!!',changeNum);
        return axios.put(EXCHANGE_API_BASE_URL+"/fail/"+changeNum,changeNum);
    }

}
export default new exchange();