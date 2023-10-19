import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";

class adminAccount extends Component{
    render() {
    const data = [
        ['Day', '입출금', '예금', '적금', '대출', '펀드'],
        ['강승민', 70, 30, 40, 30, 10],
        ['김상아', 31, 50, 60, 80, 20],
        ['유석준', 50, 10, 50, 70, 40],
        ['주종훈', 77, 30, 40, 20, 80],
        ['최정현', 68, 70, 50, 20, 60]
        ];

    const options = {
        legend: 'none',
        hAxis: { title: '직원' },
        vAxis: { title: '' },
        title: 'Data : 월별 계좌 판매량', // 작은 타이틀 추가
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
                                data={data}
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