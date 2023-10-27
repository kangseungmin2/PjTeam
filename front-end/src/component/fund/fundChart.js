import React, { Component } from "react";
import { Chart } from 'react-google-charts';
import ApiService from "../../ApiService";

export default class fundChart extends Component {

    constructor(props){
        super(props)
        this.state = {
            chartData : [['Day', 'Row', 'Open', 'Close', 'High', { role: 'style' }]],
            loading: true // 데이터 로딩 상태 추가
        }
    }
    
    componentDidMount(){
        this.fundChart();
    };

    fundChart = () => {
        const  fpName = window.localStorage.getItem('fpName');
        ApiService.fundChart(fpName)
        .then(res => {
            console.log('fundChart() res!!', res.data);
            const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
             // 데이터를 Google Charts 형식으로 변환
           const chartData = res.data.map(item => [
                daysOfWeek[new Date(item.eventDate).getDay()],
                item.lowPrice, 
                item.marketPrice, 
                item.closingPrice, 
                item.highPrice,
                item.marketPrice < item.closingPrice ? 'blue' : 'red'
            ]);

            this.setState({ 
                chartData: [['Day', 'row', 'Open', 'Close', 'High', { role: 'style' }], ...chartData],
                loading: false // 로딩 상태 해제
            })
        })
        .catch(err => {
            console.log('fundChart() Error!!', err);
            
        })

    }


    render(){
        const options = {
            legend: 'none',
            hAxis: { title: 'Day' },
            vAxis: { title: 'Price' },
            title: 'Data : 저가-고가, 시가-종가' // 작은 타이틀 추가
        };

        return(
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="CandlestickChart"
                loader={<div>Loading Chart</div>}
                data={this.state.chartData}
                options={options}
            />
        )
    }
}