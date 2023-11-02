import React, { Component } from "react";
import { Button, TextField , Table, TableRow, TableCell, Typography, FormControl} from "@mui/material";
import ApiService from "../../ApiService.js"
import member from "../../api/member"

class openAccount extends Component{
    constructor(props){
        super(props);

        this.state ={
            accountNum:'',
            id:'',
            hp:'',
            address:'',
            accountPW:'',
            accountLimit:''
        }
    }
    componentDidMount() {
        this.memberInfo();
    }

    memberInfo = () =>{
        let id = window.localStorage.getItem("id")
        member.memberInfo(id)
            .then(res =>{
                let member = res.data;
                this.setState({
                    id : member.id,
                    name : member.name,
                    address: member.address,
                    hp : member.hp,
                    email : member.email
                })
            })
            .catch(err => {
                console.log("memberInfo() Error !",err)
            })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    saveAccount = (e) => {
        e.preventDefault();
        let inputData = {
            accountNum: this.state.accountNum,
            id: this.state.id,
            accountPW: this.state.accountPW,
            accountLimit: this.state.accountLimit
        }
        ApiService.accountOpen(inputData)
            .then(res => {
                console.log('성공 :' , res.data);
                alert("계좌개설 성공~"); 
                this.props.history.push("/openSuccess");
            })
            .catch(err => {
                console.log('에러!!:'+err);
            })
    }
    render(){
        return(
            <div align='center'>
                <br /><br />
                <Typography variant="h4">계좌 개설</Typography>
                <Table style={{ width: '53vw' }}>
                    
                <Typography style={typography}/>
                    <Table style={tableStyle}>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    고객명
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                    <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    label="id"
                                    type="text"
                                    name="id"
                                    disabled
                                    value={this.state.id}
                                    placeholder="Input id"
                                    onChange={this.onChange}
                                /><br/> 
                                    </FormControl>
                                </TableCell>
                                <TableCell style={tableHead}>
                                    전화번호
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)' }}>
                                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                    <TextField
                                    required
                                    id="standard-required"
                                    variant="standard"
                                    label="hp"
                                    type="text"
                                    name="hp"
                                    disabled
                                    value={this.state.hp}
                                    placeholder="Input hp"
                                    onChange={this.onChange}
                                /><br/> 
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={tableHead}>
                                    사용자 주소
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)'}} colSpan={3}>
                                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '40ch' }}>
                                    <TextField
                                        required
                                        id="standard-required"
                                        variant="standard"
                                        label="address"
                                        type="text"
                                        name="address"
                                        disabled
                                        value={this.state.address}
                                        placeholder="Input address"
                                        onChange={this.onChange}
                                    /><br/>
                                    </FormControl>
                                </TableCell>
                            </TableRow> 
                            <TableRow>
                                <TableCell style={tableHead}>
                                    계좌 비밀번호 입력
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)'}} colSpan={3}>
                                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                    <TextField
                                        required
                                        id="standard-required"
                                        variant="standard"
                                        label="accountPW"
                                        type="password"
                                        name="accountPW"
                                        value={this.state.accountPW}
                                        placeholder="Input accountPW"
                                        onChange={this.onChange}
                                    /><br/>
                                    </FormControl>
                                </TableCell>
                            </TableRow>  
                            <TableRow>
                                <TableCell style={tableHead}>
                                    계좌 한도 입력
                                </TableCell>
                                <TableCell style={{ textAlign: 'left', border: '1px solid rgb(230, 229, 227)'}} colSpan={3}>
                                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '50ch' }}>
                                    <TextField
                                        required
                                        id="standard-required"
                                        variant="standard"
                                        label="accountLimit"
                                        type="text"
                                        name="accountLimit"
                                        value={this.state.accountLimit}
                                        placeholder="Input accountLimit"
                                        onChange={this.onChange}
                                    /><br/>
                                    </FormControl>
                                </TableCell>
                            </TableRow>  
                    </Table>
                </Table>
                
                <div>
                    <Button variant="contained" color="primary" onClick={this.saveAccount}>계좌 개설</Button>
                </div>
                <br/>
            </div>
            
        );
    }
   
}

const tableStyle = {
    // width: '50vw',
    marginBottom: '30px'
};


const typography = {
    textAlign: 'left',
    fontSize: '17px',
    margin: '20px',
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(135deg, #0074D9, #00A8E8, #0074D9) 1',
    // width: '53vw'
}

const tableHead = {
    border: '1px solid rgb(230, 229, 227)',
    textAlign: 'center',
    fontWeight: '700',
    backgroundColor: 'rgba(135, 206, 235, 0.2)'
};

export default openAccount;