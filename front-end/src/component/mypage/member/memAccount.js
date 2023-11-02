import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { Table, TableHead, TableRow, TableCell, Typography } from "@mui/material";
import utility from "../../../api/utility";
import transfer from '../../../api/transferAuto';

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

function Unix_timestamp(t) {
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
    //console.log(date) //2023-02-28T05:36:35.000Z 출력됨
    const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}

class memAccount extends Component{
    constructor(props) {
        super(props);

        this.state = {
            chartData2 : [['type', 'cnt', { role: 'style' }]],
            chartData : [['type', 'cnt']],
            loading: true // 데이터 로딩 상태 추가
        }
    }

    componentDidMount(){
        this.openAccountData2();
        this.openAccountData();
    }

    //공과금 납부내역
    openAccountData2 = () => {
        utility.openAccountData2()
        .then(res => {
            console.log('AccountData2() res!!', res);
           // 데이터를 Google Charts 형식으로 변환
           const chartData2 = res.data.map(item => [name(item.utilityType), item.utAmount, color(item.utilityType)])
           this.setState({
                chartData2: [['type', 'cnt', { role: 'style' }], ...chartData2],
                loading: false // 로딩 상태 해제
           })
        })   
        .catch(err => {
            console.log('openAccountData() Error!!', err);
        })
    }

    //이체 내역
    openAccountData = () => {
        transfer.transferList()
        .then(res => {
            console.log('AccountData() res!!', res);
           // 데이터를 Google Charts 형식으로 변환
           const chartData = res.data.map(item => [Unix_timestamp(item.trDate), item.trAmount]);
           this.setState({
                chartData: [['type', 'cnt'], ...chartData],
                loading: false // 로딩 상태 해제
           })
        })   
        .catch(err => {
            console.log('openAccountData() Error!!', err);
        })
    }

    render() {
        const options = {
            legend: 'none',
            hAxis: { title: '공과금 종류' },
            vAxis: { title: '' },
            title: '* 월 공과금 납부', // 작은 타이틀 추가
            orientation: 'horizontal',
            };
        const options2 = {
            legend: 'none',
            hAxis: { title: '이체일' },
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
                                    data={this.state.chartData}
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
    
export default memAccount;