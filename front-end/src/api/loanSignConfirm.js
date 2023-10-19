import axios from 'axios'; // npm install -f axios@^1.3.5

// - ApiService 스프링부트 서버(보통 'http://localhost:8080/'으로 열린다.)와 연결해주는 역할을 한다.
// - 리엑트에서 무언가 요청을 하면 스프링부트에서 받아 오라클에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴이라고 할 수 있다.
// - 리엑트에서 이를 구현하기 위해서 렉소르를 사용한다. 기존 HTML이나 JSP에서 사용한 AJAX 역할을 한다고 보면 된다.
// - npm install -f axios@^1.3.5


const LOANSIGN_API_ADMIN = "http://localhost:8083/loanSignConfirm";


class LoanSignConfrimApi {

    // LoanSignConfirm(관리자)
    // list
    fetchSignConfirms(){
        console.log('fetchSignConfirms() 호출');
        return axios.get(LOANSIGN_API_ADMIN); // 스프링부트와 통신
    }
    // 1건 select
    fetchDetailByNum(LoanNum){
        console.log('fetchDetailByNum 호출!!', LoanNum);
        return axios.get(LOANSIGN_API_ADMIN + "/"+LoanNum, LoanNum);
    }


    // success 일떄
    editSignSuccess(inputData) {
        console.log('editSignSuccess() 호출',inputData);
        return axios.put(LOANSIGN_API_ADMIN+"/s/"+inputData.loanNum,inputData);
    }

    // fail 일떄
    editSignFail(inputData) {
        console.log('editSignFail() 호출',inputData);
        return axios.put(LOANSIGN_API_ADMIN+"/f/"+inputData.loanNum,inputData);
    }

    // // delete
    // deleteLoan(LoanNum){
    //     console.log('deleteLoan 호출!!', LoanNum);
    //     return axios.delete(LOANPRODUCT_API_ADMIN + "/"+ LoanNum);
    // }

    // // Loan(고객)
    // // list
    // fetchLoansPL(){
    //     console.log('fetchLoansPL() 호출');
    //     return axios.get(LOANLIST_API_MEMBER); // 스프링부트와 통신
    // }

    // // 1건 select
    // fetchDetailByNum(LoanNum){
    //     console.log('fetchDetailByNum 호출!!', LoanNum);
    //     return axios.get(LOANLIST_API_MEMBER + "/"+LoanNum, LoanNum);
    // }


}

export default new LoanSignConfrimApi();