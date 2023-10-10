import React, { Component } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, TableFooter } from "@mui/material";
import className from 'classnames';
import ApiService from "../../ApiService";

export default class accountChk extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountList:[], 
            message:null
        }
    } 

    // // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    // componentDidMount(){
    //     this.accountList();
    //  }

    //  accountList = () => {
    //     const id = "iu";
    //     ApiService.accountChk(id)
    //     .then(res => {
    //         this.setState({
    //             accountList : res.data
    //         })
    //     })
    //     .catch(err => {
    //         console.log('accountList() Error!!', err);   
    //     })

    //  }
   
    // passwordChk = (fAccount) => {

    // }


    render(){
        return(
            <div align = 'center'>
                <Typography variant="h4">
                Account Check
                </Typography>
                {/* <form onSubmit={passwordChk(fAccount)}> */}
                <form>
                    <Table style={box}>
                        <TableHead style={style} >
                            <TableRow>
                                <TableCell style={style2} colSpan={4}><span style={{color : '#46B8FF'}}>test</span>  님의 계좌</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody style={tableBody}>
                            <TableRow style={style}>
                                <span style={boxText}>
                                    <TableCell style={style3}>펀드 계좌번호 : </TableCell>
                                    <TableCell style={style4}>0154565845615</TableCell>
                                </span>
                                <span style={boxText}>
                                    <TableCell style={style3}>계좌 개설일 : </TableCell>
                                    <TableCell style={style4}>2023-10-01</TableCell>
                                </span>
                            </TableRow>
                            <TableRow style={style}>
                                <span style={boxText}>
                                    <TableCell style={style3}>계좌잔액 : </TableCell>
                                    <TableCell style={style4}>1000000원</TableCell>
                                </span>
                                <span style={boxText}>
                                    <TableCell style={style3}>최종 거래일 : </TableCell>
                                    <TableCell style={style4}>2023-10-10</TableCell>
                                </span>
                            </TableRow>
                        </TableBody>

                        <TableFooter>
                            <TableRow style={style}>
                                <TableCell>
                                    <input type="password" style={pwd} placeholder="계좌 비밀번호를 입력하세요."/>
                                    <button type="submit" className="btn btn-primary btn-block md-3" style={button}>확인</button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </form>
            </div>
        );
    }
} 
const styleHader = {
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor:'#46B8FF'
}

const style = {
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
}

const style2 = {
    fontSize : '30px', 
    border : 'none'
}

const style3 = {
    fontSize : '20px', 
    border : 'none'
}

const style4 = {
    fontSize : '20px', 
    border : 'none',
    color : '#b0b0b0'
}

const box = {
    borderRadius: '50px 50px' ,
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
    width : '50vw',
    height : '20vw',
    margin : '20px 20px'
}

const boxText = {
    width : '450px',
    height : '50px',
    margin : '20px 20px',
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
}

const pwd ={
    width : '300px',
    height : '40px',
    margin : '10px',
    fontSize : '15px'
}

const button = {
    width : '130px',
    height : '40px',
    textAlign : 'center'
}

const tableBody = {
    borderTop : '1px solid rgb(230, 229, 227)',
    borderBottom : '1px solid rgb(230, 229, 227)'
}