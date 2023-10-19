import React,{Component} from "react";
import { Chart } from 'react-google-charts';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import ApiService from "../../ApiService";


export default class myFund extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myFund : [],
            chartData : [['fpName', 'cnt']],
            loading: true // 데이터 로딩 상태 추가
        }
    }

    componentDidMount(){
        this.myFundData();
    }

    myFundData = () => {
        const fdAccount = window.localStorage.getItem('faccount')
        ApiService.myFundData(fdAccount)
        .then(res => {
            console.log('myFundData() res!!', res);
           // 데이터를 Google Charts 형식으로 변환
           const chartData = res.data.map(item => [item.fpName, item.trCnt]);

           this.setState({
                myFund : res.data,
                chartData: [['fpName', 'cnt'], ...chartData],
                loading: false // 로딩 상태 해제
           })
        })   
        .catch(err => {
            console.log('myFundData() Error!!', err);
        })
    }
  
    render() {
        
     
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
                                <TableHead style={{ backgroundColor: 'rgb(230, 229, 227)'}}>
                                    <TableRow>
                                        <TableCell>
                                            거래번호
                                        </TableCell>
                                        <TableCell>
                                            종목명
                                        </TableCell>
                                        <TableCell>
                                            거래금액
                                        </TableCell>
                                        <TableCell>
                                            거래량
                                        </TableCell>
                                        <TableCell>
                                            거래일시
                                        </TableCell>
                                        <TableCell>
                                            수익률
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {this.state.myFund.map(list => (
                                <TableBody key={list.fdAccount}>
                                    <TableRow>
                                        <TableCell>
                                            {list.trNum}
                                        </TableCell>
                                        <TableCell>
                                            {list.fpName}
                                        </TableCell>
                                        <TableCell>
                                            {list.trPrice}
                                        </TableCell>
                                        <TableCell>
                                            {list.trCnt}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(list.trDate).toLocaleDateString(
                                                'en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            {list.trNum}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                ))}
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
const mainTable ={
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
};

const tableStyle = {
    width: '100%',
    textAlign: 'center', // 테이블 안의 콘텐츠를 가운데 정렬
};