import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Container} from '@mui/material';
import utility from "../../api/utility";

function Unix_timestamp(t) {
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
    //console.log(date) //2023-02-28T05:36:35.000Z 출력됨
    const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2);
}
function name(t) {
    if (t === "a") {
        return "지로/생활요금/기타";
    }
    else if (t === "b") {
        return "지방세/등록금";
    }
    else if (t === "c") {
        return "국고/관세";
    }
    else {
        return "연금/보험료";
    }
}

class utilityList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            utilities : [],
            message: null
        }
    }

    componentDidMount() {
        this.utilityList();
    }

    utilityList = () => {
        let id = window.localStorage.getItem("id");
        utility.utilityList(id)
            .then(res => {
                console.log('data', res.data);
                this.setState({
                    utilities: res.data,
                })

            })
            .catch(err => {
                console.log('utilityList Errror', err)
            });



    }

    render() {
        return (
            <div align='center'>
                <form>
                <br/>
                    <Typography variant="h4">
                        공과금 납부내역조회
                    </Typography>
                    <br/><br/>
                    <Table style={{width:'53vw'}}>
                        <TableHead style={{width:'53vw'}}>
                            <TableRow>
                                <TableCell style={style} colSpan={4}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={tableBody}>
                            <TableRow>
                                <TableCell style={{ textAlign: 'left', padding:'30px'}}>
                                    ＊ 인터넷뱅킹 이외의 방법(은행창구, 가상계좌 등)으로 납부하실 경우 이중 납부되지 않도록 반드시 확인 하신 후 납부하시기 바라며, 이중 납부된 경우 국민건강보험공단으로 환급신청 하여 주시기 바랍니다. <br />
                                    * 고지서상에 표시된 납부자번호(지역가입자는 주민번호와 전자납부번호)로 고지내역을 조회한 후 납부가능합니다.<br />
                                    * 납부자번호 또는 전자납부번호를 알 수 없는 경우 국민건강보험공단으로 문의하시기 바랍니다.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        
                    </Table>
                    <br/>
                    
                    <Typography style={typography}>
                        공과금 납부내역 간략조회
                    </Typography>
                    <Container maxWidth="md">
                    <Table md={{ minWidth: 900 }}>
                        <TableHead style={tableHead}>
                            <TableRow>
                                <TableCell align='center' style={{ color: 'navy', border: '1px solid rgb(230, 229, 227)'}}><b>구분</b></TableCell>
                                <TableCell align='center' style={{ color: 'navy', border: '1px solid rgb(230, 229, 227)'}}><b>계좌번호</b></TableCell>
                                <TableCell align='center' style={{ color: 'navy', border: '1px solid rgb(230, 229, 227)'}}><b>전자납부번호</b></TableCell>
                                {/* <TableCell align='center' style={{ color: 'navy', border: '1px solid rgb(230, 229, 227)'}}><b>고지년월</b></TableCell> */}
                                <TableCell align='center' style={{ color: 'navy', border: '1px solid rgb(230, 229, 227)'}}><b>납부기한</b></TableCell>
                                <TableCell align='center' style={{ color: 'navy', border: '1px solid rgb(230, 229, 227)'}}><b>납부금액</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.utilities.map(utility =>
                                <TableRow key={utility.utilityId}>
                                    <TableCell component="th" scope="utility">{name(utility.utilityType)}</TableCell>
                                    <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>{utility.accountNum}</TableCell>
                                    <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>{utility.utilityId}</TableCell>
                                    {/* <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>{Unix_timestamp(utility.notificationDate)}</TableCell> */}
                                    <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>{Unix_timestamp(utility.utDate)}</TableCell>
                                    <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>{utility.utAmount}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                 </Container>         
                    <br /><br />

                    <Typography style={typography}>
                        알아두세요!
                    </Typography>
                    <Table style={{width:'53vw'}}>
                        <TableHead style={style}  >
                            <TableRow>
                                <TableCell style={style} colSpan={4}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={tableBody}>
                            <TableRow>
                                <TableCell style={{ textAlign: 'left', padding:'30px'}}>
                                    - 2008년 7월분 보험료부터 건강보험료와 장기요양보험료가 통합 고지됩니다. <br/>
                                    - 노인장기요양보험료 = 건강보험료 x 10.25% (직장가입자의 경우 가입자와 사용자가 50%씩 부담)<br/>
                                    - 통합징수보험료는 모든 체납분이 하나의 내역으로 나타나게 됩니다.<br/>
                                        예시: 현재(당월분이 2020년 1월) 10, 11, 12월 체납분이 있을 경우 10, 11, 12월 체납분을 모두 합한 금액이 하나의 체납분으로 나타납니다.<br/>
                                    - 국민건강보험법 제13조(업무 등) 10항에 의하여 2011년 1월부터 사회보험료(건강보험료, 연금보험료, 산재보험료) 징수업무를 국민건강보험공단에서 수행합니다. 보험료 납부와 고지내역에 관한 사항 등은 국민건강보험공단으로 문의하시기 바랍니다.<br/>
                                    - 반납금과 추납보험료는 고지서에 해당요금명이 명시되어 있으며, 이 요금들은 정기적으로 나가는 것이 아니라 고객이 신청해야만 고지되는 형식의 요금입니다. 해당 보험료에 대한 자세한 설명은 국민연금 홈페이지를 참고하시기 바랍니다.<br/>
                                    - 고용/산재보험료(연납/분기납) 구별 기준은 건설 및 벌목업의 경우에만 해당이 되며, 그 외 업종은 모두 월납으로서 국민건강보험공단으로 이관됩니다.<br/>
                                    - 기타징수금 역시 고지서에 해당 요금명이 명시되어 있기 때문에, 건강보험료 고지서와 구분이 가능합니다. 해당 보험료에 대한 자세한 설명은 건강보험 홈페이지를 참고하시기 바랍니다.
                                    <br />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <br/>
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

const tableBody = {
    borderTop: '1px solid rgb(230, 229, 227)',
    borderBottom: '1px solid rgb(230, 229, 227)'
}

const typography = {
    textAlign: 'left',
    fontSize: '17px',
    margin: '20px',
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(135deg, #0074D9, #00A8E8, #0074D9) 1',
    width: '53vw'
}

const tableHead = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
};
export default utilityList;