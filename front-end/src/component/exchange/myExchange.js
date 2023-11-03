import { Component } from "react";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import exApi from "../../api/exchange";
import { Button, Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';

function Unix_timestamp(t) {
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
    //console.log(date) //2023-02-28T05:36:35.000Z 출력됨
    const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}
class myExchange extends Component{

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            message: null,
            page: 0,
            rPage: 5
        }
    }

    componentDidMount() {
        this.myExchange();
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
    myExchange =() =>{
        let id = window.localStorage.getItem('id')

        exApi.myList(id)
            .then(res =>{
                this.setState({
                    list : res.data
                })
                console.log('myExchange',res.data)
            })
            .catch(err =>{
                console.log('err',err)
            })
    }
    render(){
        const { page } = this.state;
        const { rPage } = this.state;

        return(
            <Container component="main" maxWidth="md">
            <PaidOutlinedIcon fontSize='large' color='primary' />
            <Typography variant="h4" style={style}> 나의 환율 정보 </Typography>

            <TableContainer >

                <Table md={{ minWidth: 1000 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" width="50">No.</TableCell>
                            <TableCell align="center" width="80">회원</TableCell>
                            <TableCell align="center" width="400">출금계좌</TableCell>
                            <TableCell align="center" width="200">신청한 금액</TableCell>
                            <TableCell align="center" width="140">신청한 나라</TableCell>
                            <TableCell align="center" width="140">받을 금액</TableCell>
                            <TableCell align="center" width="80">신청 날짜</TableCell>
                            <TableCell align="center" width="120">승인</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {this.state.list.slice(page * rPage, page *
                            rPage + rPage).map((list) => (
                                <TableRow hover key={list.changeNum}>
                                    <TableCell align='center'>{list.changeNum}</TableCell>
                                    <TableCell align='center'>{list.id}</TableCell>
                                    <TableCell align='center'>{parseInt(list.accountNum).toLocaleString()} </TableCell>
                                    <TableCell align='center'>{list.tprice}</TableCell>
                                    <TableCell align='center'>{list.nation}</TableCell>
                                    <TableCell align='center'>{parseInt(list.rprice).toLocaleString()}</TableCell>
                                    <TableCell align='center'>{Unix_timestamp(list.changeDate)}</TableCell>
                                    <TableCell align='center'>{list.nonState}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={this.state.list.length}
                rowsPerPage={rPage}
                page={page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
            />

        </Container>
        );
    }
}

export default myExchange;
const style = {
    display: 'flex',
    justifyContent: 'center'
}
