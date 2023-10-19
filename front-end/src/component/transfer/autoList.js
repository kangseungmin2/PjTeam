import React, { Component } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

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

class autoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            autos: [
                
            ],
            message: null,
            page: 0,
            rPage: 5
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadautosList();
    }

    // list 정보
    loadautosList = () => {
        console.log("T.T", this.state)
        API.autoList()
            .then(res => {
                this.setState({
                    autos: res.data
                })
            })
            .catch(err => {

                console.log('loadautoList() Error!!', err);
            })
        console.log(this.state.autos)
    }

    // 1건 selects
    selectAutosfer = (autoNum) => {
        window.localStorage.setItem("AutoNum", autoNum);
        this.props.history.push("/autoDetail")
    }

    // detail
    autoDetail = (autoNum) => {
        window.localStorage.setItem("AutoNum", autoNum);
        this.props.history.push("/autoDetail")
    }
    

    // page
    handleChangePage = (event,newpage) => { 
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
            <Container component="main" maxWidth="md">

                <CurrencyExchangeIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style}> 자동이체 목록 </Typography>

                <TableContainer >
                    <Table md={{ minWidth: 900 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="50">No.</TableCell>
                                <TableCell align="center" width="200">이체명</TableCell>
                                <TableCell align="center" width="150">금액</TableCell>
                                <TableCell align="center" width="100">이체일자</TableCell>
                                <TableCell align="center" width="50">상세</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.state.autos.slice(page * rPage, page * 
                            rPage + rPage).map((auto) => (
                                <TableRow hover key={auto.autoNum}>
                                    <TableCell align='center'>{auto.autoNum}</TableCell> 
                                    <TableCell align='center'>{auto.autoTitle}</TableCell>
                                    <TableCell align='center'>{auto.autoAmount}원</TableCell>
                                    <TableCell align='center'>{Unix_timestamp(auto.autoDate)}</TableCell>
                                    <TableCell align='center'>
                                        <EditNoteOutlinedIcon fontSize='large' onClick={() => this.autoDetail(auto.autoNum)}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>s

                <TablePagination 
                rowsPerPageOptions={[5, 10, 25]} 
                component="div"
                count={this.state.autos.length} 
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



export default autoList;