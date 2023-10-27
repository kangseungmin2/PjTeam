import React, { Component } from "react";
import { TextField ,Table, TableHead, TableRow, TableCell, Typography, Select, MenuItem, FormControl, Input,InputAdornment, Grid } from "@mui/material";

import utility from "../../api/utility";


const type = ['지로/생활요금/기타', '지방세/등록금', '국고/관세', '연금/보험료'];



class payChk extends Component{
    constructor(props){
        super(props);

        this.state = {
            checked: false,
            data: [],
            utilityType:'',
            selectedType: '',
            utilityId:''
        }
    }
    onChange =(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onChangeType = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        },()=>{
            if(this.state.selectedType === '지로/생활요금/기타'){
                this.setState({utilityType : 'a'},()=>{
                    console.log(this.state.utilityType)
                })
            }
            else if(this.state.selectedType === '지방세/등록금'){
                this.setState({utilityType : 'b'},()=>{
                    console.log(this.state.utilityType)
                })
            }
            else if(this.state.selectedType ==='국고/관세'){
                this.setState({utilityType : 'c'},()=>{
                    console.log(this.state.utilityType)
                })
            }
            else {
                this.setState({utilityType : 'd'},()=>{
                    console.log(this.state.utilityType)
                })
            }
        });
    }
    handleTypeChange = (event) => {
        this.setState({ selectedType: event.target.value });
    };

    nextButton = () => {
        utility.utilityCheck(this.state.utilityType,this.state.utilityId)
            .then(res => {
                if (this.state.utilityType === 'a' && res.data !== '') {
                    console.log("지로/생활요금/기타",res.data)
                    window.localStorage.setItem("utilityId",this.state.utilityId)
                    this.props.history.push("/giroPay");
                }
                else if (this.state.utilityType === 'b' && res.data !== '') {
                    console.log("지방세/등록금")
                    window.localStorage.setItem("utilityId",this.state.utilityId)
                    this.props.history.push("/localtaxPay");
                }
                else if (this.state.utilityType === 'c' && res.data !== '') {
                    console.log("국고/관세")
                    window.localStorage.setItem("utilityId",this.state.utilityId)
                    this.props.history.push("/dutyPay");
                }
                else if (this.state.utilityType === 'd' && res.data !== '') {
                    console.log("연금/보험료")
                    window.localStorage.setItem("utilityId",this.state.utilityId)
                    this.props.history.push("/pensionPay");
                }
                else{
                    alert('납부번호 정보가 잘못되었습니다.');
                }
            })
        
    }
    render() {
            return(
                <div align='center'>
            <form>
                <br />
                <Typography variant="h4">
                    공과금 조회
                </Typography>
                <br /><br />
                <Table style={{ width: '53vw' }}>
                 <Typography style={typography}>
                    납부번호 입력
                </Typography>
                <Table style={tableStyle}>
                        <TableRow>
                            <TableCell style={tableHead}>
                                공과금 종류
                            </TableCell>
                            <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                    <Select
                                        labelId="accountNum-label"
                                        id="selectedTypeInput"
                                        name="selectedType"
                                        value={this.state.selectedType}
                                        onChange={this.onChangeType}
                                    >
                                        {type.map((item, index) => (
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell style={tableHead}>
                                전자납부번호
                            </TableCell>
                            <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    label="utilityId"
                                    type="text"
                                    name="utilityId"
                                    value={this.state.utilityId}
                                    placeholder="Input utilityId"
                                    onChange={this.onChange}
                                />
                                </FormControl>
                            </TableCell>
                        </TableRow>  
                </Table>
                </Table>
                <Table>
                        <TableHead>
                            <TableRow style={style}>
                                <TableCell style={{ border: 'none' }}>
                                    <button type="button" className="btn btn-primary btn-block md-3" style={button} onClick={this.nextButton}>확인</button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>

                    <br /><br />
                </form>
                <br />
                </div>
            );
    }
}
const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const tableStyle = {
    width: '50vw',
    marginBottom: '30px'
};

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

const tableHead = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
};
export default payChk;