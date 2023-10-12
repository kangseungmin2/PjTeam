import React, { Component } from "react";
import { Table, MenuItem, TableBody, TableRow, TableCell, Typography, TableFooter, Select } from "@mui/material";




export default class lastFundAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectOption : []
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div align='center'>
                <Typography variant="h4">
                    Fund Account
                </Typography>

                <Typography style={typography}>
                    정보입력
                </Typography>

                <Table style={tableStyle}>
                    <TableBody style={tableBody}>
                        <TableRow>
                            <TableCell style={tableHead}>
                                계좌명
                            </TableCell>
                            <TableCell style={tableRow} colSpan={4}>
                                입출금 펀드계좌
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={tableHead}>
                                펀드유형 및 형태
                            </TableCell>
                            <TableCell style={tableRow}>
                                재간접 투자 / 개방형
                            </TableCell>
                            <TableCell style={tableHead}>
                                운용사
                            </TableCell>
                            <TableCell style={tableRow}>
                                우리은행
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table style={tableStyle}>
                    <TableBody style={tableBody}>
                        <TableRow>
                            <TableCell style={tableHead}>
                                신규계좌 비밀번호
                            </TableCell>
                            <TableCell style={tableRow}>
                                <input type="password" />
                            </TableCell>

                            <TableCell style={tableHead}>
                                비밀번호 확인
                            </TableCell>
                            <TableCell style={tableRow}>
                                <input type="password" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={tableHead} >
                                출금계좌
                            </TableCell>
                            <TableCell style={tableRow} colSpan={4}>
                                <Select
                                    // value={selectedOption}
                                    // onChange={handleChange}
                                    name="selectedOption"
                                    value={this.state.selectedOption}
                                    onChange={this.onChange}
                                    style={{width : '500px', height : '30px'}}
                                >
                                    <MenuItem value={"만기일시상환"}>만기일시상환</MenuItem>
                                    <MenuItem value={"원리금균등상환"}>원리금균등상환</MenuItem>
                                    <MenuItem value={"원금균등상환"}>원금균등상환</MenuItem>
                                </Select>

                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <TableFooter>
                    <TableRow style={style}>
                        <TableCell style={{ border: 'none' }}>
                            <button type="button" className="btn btn-primary btn-block md-3" style={button} onClick={this.nextButton}>계좌개설</button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </div>
        )
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

const typography = {
    textAlign: 'left',
    fontSize: '20px',
    margin: '20px',
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(135deg, #0074D9, #00A8E8, #0074D9) 1',
    width: '53vw'
}

const tableStyle = {
    width: '50vw',
    marginBottom: '70px'
};

const tableHead = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
};

const tableBody = {
    borderTop: '2px solid gray',
    borderBottom: '1px solid rgb(230, 229, 227)',
};

const tableRow = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center'
};