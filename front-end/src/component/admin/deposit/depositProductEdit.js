import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from '../../../api/deposit';


class depositProductEdit extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            depositProductName: '',
            depositProductRegistrationDate: '',
            interestRate: '',
            content: '',
            MinPrice: '',
            MaxPrice: '',
            MinDate: '',
            MaxDate: '',
            message: ''
        }
    }
    componentDidMount(){
        this.loadDepositDetail();
    }

    // 수정전 상세페이지 호출
    loadDepositDetail = () =>{
        ApiService.fetchDepositByNum(window.localStorage.getItem("depositNum"))
            .then(res => {
                let deposit = res.data;
                this.setState({
                    num: deposit.yNo,
                    depositProductName: deposit.yName,
                    depositProductRegistrationDate: deposit.yRegistrationDate,
                    interestRate: deposit.interestRate,
                    content: deposit.ySummary,
                    MinPrice: deposit.yMinPrice,
                    MaxPrice: deposit.yMaxPrice,
                    MinDate: deposit.yMinDate,
                    MaxDate: deposit.yMaxDate,                   
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
            depositProductName: this.state.depositProductName,
            depositProductRegistrationDate: this.state.depositProductRegistrationDate,
            interestRate: this.state.interestRate,
            content: this.state.content,
            MinPrice: this.state.MinPrice,
            MaxPrice: this.state.MaxPrice,
            MinDate: this.state.MinDate,
            MaxDate: this.state.MaxDate,         
        }

        ApiService.editDeposit(inputData)
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
                            aria-describedby="standard-depositProductName-helper-text"
                            inputProps={{
                                'aria-label': 'depositProductName',
                            }}
                            name = "depositProductName"
                            value={this.state.depositProductName}
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
                            label="content"
                            // helperText="please enter content"
                            type="text"
                            name="content"
                            value={this.state.content}
                            placeholder="content"
                            onChange={this.onChange} /><br />

                
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-MinPrice-helper-text"
                            inputProps={{
                                'aria-label': 'minMinPriceMoney',
                            }}
                            name="MinPrice"
                            value={this.state.MinPrice}
                            onChange={this.onChange}
                        />
                        <FormHelperText >MinPrice</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-MaxPrice-helper-text"
                            inputProps={{
                                'aria-label': 'MaxPrice',
                            }}
                            name="MaxPrice"
                            value={this.state.MaxPrice}
                            onChange={this.onChange}
                        />
                        <FormHelperText >MaxPrice</FormHelperText>
                    </FormControl>
                    

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">개월</InputAdornment>}
                            aria-describedby="standard-MinDate-helper-text"
                            inputProps={{
                                'aria-label': 'MinDate',
                            }}
                            name="MinDate"
                            value={this.state.MinDate}
                            onChange={this.onChange}
                        />
                        <FormHelperText >MinDate</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">개월</InputAdornment>}
                            aria-describedby="standard-MaxDate-helper-text"
                            inputProps={{
                                'aria-label': 'MaxDate',
                            }}
                            name="MaxDate"
                            value={this.state.MaxDate}
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
