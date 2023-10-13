import axios from 'axios'; // npm install -f axios@^1.3.5

// - ApiService 스프링부트 서버(보통 'http://localhost:8080/'으로 열린다.)와 연결해주는 역할을 한다.
// - 리엑트에서 무언가 요청을 하면 스프링부트에서 받아 오라클에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴이라고 할 수 있다.
// - 리엑트에서 이를 구현하기 위해서 렉소르를 사용한다. 기존 HTML이나 JSP에서 사용한 AJAX 역할을 한다고 보면 된다.
// - npm install -f axios@^1.3.5

const SAMPLE_API_BASE_URL = "http://localhost:8083/fund";
const BOARD_API_BASE_URL = "http://localhost:8081/boardList";
const ACCOUNT_API_BASE_URL = "http://localhost:8083/openAccount";
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

    // list
    fetchBoards(){
        console.log('fetchBoards() 호출');
        return axios.get(BOARD_API_BASE_URL); // 스프링부트와 통신
    }

    // insert
    addBoard(inputData){
        console.log('addBoard 호출!!', inputData);
        return axios.post(BOARD_API_BASE_URL, inputData);
    }
    // 1건 select
    fetchSamplesByNum(BoardNum){
        console.log('fetchSamplesByID 호출!!', BoardNum);
        return axios.get(BOARD_API_BASE_URL + "/"+BoardNum, BoardNum);
    }
    // update
    editBoard(inputData){
        console.log('editBoard 호출!!', inputData);
        return axios.put(BOARD_API_BASE_URL + "/"+ inputData.BoardNum, inputData);
    }
    // delete
    deleteBoard(BoardNum){
        console.log('deleteBoard 호출!!', BoardNum);
        return axios.delete(BOARD_API_BASE_URL + "/"+ BoardNum);
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

}
export default new ApiService();