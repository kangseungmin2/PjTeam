import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { Table, TableHead, TableRow, TableCell, Typography } from "@mui/material";
import Account from "../../../api/account";

function name(t) {
    if (t === "e") {
        return "입출금";
    }
    else if (t === "y") {
        return "예금";
    }
    else if (t === "j") {
        return "적금";
    }
    else if (t === "d") {
        return "대출";
    }
    else {
        return "펀드";
    }
}

class adminAccount extends Component{

    constructor(props) {
        super(props);

        this.state = {
            chartData : [['type', 'cnt']],
            loading: true // 데이터 로딩 상태 추가
        }
    }

    componentDidMount(){
        this.openAccountData();
    }

    openAccountData = () => {
        Account.openAccountData()
        .then(res => {
            console.log('AccountData() res!!', res);
           // 데이터를 Google Charts 형식으로 변환
           const chartData = res.data.map(item => [name(item.accountType), item.accountLimit]);

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
    // const data = [
    //     ['Day', '입출금', '예금', '적금', '대출', '펀드'],
    //     ['월별 판매량', 70, 30, 40, 30, 10]
    //     // ['김상아', 31, 50, 60, 80, 20],
    //     // ['유석준', 50, 10, 50, 70, 40],
    //     // ['주종훈', 77, 30, 40, 20, 80],
    //     // ['최정현', 68, 70, 50, 20, 60]
    //     ];

    const options = {
        legend: 'none',
        hAxis: { title: '계좌 종류' },
        vAxis: { title: '' },
        title: 'Data : 계좌별 총 판매량 (계좌개설)', // 작은 타이틀 추가
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