import React,{Component} from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, TableFooter, Grid, Container } from "@mui/material";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import Checkbox from '@mui/material/Checkbox';

export default class fundAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked : false
        }
    }

    chkChange = (e) => {
        this.setState({ checked : e.target.checked})
    }

    nextButton = () =>{
        if (this.state.checked){
            this.props.history.push("/lastFundAccount");
        }
        else {
            alert("약관에 동의하세요.");
        }
        
    }

    render(){
        const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
        return(
            <div align='center'>
                <form>
                    <Typography variant="h4">
                        Fund Account
                    </Typography>
                    <Table style={box}>
                        <TableHead style={style}  >
                            <TableRow>
                                <TableCell style={style2} colSpan={4}>펀드계좌 개설</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={tableBody}>
                            <TableRow style={style}>
                                <TableCell style={boxText}>
                                    <CardGiftcardIcon style={{fontSize:'5vw'}} color = 'primary'/>
                                </TableCell>
                                <TableCell style={boxText}>
                                    <PersonPinIcon style={{fontSize:'5vw'}} color = 'primary'/>
                                </TableCell>                          
                            </TableRow>
                            <TableRow style={style}>
                                <TableCell style={boxText2}>
                                    <h5>펀드계좌 개설</h5>
                                </TableCell>
                                <TableCell style={boxText2}>
                                    <h5>실명의 개인</h5>
                                </TableCell>                          
                            </TableRow>
                        </TableBody>

                        <TableFooter>
                            <TableRow style={style}>
                                <TableCell>
                                    <button type="button" className="btn btn-primary btn-block md-3" style={button} onClick={this.nextButton}>계좌개설</button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    <Typography style={typography}>
                            2018년 이후 거래시 유의사항
                    </Typography>

                    <Table style={tableStyle}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    구분
                                </TableCell>
                                <TableCell style={tableHead} colSpan={2}>
                                    2017.12.31까지
                                </TableCell>
                                <TableCell style={tableHead} colSpan={2}>
                                    2018.01.01이후
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{textAlign : 'center'}}>
                                    납입한도 변경
                                </TableCell>
                                <TableCell style={{textAlign : 'center', border : '1px solid rgb(230, 229, 227)'}} colSpan={2}>
                                    가능
                                </TableCell>
                                <TableCell style={{textAlign : 'center', color : 'red'}} colSpan={2}>
                                    불가
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{textAlign : 'center'}}>
                                    입금비율 변경
                                </TableCell>
                                <TableCell style={{textAlign : 'center', border : '1px solid rgb(230, 229, 227)'}} colSpan={2}>
                                    가능
                                </TableCell>
                                <TableCell style={{textAlign : 'center'}} colSpan={2}>
                                    가능
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell rowSpan={3} style={{borderRight : '1px solid rgb(230, 229, 227)', textAlign : 'center'}}>
                                    납입한도<br/> 
                                    적용방식
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{textAlign : 'center'}}>
                                    출금
                                </TableCell>
                                <TableCell style={{textAlign : 'center', border : '1px solid rgb(230, 229, 227)'}}>
                                    출금한 금액만큼 잔여한도 생성<br/>
                                    (출금한 금액만큼 재입금 가능)
                                </TableCell>
                                <TableCell style={{textAlign : 'center'}}>
                                    잔여한도 변동 없음<br/>
                                    (출금한 금액만큼 재입금 불가)
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{textAlign : 'center'}}>
                                    금액이동
                                </TableCell>
                                <TableCell style={{textAlign : 'center', border : '1px solid rgb(230, 229, 227)'}}>
                                    잔여한도 변동 없음<br/>
                                    (잔여한도와 상관없이 금액이동 가능)
                                </TableCell>
                                <TableCell style={{textAlign : 'center'}}>
                                    이동한 금액만큼 잔여한도 차감<br/>
                                    (잔여한도 금액만큼만 이동 가능)
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Typography style={typography}>
                            상품안내 및 이용약관
                    </Typography>
                    <Container component="main" maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                <MDBAccordion initialActive={1}>
                                        <MDBAccordionItem collapseId={1} headerTitle={<>상품특징</>}>
                                            <li>법령에 따라 거주자가 전용저축통장(모계좌)을 통해 국내에 상장된 주식에 직간접으로 60%이상 투자하는
                                            전용펀드(자계좌)에 가입할 경우, 주식 매매,평가차익과 환차익에 대해 세제혜택이 있는 상품</li>
                                            <span style={{color : "red"}}>※ "전용저축통장"을 통해 개설한 펀드만 세제혜택이 있습니다.</span>
                                        </MDBAccordionItem>
                                </MDBAccordion>
                                <MDBAccordion initialActive={1}>
                                        <MDBAccordionItem collapseId={2} headerTitle={<>가입대상</>}>
                                            <li>대한민국 거주자 누구나 (법인 가입 불가)</li>
                                        </MDBAccordionItem>
                                </MDBAccordion>
                                <MDBAccordion initialActive={1}>
                                        <MDBAccordionItem collapseId={3} headerTitle={<>서비스 유의사항 안내</>}>
                                        <li> 퇴직연금 펀드 매수ㆍ환매 시 기준가 적용일자 및 매수ㆍ환매일자는 약관의 Late Trading 이전 기준에 1 영업일이 추가로 소요됩니다.
                                            집합투자증권은 운용결과에 따라 투자원금의 손실이 발생할 수 있으며, 그 손실은 투자자에게 귀속됩니다.
                                            집합투자증권을 취득하시기 전에 투자대상, 보수 · 수수료 및 환매방법 등에 관하여 (간이)투자설명서를 반드시 읽어보시기 바랍니다.
                                            (해외펀드의 경우) 환율 변동에 따라 손실이 발생할 수 있습니다.
                                            과거의 운용실적이 미래의 수익률을 보장하는 것은 아닙니다.
                                            이 금융상품은 예금자보호법에 따라 예금보험공사가 보호하지 않습니다.
                                            문의사항 연락처 : 우리은행 스마트고객센터 퇴직연금팀 (☎ 080-365-5000(ARS 24)) , 문의가능시간 : 평일 09시 ~ 18시
                                            고령자 및 금융취약계층의 경우 비대면 펀드가입시 온라인펀드상담센터(☎1661-0065)를 적극 활용해 주시기 바랍니다.</li>
                                        </MDBAccordionItem>
                                </MDBAccordion>
                                <MDBAccordion initialActive={1}>
                                        <MDBAccordionItem collapseId={4} headerTitle={<>이용약관</>}>
                                            <ul>
                                                <li>국내상장 주식에 직간접적으로 60%이상 투자하는 펀드</li>
                                                <li>1인당 3천만원 (모든 금융기관 합산)</li>
                                                <li>
                                                    국내상장주식의 매매,평가차익과 환차익 과세제외
                                                    그 외의 소득(채권이자, 주식배당, 환헤지 거래에서 발생한 이이 등)은 과세
                                                </li>
                                                <li>
                                                    통장 가입일(개설일)로 부터 10년간
                                                    - 가입일로부터 10년 이내에 환매하지 않을 경우, 자동환매를 통해 만기시 환매대금 지급
                                                    - 세제혜택을 위한 의무가입기간은 없으며, 중도환매 시에도 세제혜택 적용됨(환매수수료는 펀드별 집합투자규약에 따름)
                                                </li>
                                                <li>
                                                    투자이익이 없거나 투자손실이 발생하더라도 환율 변동 위험을 피하기 위한 환헤지 거래에서 발생하는 손익
                                                    (환헤지 대상 해외자산의 통화가치가 하락하여 환헤지 거래에서 이익이 발생하는 경우 포함),
                                                    해외상장주식 이외의 자산에서 발생하는 손익 등에 따라 과세될 수 있습니다.
                                                </li>
                                            </ul>
                                        </MDBAccordionItem>
                                </MDBAccordion>
                            </Grid>
                        </Grid>
                    </Container>
                    <div>
                        <span style={{color : "red", fontSize : '13px'}}>※ 필수</span> <span style={{color : "red", fontSize : '13px'}}>모든 이용약관을 확인 하였으며, 이의 동의합니다.</span>
                        <Checkbox
                            {...label}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            checked={this.state.checked}
                            onChange={this.chkChange}
                        />
                    </div>
                </form>
            </div> 
        );
    }
}
const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const style2 = {
    fontSize: '30px',
    border: 'none'
}

const box = {
    borderRadius: '50px 50px',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
    width: '50vw',
    height: '20vw',
    margin: '50px 50px'
}

const boxText = {
    width: '450px',
    margin: '0px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border : 'none'
}

const boxText2 = {
    width: '450px',
    margin: '0px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border : 'none'
}

const button = {
    width: '130px',
    height: '40px',
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    borderRadius: '10px'
}

const tableBody = {
    borderTop: '1px solid rgb(230, 229, 227)',
    borderBottom: '1px solid rgb(230, 229, 227)'
}

const typography = {
    textAlign : 'left',
    fontSize : '17px',
    margin : '20px',
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(135deg, #0074D9, #00A8E8, #0074D9) 1',
    width : '53vw'
}

const tableStyle = {
    width: '50vw',
    marginBottom : '70px'
};

const tableHead = {
    border : '1px solid rgb(230, 229, 227)',
    textAlign : 'center',
    fontWeight : '700',
    backgroundColor : 'rgba(135, 206, 235, 0.2)'
};