import React, { Component } from "react";
import { Chart } from 'react-google-charts';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, TableFooter, TablePagination } from "@mui/material";
import ApiService from "../../ApiService";


export default class myFund extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myFund: [],
            chartData: [['fpName', 'cnt']],
            page: 0,
            rPage: 10
        }
    }

    componentDidMount() {
        this.myFundData();
    }

    myFundData = () => {
        const fdAccount = window.localStorage.getItem('faccount')
        ApiService.myFundData(fdAccount)
            .then((res) => {
                console.log('myFundData() res!!', res.data);
                if (res.data.length === 0) {
                    alert("계좌에 거래내역이 존재하지 않습니다.");
                    this.props.history.push("/main")
                }
                else {
                    // 데이터를 Google Charts 형식으로 변환
                    const chartData = res.data.map(item => [item.fpName, item.trCnt]);

                    this.setState({
                        myFund: res.data,
                        chartData: [['fpName', 'cnt'], ...chartData],
                    })
                }
            })
            .catch((err) => {
                console.log('myFundData() Error!!', err);
            })
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

        const chartOptions = {
            title: 'My Fund',
            is3D: true,
        };
        return (
            <div>
                <Typography variant="h4">My Fund</Typography>
                <Table style={mainTable}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h5">My Fund</Typography>
                                <Table style={tableStyle}>
                                    <TableHead style={{ backgroundColor: 'rgb(230, 229, 227)' }}>
                                        <TableRow>
                                            <TableCell>
                                                거래번호
                                            </TableCell>
                                            <TableCell>
                                                종목명
                                            </TableCell>
                                            <TableCell>
                                                거래시가
                                            </TableCell>
                                            <TableCell>
                                                거래량
                                            </TableCell>
                                            <TableCell>
                                                거래일시
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {this.state.myFund.slice(page * rPage, page *
                                        rPage + rPage).map((list, index) => (
                                            <TableBody key={list.fdAccount}>
                                                <TableRow>
                                                    <TableCell>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {list.fpName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {list.trMarketPrice}
                                                    </TableCell>
                                                    <TableCell>
                                                        {list.trCnt}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(list.trDate).toLocaleDateString(
                                                            'ko-KR', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit'
                                                        })}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        ))}

                                    <TableFooter>
                                        <TableCell colSpan={8}>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 15, 30]}
                                                component="div"
                                                count={this.state.myFund.length}
                                                rowsPerPage={rPage}
                                                page={page}
                                                onPageChange={this.handleChangePage}
                                                onRowsPerPageChange={this.handleChangeRowsPerPage}
                                            />
                                        </TableCell>
                                    </TableFooter>
                                </Table>
                            </TableCell>
                            <TableCell style={{ width: '600px', height: '500px' }}>
                                <Chart
                                    chartType="PieChart"
                                    data={this.state.chartData}
                                    options={chartOptions}
                                    graph_id="PieChart"
                                    width={'100%'}
                                    height={'400px'}
                                    legend_toggle
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>


            </div>
        );
    }
}
const mainTable = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const tableStyle = {
    width: '100%',
    textAlign: 'center', // 테이블 안의 콘텐츠를 가운데 정렬
};