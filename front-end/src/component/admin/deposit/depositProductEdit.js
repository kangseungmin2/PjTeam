import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import deposit from "../../../api/deposit";


class depositProductEdit extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            yeName: '',
            yeRegistrationDate: '',
            interestRate: '',
            yeSummary: '',
            yeMinPrice: '',   
            yeMaxPrice: '',
            yeMinDate: '',
            yeMaxDate: '',                
            message: ''
        }
    }
    componentDidMount(){
        this.loadDepositDetail();
    }

    // 수정전 상세페이지 호출
    loadDepositDetail = () =>{
        deposit.fetchDepositByNum(window.localStorage.getItem("DepositNum"))
            .then(res => {
                let deposit = res.data;
                this.setState({
                    yeNo: deposit.yeNo,
                    yeName: deposit.yeName,
                    yeRegistrationDate: deposit.yeRegistrationDate,
                    interestRate: deposit.interestRate,
                    yeSummary: deposit.yeSummary,
                    yeMinPrice: deposit.yeMinPrice,     
                    yeMaxPrice: deposit.yeMaxPrice,
                    yeMinDate: deposit.yeMinDate,
                    yeMaxDate: deposit.yeMaxDate,                                         
                })
            })
            .catch(err =>{
                console.log('loadDepositDetail() Error!!', err);
            });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    editProduct = (e) => {
        // save후 reload방지
         e.preventDefault();

        const confirmEdit = window.confirm("수정하시겠습니까?"); //수정여부 알림창

    if(confirmEdit){
        let inputData = {
            yeNo: this.state.yeNo,
            yeName: this.state.yeName,
            yeRegistrationDate: this.state.yeRegistrationDate,
            interestRate: this.state.interestRate,
            yeSummary: this.state.yeSummary,
            yeMinPrice: this.state.yeMinPrice,
            yeMaxPrice: this.state.yeMaxPrice,
            yeMinDate: this.state.yeMinDate,
            yeMaxDate: this.state.yeMaxDate,                    
        }

        deposit.editDeposit(inputData)
            .then(res => {
                console.log('editDeposit 성공', res.data);
                this.props.history.push('/depositProductList');
            })
            .catch(err => {
                console.log('editDeposit 에러', err);
            })
        } else {
            // 취소클릭, 수정페이지에 그대로남기
        }   
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> Edit Deposit Product </Typography><br />

                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-yeName-helper-text"
                            inputProps={{
                                'aria-label': 'yeName',
                            }}
                            name = "yeName"
                            value={this.state.yeName}
                            onChange={this.onChange}
                        />
                        <FormHelperText >depositProductName</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="standard-interestRate-helper-text"
                            inputProps={{
                                'aria-label': 'interestRate',
                            }}
                            name = "interestRate"
                            value={this.state.interestRate}
                            onChange={this.onChange}
                        />
                        <FormHelperText >interestRate</FormHelperText>
                    </FormControl>

                        <TextField sx={{ m: 2, mt: 2, width: '93ch' }}
                            required
                            id="sandard-required"
                            variant="standard"
                            multiline
                            fullWidth
                            rows={4}
                            label="yeSummary"
                            // helperText="please enter yeSummary"
                            type="text"
                            name="yeSummary"
                            value={this.state.yeSummary}
                            placeholder="yeSummary"
                            onChange={this.onChange} /><br />

                
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-yeMinPrice-helper-number"
                            inputProps={{
                                'aria-label': 'yeMinPrice',
                            }}
                            name="yeMinPrice"
                            value={this.state.yeMinPrice}
                            onChange={this.onChange}
                        />
                        <FormHelperText >MinPrice</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-yeMaxPrice-helper-number"
                            inputProps={{
                                'aria-label': 'yeMaxPrice',
                            }}
                            name="yeMaxPrice"
                            value={this.state.yeMaxPrice}
                            onChange={this.onChange}
                        />
                        <FormHelperText >MaxPrice</FormHelperText>
                    </FormControl>
                    

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">년</InputAdornment>}
                            aria-describedby="standard-yeMinDate-helper-number"
                            inputProps={{
                                'aria-label': 'yeMinDate',
                            }}
                            name="yeMinDate"
                            value={this.state.yeMinDate}
                            onChange={this.onChange}
                        />
                        <FormHelperText >MinDate</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">년</InputAdornment>}
                            aria-describedby="standard-yeMaxDate-helper-number"
                            inputProps={{
                                'aria-label': 'yeMaxDate',
                            }}
                            name="yeMaxDate"
                            value={this.state.yeMaxDate}
                            onChange={this.onChange}
                        />
                        <FormHelperText >MaxDate</FormHelperText>
                    </FormControl>

                    
                   
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="outlined" onClick={this.editProduct}>edit</Button>
                    <Button href="/depositProductList" variant="contained" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default depositProductEdit;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
