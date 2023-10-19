import axios from 'axios'; // npm install -f axios@^1.3.5

// - ApiService 스프링부트 서버(보통 'http://localhost:8080/'으로 열린다.)와 연결해주는 역할을 한다.
// - 리엑트에서 무언가 요청을 하면 스프링부트에서 받아 오라클에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴이라고 할 수 있다.
// - 리엑트에서 이를 구현하기 위해서 렉소르를 사용한다. 기존 HTML이나 JSP에서 사용한 AJAX 역할을 한다고 보면 된다.
// - npm install -f axios@^1.3.5

const BOARD_API_ADMIN = "http://localhost:8083/boardList";

class BoardApi {

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
        return axios.get(BOARD_API_ADMIN + "/"+BoardNum);
    }
    // update
    editBoard(inputData){
        console.log('editBoard 호출!!', inputData);
        return axios.put(BOARD_API_ADMIN + "/"+ inputData.num, inputData);
    }
    // delete
    deleteBoard(BoardNum){
        console.log('deleteBoard 호출!!', BoardNum);
        return axios.delete(BOARD_API_ADMIN + "/"+ BoardNum);
    }

}

export default new BoardApi();