import axios from 'axios'; // npm install -f axios@^1.3.5

// - ApiService 스프링부트 서버(보통 'http://localhost:8080/'으로 열린다.)와 연결해주는 역할을 한다.
// - 리엑트에서 무언가 요청을 하면 스프링부트에서 받아 오라클에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴이라고 할 수 있다.
// - 리엑트에서 이를 구현하기 위해서 렉소르를 사용한다. 기존 HTML이나 JSP에서 사용한 AJAX 역할을 한다고 보면 된다.
// - npm install -f axios@^1.3.5


const LOANSIGN_API_MEMBER = "http://localhost:8083/loanSign";

class LoanSignApi {

    // Sign테이블에 insert
    addLoanSign(inputData){
        console.log('addLoanSign 호출!!', inputData);
        return axios.post(LOANSIGN_API_MEMBER, inputData);
    }

    // 대출상품 상세페이지 select
    fetchDetailByNum(LoanNum){
        console.log('fetchDetailByNum 호출!!', LoanNum);
        return axios.get(LOANSIGN_API_MEMBER + "/"+LoanNum);
    }
    
    // 본인인증확인
    checkIdentity(id){
        console.log('checkIdentity 호출!!', id);
        return axios.get(LOANSIGN_API_MEMBER + "/checkIdentity/"+id, id);
    }

    // 계좌 리스트 조회
    fetchAllAccounts(id){
        console.log('fetchAllAccounts 호출!!',id);
        return axios.get(LOANSIGN_API_MEMBER+"/e/"+id,id);
    }

    // 계좌랑 비밀번호 체크
    pwCheck(inputData){
        console.log('pwCheck 호출!!', inputData);
        return axios.get(LOANSIGN_API_MEMBER+"/f/"+inputData.accountNum+"/"+inputData.id)
    }

    // 대출 승인 리스트
    // list
    fetchSignConfirms(id){
        console.log('fetchSignConfirms() 호출',id);
        return axios.get(LOANSIGN_API_MEMBER+"/loanSignList/"+id,id);
    }

    // 대출계산 리스트
    calRepaymentList(loanNum){
        console.log('calRepaymentList() 호출',loanNum);
        return axios.get(LOANSIGN_API_MEMBER+"/loanCal/"+loanNum,loanNum);
    }

    // 이자조회 리스트
    // list(LoanSignDTO)
    fetchSigns(id){
        console.log('fetchSigns() 호출');
        return axios.get(LOANSIGN_API_MEMBER+"/loanList/"+id,id);
    }
    // CalRepaymentDTO
    fetchRepayments(id){
        console.log('fetchRepayments() 호출',id);
        return axios.get(LOANSIGN_API_MEMBER+"/repayment/"+id,id);
    }

    // 납입하기-signList
    fetchSignList(input){
        console.log('fetchSignList() 호출',input);
        return axios.get(LOANSIGN_API_MEMBER+"/paySignList/"+input.id+"/"+input.loanNum,input);
    }
    // 납입하기-repaymentList
    fetchRepaymentList(input){
        console.log('fetchRepaymentList() 호출',input);
        return axios.get(LOANSIGN_API_MEMBER+"/payRepaymentList/"+input.id+"/"+input.loanNum,input);
    }
    // 이자 납입(대출통장 update)
    payment(input){
        console.log('payment() 호출', input)
        return axios.put(LOANSIGN_API_MEMBER+"/payment",input);
    }

    // 대출 중도상환
    endPayment(input){
        console.log('payment() 호출', input)
        return axios.put(LOANSIGN_API_MEMBER+"/endPayment",input);
    }
}

export default new LoanSignApi();