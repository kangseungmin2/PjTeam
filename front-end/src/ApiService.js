import axios from 'axios'; // npm install -f axios@^1.3.5

// - ApiService 스프링부트 서버(보통 'http://localhost:8080/'으로 열린다.)와 연결해주는 역할을 한다.
// - 리엑트에서 무언가 요청을 하면 스프링부트에서 받아 오라클에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴이라고 할 수 있다.
// - 리엑트에서 이를 구현하기 위해서 렉소르를 사용한다. 기존 HTML이나 JSP에서 사용한 AJAX 역할을 한다고 보면 된다.
// - npm install -f axios@^1.3.5

const SAMPLE_API_BASE_URL = "http://localhost:8083/fund";
const BOARD_API_ADMIN = "http://localhost:8083/boardList";
const LOANPRODUCT_API_ADMIN = "http://localhost:8083/loanProductList";
const LOANLIST_API_MEMBER = "http://localhost:8083/loanList";
const ACCOUNT_API_BASE_URL = "http://localhost:8083/allAccount";
const DEPOSITLIST_API_CUSTOMER = "http://localhost:8083/depositList";
const SAVINGSLIST_API_CUSTOMER = "http://localhost:8083/savingsList";
const DEPOSITPRODUCT_API_ADMIN = "http://localhost:8083/depositProductList";


const SAVINGSPRODUCT_API_ADMIN = "http://localhost:8083/savingsProductList";
class ApiService {
 
    // list
    fundList(){
        console.log('fundList() 호출');
        return axios.get(SAMPLE_API_BASE_URL); // 스프링부트와 통신
    }

    // // insert
    // addBoard(inputData){
    //     console.log('addBoard 호출!!', inputData);
    //     return axios.post(SAMPLE_API_BASE_URL, inputData);
    // }
    // // 1건 select
    // fetchSamplesByNum(BoardNum){
    //     console.log('fetchSamplesByID 호출!!', BoardNum);
    //     return axios.get(SAMPLE_API_BASE_URL + "/"+BoardNum, BoardNum);
    // }
    // // update
    // editBoard(inputData){
    //     console.log('editBoard 호출!!', inputData);
    //     return axios.put(SAMPLE_API_BASE_URL + "/"+ inputData.BoardNum, inputData);
    // }
    // // delete
    // deleteBoard(BoardNum){
    //     console.log('deleteBoard 호출!!', BoardNum);
    //     return axios.delete(SAMPLE_API_BASE_URL + "/"+ BoardNum);
    // }

    // Board(관리자)
    // list
    fetchBoards(){
        console.log('fetchBoards() 호출');
        return axios.get(BOARD_API_ADMIN); // 스프링부트와 통신
    }

    // insert
    addBoard(inputData){
        console.log('addBoard 호출!!', inputData);
        return axios.post(BOARD_API_ADMIN, inputData);
    }
    // 1건 select
    fetchBoardByNum(BoardNum){
        console.log('fetchSamplesByID 호출!!', BoardNum);
        return axios.get(BOARD_API_ADMIN + "/"+BoardNum, BoardNum);
    }
    // update
    editBoard(inputData){
        console.log('editBoard 호출!!', inputData);
        return axios.put(BOARD_API_ADMIN + "/"+ inputData.BoardNum, inputData);
    }
    // delete
    deleteBoard(BoardNum){
        console.log('deleteBoard 호출!!', BoardNum);
        return axios.delete(BOARD_API_ADMIN + "/"+ BoardNum);
    }


    //서윤 계좌생성
    accountOpen(inputData){
        console.log('accountOpen 호출!!', inputData);
        return axios.post(ACCOUNT_API_BASE_URL, inputData);
    }

    //서윤 전체계좌조회
    accountList(){
        console.log('accountList 호출~');
        return axios.get(ACCOUNT_API_BASE_URL);
    }

    //서윤 전체계좌조회
    accountList2(){
        console.log('accountList2 호출~');
        return axios.get(ACCOUNT_API_BASE_URL+"/y");
    }

    // 1건 select
    fetchAccountByNum(accountNum){
        console.log('fetchSampleByNum() 호출!', accountNum);
        return axios.get(ACCOUNT_API_BASE_URL + "/" + accountNum,accountNum);
    }

    // 비밀번호 변경
    passwordModify(inputdata){
        console.log('passwordModify() 호출',inputdata);
        return axios.put(ACCOUNT_API_BASE_URL + "/" + inputdata.accountNum, inputdata);
    
    }

    // 계좌삭제
    deleteAccount(accountNum){
        console.log('deleteAccount() 호출', accountNum);
        return axios.put(ACCOUNT_API_BASE_URL + "/deleteAccount/" + accountNum, accountNum);
    }

    // LoanProduct(관리자)
    // list
    fetchLoans(){
        console.log('fetchLoans() 호출');
        return axios.get(LOANPRODUCT_API_ADMIN); // 스프링부트와 통신
    }

    // insert
    addLoan(inputData){
        console.log('addLoan 호출!!', inputData);
        return axios.post(LOANPRODUCT_API_ADMIN, inputData);
    }
    // 1건 select
    fetchLoanByNum(LoanNum){
        console.log('fetchLoanByNum 호출!!', LoanNum);
        return axios.get(LOANPRODUCT_API_ADMIN + "/"+LoanNum, LoanNum);
    }
    // update
    editLoan(inputData){
        console.log('editLoan 호출!!', inputData);
        return axios.put(LOANPRODUCT_API_ADMIN + "/"+ inputData.LoanNum, inputData);
    }
    // delete
    deleteLoan(LoanNum){
        console.log('deleteLoan 호출!!', LoanNum);
        return axios.delete(LOANPRODUCT_API_ADMIN + "/"+ LoanNum);
    }

    // Loan(고객)
    // list
    fetchLoansPL(){
        console.log('fetchLoansPL() 호출');
        return axios.get(LOANLIST_API_MEMBER); // 스프링부트와 통신
    }

    // 1건 select
    fetchDetailByNum(LoanNum){
        console.log('fetchDetailByNum 호출!!', LoanNum);
        return axios.get(LOANLIST_API_MEMBER + "/"+LoanNum, LoanNum);
    }

    
    

    //석준형
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
    // ==============================SavingsProduct(관리자)
    // list
    fetchsavingss(){
        console.log('fetchsavingss() 호출');
        return axios.get(DEPOSITPRODUCT_API_ADMIN); // 스프링부트와 통신
    }

    // insert
    addSavings(inputData){
        console.log('addSavings 호출!!', inputData);
        return axios.post(DEPOSITPRODUCT_API_ADMIN, inputData);
    }
    // 1건 select
    fetchSavingsByNum(jNo){
        console.log('fetchSavingsByNum 호출!!', jNo);
        return axios.get(DEPOSITPRODUCT_API_ADMIN + "/"+jNo, jNo);
    }
    // update
    editSavings(inputData){
        console.log('editSavings 호출!!', inputData);
        return axios.put(DEPOSITPRODUCT_API_ADMIN + "/"+ inputData.jNo, inputData);
    }
    // delete
    deleteSavings(jNo){
        console.log('deleteSavings 호출!!', jNo);
        return axios.delete(DEPOSITPRODUCT_API_ADMIN + "/"+ jNo);
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

export default new ApiService();