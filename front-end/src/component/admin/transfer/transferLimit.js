import React, { Component } from 'react';
import { Button, Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import API from "../../../api/transferAuto";
import { Create, Delete } from '@mui/icons-material';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

function Unix_timestamp(t){
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
  	//console.log(date) //2023-02-28T05:36:35.000Z 출력됨
   const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth()+1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}

class transferLimit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            limits: [], // limits 상태를 배열로 변경
            page: 0,
            rPage: 5
        }
    }

    componentDidMount() {
        this.transferLimit();
    }

    transferLimit = () => {
        API.transferLimit()
            .then(res => {
                this.setState({
                    limits: res.data
                });
            })
            .catch(err => {
                console.log('transferLimit() Error!!', err);
            });
    }

    // 완료 list
    afterLimit = () => {
        //window.localStorage.removeItem("afterLimit");
        this.props.history.push("/afterLimit");
    }

    updateLimit = (limitNum) => {
        const confirmUpdate = window.confirm("정말로 승인하시겠습니까?");
    
        if (confirmUpdate) {
            // 해당 limitNum에 해당하는 데이터 가져오기
            const limitToUpdate = this.state.limits.find(limit => limit.limitNum === limitNum);
    
            // LimitDTO를 AccountDTO로 변환
            const accountDTO = {
                id: limitToUpdate.id,
                accountNum: limitToUpdate.accountNum,
                accountLimit: limitToUpdate.wantLimit,
            };
            console.log('accountDTO' , accountDTO);
    
            API.updateLimit(limitNum, accountDTO)
                .then(res => {
                    // 업데이트 성공 시 처리
                    console.log('update 성공 : ', res.data);
    
                    // 업데이트 후 데이터 다시 불러오기 (선택적)
                    this.transferLimit();
                })
                .catch(err => {
                    // 업데이트 실패 시 처리
                    console.log('updateLimit() Error!!', err);
                });
        } else {
            console.log('한도승인이 취소되었습니다.');
        }
    }
    

    // delete
    deleteLimit = (limitNum) => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

        if (confirmDelete) {
            API.deleteLimit(limitNum)
                .then(res => {
                    this.setState({
                        limits: this.state.limits.filter(limit => limit.limitNum !== limitNum)
                    });
                    console.log('delete 성공 : ', res.data);
                })
                .catch(err => {
                    console.log('deleteLimit() Error!!', err);
                });
        } else {
            console.log('삭제가 취소되었습니다.');
        }
    }

    handleChangePage = (event, newpage) => {
        this.setState({ page: newpage });
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ rPage: parseInt(event.target.value, 10) });
        this.setState({ page: 0 });
    }

    render() {
        const { page } = this.state;
        const { rPage } = this.state;

        return (
            <Container component="main" maxWidth="md">
                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> 고객한도변경 요청 </Typography>
                <br />
                <TableContainer>
                    <div>
                        <Button variant="contained" style={btn} color="primary" onClick={this.afterLimit}> 심사완료 목록 </Button>
                    </div>
                    <br />
                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="50">No.</TableCell>
                                <TableCell align="center" width="100">고객아이디</TableCell>
                                <TableCell align="center" width="120">기존한도</TableCell>
                                <TableCell align="center" width="120">희망한도</TableCell>
                                <TableCell align="center" width="100">승인</TableCell>
                                <TableCell align="center" width="100">반려</TableCell>
                                <TableCell align="center" width="100">요청날짜</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.limits.slice(page * rPage, page * rPage + rPage).map((limit) => (
                                <TableRow hover key={limit.limitNum}>
                                    <TableCell align='center'>{limit.limitNum}</TableCell>
                                    <TableCell align='center'>{limit.id}</TableCell>
                                    <TableCell align='center'>{limit.accountLimit}원</TableCell>
                                    <TableCell align='center'>{limit.wantLimit}원</TableCell>
                                    <TableCell align='center'>
                                        <button className="btn" onClick={() => this.updateLimit(limit.limitNum)}>
                                            <Create />
                                        </button>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <button className="btn" onClick={() => this.deleteLimit(limit.limitNum)}>
                                            <Delete color='error' />
                                        </button>
                                    </TableCell>
                                    <TableCell align='center'>{Unix_timestamp(limit.limitDate)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.state.limits.length}
                    rowsPerPage={rPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
            </Container>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

const btn = {
    display: 'flex',
    justifyContent: 'left'
}

export default transferLimit;
