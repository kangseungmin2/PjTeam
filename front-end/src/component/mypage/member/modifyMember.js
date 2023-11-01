import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl, MenuItem, Select } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import member from "../../../api/member"

class modifyMember extends Component{
    constructor(props){
        super(props);
        
        this.state ={
            id : '',
            name : '',
            residentRegistrationNumber: '',
            address :'',
            hp :'',
            job :'',
            email:''
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    componentDidMount(){
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
                    residentRegistrationNumber : member.residentRegistrationNumber,
                    address : member.address,
                    hp : member.hp,
                    job : member.job,
                    email : member.email
                })
            })
            .catch(err => {
                console.log("memberInfo() Error !",err)
            })
    }
    memberEdit = () =>{
        let id = window.localStorage.getItem("id")
        let inputData = {
            id : this.state.id,
            name : this.state.name,
            residentRegistrationNumber : this.state.residentRegistrationNumber,
            address : this.state.address,
            hp : this.state.hp,
            job : this.state.job,
            email : this.state.email
        }
        member.memberEdit(inputData)
            .then(res =>{
                console.log('성공:',res.data);
                alert("수정성공")
                this.props.history.push("/memberInfo")
            })
           .catch(err =>{
                console.log('memberEdit 에러!!',err);
           })
    }
    render(){
        return(
            <Container component="main" maxWidth="md">

            <PaidOutlinedIcon fontSize='large' color='primary' />
            <Typography variant="h4" style={style} spacing={2}> 내정보 </Typography><br />

            <Grid container spacing={2}>
                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                    <Input
                        id="standard-required"
                        endAdornment={<InputAdornment position="end">아이디</InputAdornment>}
                        aria-describedby="standard-loanProductName-helper-text"
                        inputProps={{
                            'aria-label': 'id',
                        }}
                        name="id"
                        value={this.state.id}
                        disabled
                    />
                    <FormHelperText >id</FormHelperText>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                    <Input
                        id="standard-required"
                        endAdornment={<InputAdornment position="end">이름</InputAdornment>}
                        aria-describedby="standard-interestRate-helper-text"
                        inputProps={{
                            'aria-label': 'name',
                        }}
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <FormHelperText >name</FormHelperText>
                </FormControl>


                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                    <Input
                        id="standard-required"
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-minMoney-helper-text"
                        inputProps={{
                            'aria-label': 'residentRegistrationNumber',
                        }}
                        name="residentRegistrationNumber"
                        value={this.state.residentRegistrationNumber}
                        type="password"
                        onChange={this.onChange}
                        disabled
                    />
                    <FormHelperText >주민번호</FormHelperText>
                </FormControl>



                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                    <Input
                        id="standard-required"
                        endAdornment={<InputAdornment position="end">+82</InputAdornment>}
                        aria-describedby="standard-maxMoney-helper-text"
                        inputProps={{
                            'aria-label': 'hp',
                        }}
                        name="hp"
                        value={this.state.hp}
                        onChange={this.onChange}
                    />
                    <FormHelperText >번호</FormHelperText>
                </FormControl>


                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                    <Input
                        id="standard-required"
                        endAdornment={<InputAdornment position="end">이메일</InputAdornment>}
                        aria-describedby="standard-minPeriod-helper-text"
                        inputProps={{
                            'aria-label': 'email',
                        }}
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    <FormHelperText >이메일</FormHelperText>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                    <Input
                        id="standard-required"
                        endAdornment={<InputAdornment position="end">주소</InputAdornment>}
                        aria-describedby="standard-minPeriod-helper-text"
                        inputProps={{
                            'aria-label': 'address',
                        }}
                        name="address"
                        value={this.state.address}
                        onChange={this.onChange}
                    />
                    <FormHelperText >주소</FormHelperText>
                </FormControl>
            </Grid>
            <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="contained" onClick={this.memberEdit}>수정</Button>
                    <Button href="/main" variant="outlined" color="primary">back</Button>
            </Stack>
            </Container>
        );
    }
}
const style = {
    display: 'flex',
    justifyContent: 'center'
}
export default modifyMember;