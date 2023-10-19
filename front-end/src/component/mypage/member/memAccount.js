import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";

class memAccount extends Component{
    render() {
        const data = [
            ['Day', 'data1', { role: 'style' }],
            ['지로/생활요금/기타', 70, 'red'],
            ['지방세/등록금', 31, 'orange'],
            ['국고/관세', 50, 'green'],
            ['연금/보험료납부', 77, 'blue'],
            // ['월 이체금', 68]
            ];
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
            hAxis: { title: '' },
            vAxis: { title: '' },
            title: '* 월 공과금 이체량', // 작은 타이틀 추가
            orientation: 'horizontal',
            };
        const options2 = {
            legend: 'none',
            hAxis: { title: '' },
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
                                    data={data}
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