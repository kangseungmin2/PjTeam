import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import utility from "../../../api/utility";

function name(t) {
    if (t === "a") {
        return "지로/생활요금/기타";
    }
    else if (t === "b") {
        return "지방세/등록금";
    }
    else if (t === "c") {
        return "국고/관세";
    }
    else {
        return "연금/보험료";
    }
}

function color(t) {
    if (t === "a") {
        return "red";
    }
    else if (t === "b") {
        return "orange";
    }
    else if (t === "c") {
        return "green";
    }
    else {
        return "blue";
    }
}

class memAccount extends Component{
    constructor(props) {
        super(props);

        this.state = {
            chartData2 : [['type', 'cnt', { role: 'style' }]],
            data2 : [['type', 'cnt']],
            loading: true // 데이터 로딩 상태 추가
        }
    }

    componentDidMount(){
        this.openAccountData2();
    }

    openAccountData2 = () => {
        utility.openAccountData2()
        .then(res => {
            console.log('AccountData2() res!!', res);
           // 데이터를 Google Charts 형식으로 변환
           const chartData2 = res.data.map(item => [name(item.utilityType), item.utAmount, color(item.utilityType)]);

           this.setState({
                chartData2: [['type', 'cnt', { role: 'style' }], ...chartData2],
                loading: false // 로딩 상태 해제
           })
        })   
        .catch(err => {
            console.log('openAccountData() Error!!', err);
        })
    }

    // openAccountData = () => {
    //     Account.openAccountData()
    //     .then(res => {
    //         console.log('AccountData() res!!', res);
    //        // 데이터를 Google Charts 형식으로 변환

    //        const chartData = res.data.map(item => [name(item.accountType), item.accountLimit]);
    //        this.setState({
    //             chartData: [['type', 'cnt'], ...chartData],

    //             loading: false // 로딩 상태 해제
    //        })
    //     })   
    //     .catch(err => {
    //         console.log('openAccountData() Error!!', err);
    //     })
    // }

    render() {
        // const data = [
        //     ['Day', 'data1', { role: 'style' }],
        //     ['지로/생활요금/기타', 70, 'red'],
        //     ['지방세/등록금', 31, 'orange'],
        //     ['국고/관세', 50, 'green'],
        //     ['연금/보험료납부', 77, 'blue'],
        //     // ['월 이체금', 68]
        //     ];
            const data2 = [
                ['Day', 'data1', { role: 'style' }],
                ['입출금', 268, 'red'],
                ['예금 이체', 100, 'orange'],
                ['적금 이체', 300, 'green'],
                ['대출 이체', 220, 'blue'],
                ['펀드 이체', 330, 'purple']
            ];
    
        const options = {
            legend: 'none',
            hAxis: { title: '공과금 종류' },
            vAxis: { title: '' },
            title: '* 월 공과금 이체량', // 작은 타이틀 추가
            orientation: 'horizontal',
            };
        const options2 = {
            legend: 'none',
            hAxis: { title: '계좌 종류' },
            vAxis: { title: '' },
            title: '* 월 계좌별 이체량', // 작은 타이틀 추가
            orientation: 'horizontal',
            };

        return (
            <div>
                <Typography variant="h4">고객 결산</Typography>
                <Table style={mainTable}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Chart
                                    width={'600px'}
                                    height={'400px'}
                                    chartType="BarChart"
                                    loader={<div>Loading Chart</div>}
                                    data={this.state.chartData2}
                                    options={options}
                                />
                            </TableCell>
                            <TableCell>
                                <Chart
                                    width={'600px'}
                                    height={'400px'}
                                    chartType="BarChart"
                                    loader={<div>Loading Chart</div>}
                                    data={data2}
                                    options={options2}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </div>
            );
        }
    }
    const mainTable ={
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    };
    
    const tableStyle = {
        width: '100%',
        textAlign: 'center', // 테이블 안의 콘텐츠를 가운데 정렬
    };
export default memAccount;