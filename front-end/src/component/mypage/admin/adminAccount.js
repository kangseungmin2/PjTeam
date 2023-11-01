import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { Table, TableHead, TableRow, TableCell, Typography } from "@mui/material";
import Account from "../../../api/account";

function Unix_timestamp(t) {
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
    //console.log(date) //2023-02-28T05:36:35.000Z 출력됨
    const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}

class adminAccount extends Component{

    constructor(props) {
        super(props);

        this.state = {
            chartData : [['date', 'cnt']],
            chartData2 : [['date', 'cnt']],
            chartData3 : [['date', 'cnt']],

            loading: true // 데이터 로딩 상태 추가
        }
    }

    componentDidMount(){
        this.openAccountData();
        this.openAccountData2();
        this.openAccountData3();
    }

    openAccountData = () => {
        Account.openAccountData()
        .then(res => {
            console.log('AccountData() res!!', res);
           // 데이터를 Google Charts 형식으로 변환
           const chartData = res.data.map(item => [Unix_timestamp(item.madeDate),  parseInt(item.accountLimit, 10)]);

           this.setState({
                chartData: [['date', 'cnt'], ...chartData],
                loading: false // 로딩 상태 해제
           })
        })   
        .catch(err => {
            console.log('openAccountData() Error!!', err);
        })
    }

    openAccountData2 = () => {
        Account.openAccountData2()
        .then(res => {
            console.log('AccountData2() res!!', res);
           // 데이터를 Google Charts 형식으로 변환
           const chartData2 = res.data.map(item => [Unix_timestamp(item.loanExecution),  parseInt(item.loanNum, 10)]);

           this.setState({
                chartData2: [['date', 'cnt'], ...chartData2],
                loading: false // 로딩 상태 해제
           })
        })   
        .catch(err => {
            console.log('openAccountData() Error!!', err);
        })
    }

    openAccountData3 = () => {
        Account.openAccountData3()
        .then(res => {
            console.log('AccountData3() res!!', res);
           // 데이터를 Google Charts 형식으로 변환
           const chartData3 = res.data.map(item => [Unix_timestamp(item.madeDate),  parseInt(item.fdAccount, 10)]);

           this.setState({
                chartData3: [['date', 'cnt'], ...chartData3],
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
        hAxis: { title: '입출금' },
        vAxis: { title: '' },
        title: 'Data : 계좌별 총 판매량 (입출금)', // 작은 타이틀 추가
        orientation: 'horizontal',
        };
    const options2 = {
        legend: 'none',
        hAxis: { title: '대출' },
        vAxis: { title: '' },
        title: 'Data : 계좌별 총 판매량 (대출)', // 작은 타이틀 추가
        orientation: 'horizontal',
        };    
    const options3 = {
        legend: 'none',
        hAxis: { title: '펀드' },
        vAxis: { title: '' },
        title: 'Data : 계좌별 총 판매량 (펀드)', // 작은 타이틀 추가
        orientation: 'horizontal',
        };        


    return (
        <div>
            <Typography variant="h4">관리자 결산</Typography>
            <Table style={mainTable}>
                <TableHead>
                    <TableRow>
                        
                        <TableCell>
                            <Chart
                                width={'600px'}
                                height={'400px'}
                                chartType="BarChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.chartData}
                                options={options}
                            />
                        </TableCell>
                        <TableCell>
                            <Chart
                                width={'600px'}
                                height={'400px'}
                                chartType="BarChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.chartData2}
                                options={options2}
                            />
                        </TableCell>
                        <TableCell>
                            <Chart
                                width={'600px'}
                                height={'400px'}
                                chartType="BarChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.chartData3}
                                options={options3}
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
    
export default adminAccount;