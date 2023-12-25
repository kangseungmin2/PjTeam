import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from '../../ApiService';


class depositDetail extends Component {

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

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadDepositDetail();
    }

    // 상세페이지 호출
    loadDepositDetail = () =>{
        ApiService.fetchdepositDetailByNum(window.localStorage.getItem("depositNum"))
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
                console.log('fetchdepositDetailByNum() Error!!', err);
            });
    }

    // sign
    signDeposit = (num) => {
        window.localStorage.setItem("yNo", num);
        this.props.history.push("/depositSign")
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> deposit Product Detail </Typography><br />

                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-depositProductName-helper-text"
                            inputProps={{
                                'aria-label': 'depositProductName',
                            }}
                            name="depositProductName"
                            value={this.state.depositProductName}
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
                            name="interestRate"
                            value={this.state.interestRate}
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
                            placeholder="content"/><br />

                
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-MinPrice-helper-text"
                            inputProps={{
                                'aria-label': 'MinPrice',
                            }}
                            name="MinPrice"
                            value={this.state.MinPrice}
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
                        />
                        <FormHelperText >MaxDate</FormHelperText>
                    </FormControl>               
                   
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="outlined" onClick={this.signLoan}>sign</Button>
                    <Button href="/depositList" variant="contained" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default depositDetail;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
