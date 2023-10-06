import React,{Component} from "react";
import { Chart } from 'react-google-charts';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import classNames from 'classnames';  // npm i classnames --save   대소문자 주의 
import './fund.css';

export default class fundDtail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "Buy",
            fAccount: "",    // login: "" -> id: ""
            fpName: "",
            tCnt: "",
            tPrice: "",
            tMarketPrice: "",
            tStatus: ""
        };
    }; 
    render() {
        // const [buyQuantity, setBuyQuantity] = useState(0);
        // const [sellQuantity, setSellQuantity] = useState(0);
        // const [fundPrice, setFundPrice] = useState(0);
        // const [balance, setBalance] = useState(10000); // 초기 잔액

        // const handleBuy = () => {
        //     const totalPrice = buyQuantity * fundPrice;
        //     if (totalPrice <= balance) {
        //     setBalance(balance - totalPrice);
        //     // 펀드 주식을 매수하는 로직 추가
        //     } else {
        //     alert('잔액 부족');
        //     }
        // };

        // const handleSell = () => {
        //     const totalValue = sellQuantity * fundPrice;
        //     setBalance(balance + totalValue);
        //     // 펀드 주식을 매도하는 로직 추가
        // };

       
    
        // // 필드의 업데이트된 값을 state에 저장
        // onChangeHandler = (event) => {
        //     let name = event.target.name;
        //     let value = event.target.value;
        //     this.setState({[name]: value});
        // };
    
        // // 로그인 처리
        // onSubmitLogin = (e) => {
        //     console.log('[onSubmitLogin]');
        //     this.state.onLogin(e, this.state.id, this.state.password);  // this.state.login-> this.state.id
        // };
    
        // // 등록 처리
        // onSubmitRegister = (e) => {
        //     console.log('[onSubmitRegister]');
        //     this.state.onRegister(
        //         e,            
        //         this.state.id,    // this.state.login-> this.state.id 
        //         this.state.password,
        //         this.state.firstName,
        //         this.state.lastName
        //     );
        // };

        const data = [
            ['Day', 'Data', 'Open', 'Close', 'High', { role: 'style' }],
            ['Mon', 20, 28, 38, 45, 'blue'],  // 시가 < 종가 (이익), 파란색
            ['Tue', 31, 38, 55, 66, 'blue'],  // 시가 < 종가 (이익), 파란색
            ['Wed', 50, 55, 77, 80, 'blue'],  // 시가 < 종가 (이익), 파란색
            ['Thu', 77, 77, 66, 50, 'red'],   // 시가 > 종가 (손실), 빨간색
            ['Fri', 68, 66, 22, 15, 'red']    // 시가 > 종가 (손실), 빨간색
          ];
    
        const options = {
        legend: 'none',
        hAxis: { title: 'Day' },
        vAxis: { title: 'Price' },
        title: 'Data : 저가-고가, 시가-종가' // 작은 타이틀 추가
        };
        return (
            <div>
                <Typography variant="h4">Fund Detail</Typography>
                <Table style={mainTable}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                    <Typography variant="h5">ACE 200</Typography>
                                    <Table style={tableStyle}>
                                        <TableHead style={{ backgroundColor: 'rgb(230, 229, 227)'}}>
                                            <TableRow>
                                                <TableCell>
                                                    종목코드
                                                </TableCell>
                                                <TableCell>
                                                    대비
                                                </TableCell>
                                                <TableCell>
                                                    등락률
                                                </TableCell>
                                                <TableCell>
                                                    순자산가치(NAV)
                                                </TableCell>
                                                <TableCell>
                                                    거래량
                                                </TableCell>
                                                <TableCell>
                                                    거래대금
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    105190
                                                </TableCell>
                                                <TableCell>
                                                    85
                                                </TableCell>
                                                <TableCell>
                                                    0.26
                                                </TableCell>
                                                <TableCell>
                                                    33,146.02
                                                </TableCell>
                                                <TableCell>
                                                    3,151
                                                </TableCell>
                                                <TableCell>
                                                    104,105,795
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableHead style={{ backgroundColor: 'rgb(230, 229, 227)'}}>
                                            <TableRow>
                                                <TableCell>
                                                    시가총액
                                                </TableCell>
                                                <TableCell>
                                                    상장좌수
                                                </TableCell>
                                                <TableCell>
                                                    기초지수_지수명
                                                </TableCell>
                                                <TableCell>
                                                    기초지수_종가
                                                </TableCell>
                                                <TableCell>
                                                    기초지수_대비
                                                </TableCell>
                                                <TableCell>
                                                    기초지수_등락률
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    442,552,500,000
                                                </TableCell>
                                                <TableCell>
                                                    13,350,000
                                                </TableCell>
                                                <TableCell>
                                                    코스피 200
                                                </TableCell>
                                                <TableCell>
                                                    326.71
                                                </TableCell>
                                                <TableCell>
                                                    -0.19
                                                </TableCell>
                                                <TableCell>
                                                    -0.06
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                            </TableCell>
                            <TableCell>
                                <Chart
                                    width={'600px'}
                                    height={'400px'}
                                    chartType="CandlestickChart"
                                    loader={<div>Loading Chart</div>}
                                    data={data}
                                    options={options}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
              
            <br/><br/>
            <div className="row justify-content-center">
                <div className="col-4">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                
                {/* Buy 버튼 */}
                <li className="nav-item" role="presentation">
                    <button className={classNames("nav-buy", this.state.active === "Buy" ? "active" : "")}                  
                    id="tab-buy" onClick={() => this.setState({active: "Buy"})}>Buy</button>
                </li>

                {/* Sell 버튼 */}
                <li className="nav-item" role="presentation">
                    <button className={classNames("nav-sell", this.state.active === "Sell" ? "active" : "")}
                    id="tab-sell" onClick={() => this.setState({active: "Sell"})} >
                    Sell</button>
                </li>
                </ul>

                <div className="tab-content">
                <div className={classNames("tab-pane", "fade", this.state.active === "Buy" ? "show active" : "")} 
                    id="pills-buy" >
                    
                    {/* Buy 폼, (name="login" -> name="id"),  input type="login" -> input type="text", label : ID */}
                    <form onSubmit={this.onSubmitLogin}>
                        <div style={{textAlign : "end"}}>
                            <small style={{ color : 'gray' }}>계좌잔액 : 10,000,000원</small>
                        </div>
                        <div className="form-outline mb-4" style={{textAlign : "end"}}>
                            <label className="form-label" htmlFor="open">시가</label>
                            <input type="text" id="open" name= "openPrice" className="form-control" value={'100,000'}/>
                        </div>

                        <div className="form-outline mb-4" style={{textAlign : "end"}}> 
                            <label className="form-label" htmlFor="cnt">수량</label>
                            <input type="number" id="cnt" name="buyCnt" className="form-control" onChange={this.onChangeHandler}/>
                        </div>

                        <div className="form-outline mb-4" style={{textAlign : "end"}}> 
                            <label className="form-label" htmlFor="price">매수금액</label>
                            <input type="number" id="price" name="buyPrice" className="form-control" onChange={this.onChangeHandler}/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4" style={{backgroundColor : "green", border : 'none', width : '20vw'}}>
                        Buy</button>
                    </form>
                </div>
                
                {/* Slee 폼, (name="login" -> name="id")  , label : ID*/}
                <div className={classNames("tab-pane", "fade", this.state.active === "Sell" ? "show active" : "")} 
                    id="pills-sell" >
                    <form onSubmit={this.onSubmitLogin}>
                        <div style={{textAlign : "end"}}>
                            <small style={{ color : 'gray' }}>계좌잔액 : 10,000,000원</small>
                        </div>
                        <div className="form-outline mb-4" style={{textAlign : "end"}}>
                            <label className="form-label" htmlFor="open">시가</label>
                            <input type="text" id="open" name= "openPrice" className="form-control" value={'100,000'}/>
                        </div>

                        <div className="form-outline mb-4" style={{textAlign : "end"}}> 
                            <label className="form-label" htmlFor="cnt">수량</label>
                            <input type="number" id="cnt" name="buyCnt" className="form-control" onChange={this.onChangeHandler}/>
                        </div>

                        <div className="form-outline mb-4" style={{textAlign : "end"}}> 
                            <label className="form-label" htmlFor="price">매도금액</label>
                            <input type="number" id="price" name="buyPrice" className="form-control" onChange={this.onChangeHandler}/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4" style={{backgroundColor : "#800000", border : 'none', width : '20vw'}}>
                        Sell</button>
                    </form>
                </div>
                </div>
                </div>
            </div>
                
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
{/* <div>
<h2>주식 거래</h2>
<p>현재 잔액: 원</p>
<div>
    <h3>매수</h3>
    <input
    type="number"
    placeholder="수량"
    value=""
    // onChange={(e) => setBuyQuantity(Number(e.target.value))}
    />
    <button onClick={handleBuy}>매수</button>
    <button>매수</button>
</div>
<div>
    <h3>매도</h3>
    <input
    type="number"
    placeholder="수량"
    value=""
    // onChange={(e) => setSellQuantity(Number(e.target.value))}
    />
    <button onClick={handleSell}>매도</button>
    <button>매도</button>
</div>
</div> */}

