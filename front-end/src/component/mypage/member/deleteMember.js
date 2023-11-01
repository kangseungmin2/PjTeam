import React, { Component } from "react";
import { Button, IconButton,Table, TableHead, TableBody, TableRow, TableCell, Typography, Select, MenuItem, FormControl, Input,InputAdornment,TableFooter, Grid, Container, Tab, label } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import member from "../../../api/member";

class deleteMember extends Component{
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }
    }
    chkChange = (e) => {
        this.setState({ checked: e.target.checked })
    }

    nextButton = () => {
        if (this.state.checked) {
            member.memberdelete(window.localStorage.getItem("id"))
            .then(res => {
                this.props.history.push("/main");
            })    
        }
        else {
            alert("약관에 동의하세요.");
        }
    }
    render() {
        const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
        return (
            <div align='center'>
                <form>
                    <br />
                    <Typography variant="h4">
                        서비스해지
                    </Typography>
                    <br /><br />
                    <Table style={{ width: '53vw' }}>
                        <TableHead style={{ width: '53vw' }}>
                            <TableRow>
                                <TableCell style={style} colSpan={4}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={tableBody}>
                            <TableRow>
                                <TableCell style={{ textAlign: 'left', color: 'red', padding: '30px' }}>
                                    주의 사항
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)', padding: '30px' }}>
                                   - 해지 시에는 전송요구가 철회되며 등록한 개인신용정보가 모두 삭제됩니다.(분쟁 및 민원 해결 등을 위한 최소 정보를 제외한 모든 정보 파기)<br/>
                                   - 서비스 해지로 인해 파기된 정보는 복구가 불가합니다.
                                   - 해지 당일에는 마이데이터 서비스를 다시 가입하실 수 없습니다.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        
                    </Table>
                    <br />
                    <div>

                        <span style={{ color: "red", fontSize: '20px' }}>※ 필수</span> <span style={{ color: "black", fontSize: '18px' }}>주의사항을 확인하였으며, 이에 동의합니다.</span>
                        <Checkbox
                            {...label}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            checked={this.state.checked}
                            onChange={this.chkChange}
                        />
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow style={style}>
                                <TableCell style={{ border: 'none' }}>
                                    <button type="button" className="btn btn-primary btn-block md-3" style={button}  onClick={this.nextButton}>확인</button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>

                    <br /><br />
                    <br />
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
    textAlign: 'left',
    fontSize: '17px',
    margin: '20px',
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(135deg, #0074D9, #00A8E8, #0074D9) 1',
    width: '53vw'
}

const tableStyle = {
    width: '50vw',
    marginBottom: '30px'
};

const tableHead = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
};

export default deleteMember;