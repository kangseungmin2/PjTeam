import React,{Component} from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import classNames from 'classnames';  // npm i classnames --save   대소문자 주의 
import './fund.css';
import ApiService from "../../ApiService";
import SelectTransactionList from "./selectTransactionList";
import FundChart from "./fundChart";



export default class fundDtail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "b",
            fProduct : [],
            fAccount : [],
            fdTransactionDTO : {
                fdAccount : 0,              // 펀드 계좌번호 fk
                fpName : '',			    // 종목명 fk
                trCnt : 0,			        // 거래량
                trPrice : 0,			    // 거래금액
                trMarketPrice : '',	        // 거래시가
                trStatus : '',               // 거래상태 (매수 : b, 매도 : s)
            },
            transactionList: [],
            errorMessage : '',
            income: 0
        };
    }; 

    componentDidMount(){
        this.fundProduct();
    };

    fundProduct = () => {
        const  faccount = window.localStorage.getItem('faccount');
        const  fpName = window.localStorage.getItem('fpName');
        ApiService.fProductDetail(fpName)
        .then(res => {
            this.setState({ 
                fProduct : res.data
            })
            ApiService.getFaccount(faccount)
            .then(accountRes => {
                this.setState({
                    fAccount : accountRes.data,
                })
                ApiService.oneTransactionList(faccount,fpName)
                .then(res => { 
                    this.setState({
                        transactionList : res.data,
                    })
                })
                .catch(err => {
                    console.log('transactionList() Error!!', err);   
                })
            })
            .catch(accountErr => {
                console.log('getFaccount() Error!!', accountErr);   
            })
        })
        .catch(err => {
            console.log('fProductDetail() Error!!', err);
            
        })

    }

    
    // 필드의 업데이트된 값을 state에 저장
    onChangeHandler = (event) => {
        console.log(parseInt(event.target.value))
        const tCnt = parseInt(event.target.value);

        let tPrice = tCnt * parseInt(this.state.fProduct.marketPrice);
        if (this.state.active == 's') {
            const orPrice = tCnt * parseInt(this.state.fProduct.marketPrice);
            const etcPrice = orPrice * (this.state.fProduct.etc/100);
            tPrice = orPrice-etcPrice; 
            this.setState({
                income: Math.round(etcPrice)
            });
        }
        console.log("tcne11",tCnt)
        console.log("최종",tPrice)
        this.setState({
          fdTransactionDTO: {
                fdAccount : parseInt(this.state.fAccount.fdAccount),            // 펀드 계좌번호 fk
                fpName : this.state.fProduct.fpName,			               // 종목명 fk
                trCnt : tCnt,			                                       // 거래량
                trPrice : tPrice,	                                           // 거래금액
                trMarketPrice : this.state.fProduct.marketPrice,	           // 거래시가
                trStatus : this.state.active,                                  // 거래상태
          }
        });
      };
        

    // 펀드 매수, 매도 메서드
    buyOrSell = () => {
        
        // 매수, 매도 메서드 진행
        console.log("dddd", this.state.income)
        ApiService.buyOrSell(this.state.fdTransactionDTO, this.state.income)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    // 성공적인 응답 처리
                    console.log(response);
                    alert(response.data.message);
                    window.location.reload();
                  } else {
                    // 오류 메시지 처리
                    alert(response.data.message);
                    window.location.reload();
                  }
            });
            // .catch(response => {
            //     console.log('API Error:', response);
            //     alert(response.data.message);
            //     window.location.reload();
            // });
    };
    
    
    render() {
        return (
            
            <div>
                <Typography variant="h4">펀드 상세페이지</Typography>
                <Table style={mainTable}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h5">{this.state.fProduct.fpName}</Typography>
                                <Table style={tableStyle}>
                                    <TableHead style={{ backgroundColor: 'rgb(230, 229, 227)'}}>
                                        <TableRow>
                                            <TableCell>
                                                종목코드
                                            </TableCell>
                                            <TableCell>
                                                국제인증 고유번호
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
                                            {this.state.fProduct.fpNum}
                                            </TableCell>
                                            <TableCell>
                                            {this.state.fProduct.isincd}
                                            </TableCell>
                                            <TableCell style={this.state.fProduct.fluctuationRate < 0 ? {color : 'blue'} : {color : 'red'}}>
                                            {this.state.fProduct.fluctuationRate}
                                            </TableCell>
                                            <TableCell>
                                            {this.state.fProduct.netAssetValue}
                                            </TableCell>
                                            <TableCell>
                                            {parseInt(this.state.fProduct.tradingVolume).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                            {parseInt(this.state.fProduct.transactionAmount).toLocaleString()}
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
                                                기초지수_등락률
                                            </TableCell>
                                            <TableCell>
                                                수수료율
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                            {parseInt(this.state.fProduct.marketCapitalization).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                            {this.state.fProduct.listingsNum}
                                            </TableCell>
                                            <TableCell>
                                            {this.state.fProduct.bindexName}
                                            </TableCell>
                                            <TableCell>
                                            {this.state.fProduct.bclosingPrice}
                                            </TableCell>
                                            <TableCell style={parseInt(this.state.fProduct.bfluctuationRate) < 0 ? {color : 'blue'} : {color : 'red'}}>
                                            {this.state.fProduct.bfluctuationRate}
                                            </TableCell>
                                            <TableCell>
                                            {this.state.fProduct.etc}%
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableCell>
                            {/* 차트영역 */}
                            <TableCell>
                                <FundChart/>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
              
            <br/><br/>
            
            <div style={divStyle}>
                <div className="col-4">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                
                {/* Buy 버튼 */}
                <li className="nav-item" role="presentation">
                    <button className={classNames("nav-buy", this.state.active === "b" ? "active" : "")}                  
                    id="tab-buy" onClick={() => this.setState({active: "b"})}>Buy</button>
                </li>

                {/* Sell 버튼 */}
                <li className="nav-item" role="presentation">
                    <button className={classNames("nav-sell", this.state.active === "s" ? "active" : "")}
                    id="tab-sell" onClick={() => this.setState({active: "s"})} >
                    Sell</button>
                </li>
                </ul>

                <div className="tab-content">
                <div className={classNames("tab-pane", "fade", this.state.active === "b" ? "show active" : "")} 
                    id="pills-buy" >
                    
                    {/* Buy 폼, (name="login" -> name="id"),  input type="login" -> input type="text", label : ID */}
                    <form >
                        <div style={{textAlign : "end"}}>
                            <small style={{ color : 'gray' }}>계좌잔액 : {parseInt(this.state.fAccount.balance).toLocaleString()} 원</small><br/>
                            <small style={{ color : 'gray' }}>매수 수량 : {parseInt(this.state.transactionList.trCnt) === 0 ? '거래내역이 없습니다.' : parseInt(this.state.transactionList.trCnt)+'개'} </small>
                        </div>
                        <div className="form-outline mb-4" style={{textAlign : "end"}}>
                            <label className="form-label" htmlFor="open">시가 </label>
                            <input type="text" id="open" name= "tMarketPrice" className="form-control" value={parseInt(this.state.fProduct.marketPrice).toLocaleString()}/>
                        </div>

                        <div className="form-outline mb-4" style={{textAlign : "end"}}> 
                            <label className="form-label" htmlFor="cnt">수량</label>
                            <input type="number" id="cnt" name="tCnt" className="form-control" value={this.state.fdTransactionDTO.trCnt} onChange={this.onChangeHandler}/>
                        </div>

                        <div className="form-outline mb-4" style={{textAlign : "end"}}> 
                            <label className="form-label" htmlFor="price">매수금액</label>
                            <input type="text" id="price" name="tPrice" className="form-control" value={this.state.fdTransactionDTO.trPrice.toLocaleString()} />
                        </div>

                        <button onClick={this.buyOrSell} type="button" className="btn btn-primary btn-block mb-4" style={{backgroundColor : "green", border : 'none', width : '20vw'}}>
                        Buy</button>
                    </form>
                </div>
                
                {/* Slee 폼, (name="login" -> name="id")  , label : ID*/}
                <div className={classNames("tab-pane", "fade", this.state.active === "s" ? "show active" : "")} 
                    id="pills-sell" >
                    <form>
                        <div style={{textAlign : "end"}}>
                            <small style={{ color : 'gray' }}>계좌잔액 : {parseInt(this.state.fAccount.balance).toLocaleString()} 원</small><br/>
                            <small style={{ color : 'gray' }}>매수 수량 : {parseInt(this.state.transactionList.trCnt) === 0 ? '거래내역이 없습니다.' : parseInt(this.state.transactionList.trCnt)+'개'} </small>
                        </div>
                        <div className="form-outline mb-4" style={{textAlign : "end"}}>
                            <label className="form-label" htmlFor="open">시가</label>
                            <input type="text" id="open" name= "tMarketPrice" className="form-control" value={parseInt(this.state.fProduct.marketPrice).toLocaleString()}/>
                        </div>

                        <div className="form-outline mb-4" style={{textAlign : "end"}}> 
                            <label className="form-label" htmlFor="cnt">수량</label>
                            <input type="number" id="cnt" name="tCnt" className="form-control"  value={this.state.fdTransactionDTO.trCnt} onChange={this.onChangeHandler}/>
                        </div>

                        <div className="form-outline mb-4" style={{textAlign : "end"}}> 
                            <label className="form-label" htmlFor="price">매도금액</label>
                            <input type="text" id="price" name="tPrice" className="form-control" value={Math.round(this.state.fdTransactionDTO.trPrice).toLocaleString()} />
                        </div>

                        <button onClick={this.buyOrSell}  type="button" className="btn btn-primary btn-block mb-4" style={{backgroundColor : "#800000", border : 'none', width : '20vw'}}>
                        Sell</button>
                    </form>
                </div>
                </div>
                </div>
                <div>
                    <SelectTransactionList/>
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

const divStyle = {
    display : 'flex',
    justifyContent : 'space-around'

}
