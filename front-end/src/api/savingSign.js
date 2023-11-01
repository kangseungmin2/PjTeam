import axios from 'axios'; // npm install -f axios@^1.3.5

// - ApiService 스프링부트 서버(보통 'http://localhost:8080/'으로 열린다.)와 연결해주는 역할을 한다.
// - 리엑트에서 무언가 요청을 하면 스프링부트에서 받아 오라클에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴이라고 할 수 있다.
// - 리엑트에서 이를 구현하기 위해서 렉소르를 사용한다. 기존 HTML이나 JSP에서 사용한 AJAX 역할을 한다고 보면 된다.
// - npm install -f axios@^1.3.5


const SAVINGSSIGN_API_MEMBER = "http://15.165.6.111:8083/savingsSign";



class SavingsSignApi {

    // Sign테이블에 insert
    addSavingsSign(inputData){
        console.log('addSavingsSign 호출!!', inputData);
        return axios.post(SAVINGSSIGN_API_MEMBER, inputData);
    }

    // 대출상품 상세페이지 select
    fetchDetailByNum(juckNO){
        console.log('fetchSavingsByNum 호출!!', juckNO);
        return axios.get(SAVINGSSIGN_API_MEMBER + "/"+juckNO);
    }

    // 계좌 리스트 조회
    fetchAllAccounts(id){
        console.log('fetchAllAccounts 호출!!',id);
        return axios.get(SAVINGSSIGN_API_MEMBER+"/e/"+id,id);
    }

    // 계좌랑 비밀번호 체크
    pwCheck(inputData){
        console.log('pwCheck 호출!!', inputData);
        return axios.get(SAVINGSSIGN_API_MEMBER+"/f/"+inputData.accountNum+"/"+inputData.id)
    }

    // list
    fetchSignConfirms(id){
        console.log('fetchSignConfirms() 호출',id);
        return axios.get(SAVINGSSIGN_API_MEMBER+"/savingsSignList/"+id,id);
    }
    
    // 이자조회 리스트
    // list(DepositSignDTO)
    fetchSigns(id){
        console.log('fetchSigns() 호출');
        return axios.get(SAVINGSSIGN_API_MEMBER+"/savingsList/"+id,id);
    }

    // 납입하기-signList
    fetchSignList(input){
        console.log('fetchSignList() 호출',input);
        return axios.get(SAVINGSSIGN_API_MEMBER+"/signList/"+input.juckSignNo,input);
    }
    // 해지
    payRequest(input){
        console.log('payRequest() 호출',input);
        return axios.post(SAVINGSSIGN_API_MEMBER+"/payRequest",input);
    }
    payment(input){
        console.log('payment() 호출',input);
        return axios.put(SAVINGSSIGN_API_MEMBER+"/payment",input);
    }

}

export default new SavingsSignApi();