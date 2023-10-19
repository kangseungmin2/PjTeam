import axios from 'axios'; // npm install -f axios@^1.3.5

const question_API_BASE_URL = "http://localhost:8083/question";

class question {
    // ---[ 서윤 1:1문의 ]
    // 1:1 문의 insert
    insertQuestion(inputdata){
        console.log('insertQuestion 호출!',inputdata);
        return axios.post(question_API_BASE_URL,inputdata);
    }

    //id별 1:1문의  select
    listQuestion(id){
        console.log("listQuestion 호출",id);
        return axios.get(question_API_BASE_URL+"/"+id,id);
    }


    //관리자) 1:1문의 list
    listAnswer(){
        console.log("listAnswer 호출");
        return axios.get(question_API_BASE_URL);
    }

    // 관리자 문의 상세페이지
    fetchAnswer(num){
        console.log("fetchAnswer 호출!",num);
        return axios.get(question_API_BASE_URL+"/y/"+num,num);
    }

    insertAnswer(inputdata){
        console.log('insertAnswer 호출!',inputdata);
        return axios.post(question_API_BASE_URL+"/in",inputdata); 
    }

    //답글 확인 
    commentConfirm(questionNum) {
        console.log('commentConfirm 호출!',questionNum);
        return axios.get(question_API_BASE_URL+'/ok/'+questionNum,questionNum);
    }

}

export default new question();