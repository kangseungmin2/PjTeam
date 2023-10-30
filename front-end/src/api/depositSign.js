import axios from 'axios'; // npm install -f axios@^1.3.5

// - ApiService 스프링부트 서버(보통 'http://localhost:8080/'으로 열린다.)와 연결해주는 역할을 한다.
// - 리엑트에서 무언가 요청을 하면 스프링부트에서 받아 오라클에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴이라고 할 수 있다.
// - 리엑트에서 이를 구현하기 위해서 렉소르를 사용한다. 기존 HTML이나 JSP에서 사용한 AJAX 역할을 한다고 보면 된다.
// - npm install -f axios@^1.3.5


const DEPOSITSIGN_API_MEMBER = "http://localhost:8083/depositSign";



class DepositSignApi {

   

    // Sign테이블에 insert
    addDepositSign(inputData){
        console.log('addDepositSign 호출!!', inputData);
        return axios.post(DEPOSITSIGN_API_MEMBER, inputData);
    }

    // 대출상품 상세페이지 select
    fetchDetailByNum(yeNO){
        console.log('fetchDepositByNum 호출!!', yeNO);
        return axios.get(DEPOSITSIGN_API_MEMBER + "/"+yeNO);
    }

    // 계좌 리스트 조회
    fetchAllAccounts(id){
        console.log('fetchAllAccounts 호출!!',id);
        return axios.get(DEPOSITSIGN_API_MEMBER+"/e/"+id,id);
    }

    // 계좌랑 비밀번호 체크
    pwCheck(inputData){
        console.log('pwCheck 호출!!', inputData);
        return axios.get(DEPOSITSIGN_API_MEMBER+"/f/"+inputData.accountNum+"/"+inputData.id)
    }

     // list
     fetchSignConfirms(id){
        console.log('fetchSignConfirms() 호출',id);
        return axios.get(DEPOSITSIGN_API_MEMBER+"/depositSignList/"+id,id);
    }


}

export default new DepositSignApi();