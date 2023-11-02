import React, { Component } from "react";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Typography, TablePagination, TableFooter } from "@mui/material";
import mypage from "../../../api/mypage";

function Unix_timestamp(t) {
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
    //console.log(date) //2023-02-28T05:36:35.000Z 출력됨
    const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
}

class questionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questionList: [],
            p : '',
            page: 0,
            rPage: 5
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.questionList();
    }

    // list 정보
    questionList = () => {
        const id = window.localStorage.getItem("id")
        mypage.listQuestion(id)
            .then(res => {
                this.setState({
                    questionList: res.data,
                    p:res.data.num
                })
                console.log('questionList-Data----', res.data);
            })
            .catch(err => {
                console.log('questionList() Error!!', err);
            })
    }

    addQuestion = () => {
        window.localStorage.removeItem("num");
        this.props.history.push("/questionAdd");
    }

    //상세페이지
    question(num) {
        window.localStorage.setItem("num", num);
        this.props.history.push("/question");
    }

    // page
    handleChangePage = (event, newpage) => {
        this.setState({ page: newpage });
    }

    // rowPage
    handleChangeRowsPerPage = (event) => {
        this.setState({ rPage: parseInt(event.target.value, 10) });
        this.setState({ page: 0 }); // 페이지를 첫 페이지로 리셋
    }

    render() {
        const { page } = this.state;
        const { rPage } = this.state;
        return (
            <div><br /><br />
                <Button variant="contained" style={btn} color="primary" onClick={this.addQuestion}> Add Board </Button>
                <form>
                    <Typography variant="h4">
                        1:1 문의
                    </Typography>
                    <Table>

                        <TableHead style={style}>
                            <TableRow>
                                <TableCell style={style2}>글번호</TableCell>
                                <TableCell style={style2}>작성자</TableCell>
                                <TableCell style={style2}>글제목</TableCell>
                                <TableCell style={style2}>작성일</TableCell>
                                <TableCell style={style2}>답변상태</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.questionList.slice(page * rPage, page *
                                rPage + rPage).map((product) => (
                                    <TableRow hover key={product.num} onClick={this.question.bind(this, product.num)}>
                                        <TableCell component="th" scope='product' style={style2}>{product.num}</TableCell>
                                        <TableCell style={style2}>{product.id}</TableCell>
                                        <TableCell style={style2}>{product.title}</TableCell>
                                        <TableCell style={style2}>{Unix_timestamp(product.regDate)}</TableCell>
                                        <TableCell style={style2}>{product.answerChk}</TableCell>

                                    </TableRow>
                                ))}
                        </TableBody>
                        <TableFooter>
                            <TableCell colSpan={7}>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={this.state.questionList.length}
                                    rowsPerPage={rPage}
                                    page={page}
                                    onPageChange={this.handleChangePage}
                                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                                />
                            </TableCell>
                        </TableFooter>

                    </Table>
                </form>
            </div>
        );
    }
}

const style = {
    justifyContent: 'center',
    alignItems: 'center'
}

const style2 = {
    width: 200,
    height: 'auto'
}

const btn = {
    display: 'flex',
    justifyContent: 'left'
}

export default questionList;