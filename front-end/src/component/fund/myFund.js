import React,{Component} from "react";
import { Chart } from 'react-google-charts';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";


export default class myFund extends Component {
    render() {


        const chartData = [
          ['fundName', 'fundCnt'],
          ['ACE 200', 11],
          ['ARIRANG 200', 2], 
          ['FOCUS KRX300', 2],
          ['HANARO 고배당', 2],
          ['KBSTAR 200', 7]
        ];
     
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
                                            종목코드
                                        </TableCell>
                                        <TableCell>
                                            거래금액
                                        </TableCell>
                                        <TableCell>
                                            거래량
                                        </TableCell>
                                        <TableCell>
                                            수익률
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            200054
                                        </TableCell>
                                        <TableCell>
                                            ACE 200
                                        </TableCell>
                                        <TableCell>
                                            105190
                                        </TableCell>
                                        <TableCell>
                                            500,000원
                                        </TableCell>
                                        <TableCell>
                                            5
                                        </TableCell>
                                        <TableCell>
                                            0.8%
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                    </TableCell>
                    <TableCell style={{ width: '600px', height: '500px' }}>
                    <Chart
                        chartType="PieChart"
                        data={chartData}
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