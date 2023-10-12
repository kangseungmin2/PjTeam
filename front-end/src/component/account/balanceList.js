import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from '../../ApiService';


class balanceList extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            loanProductName: '',
            loanProductRegistrationDate: '',
            interestRate: '',
            content: '',
            minMoney: '',
            maxMoney: '',
            minPeriod: '',
            maxPeriod: '',
            repayment: '',
            commission: '',
            message: ''
        }
    }

    // 상세페이지 호출
    loadLoanDetail = () =>{
        ApiService.fetchDetailByNum(window.localStorage.getItem("loanNum"))
            .then(res => {
                let loan = res.data;
                this.setState({
                    num: loan.num,
                    loanProductName: loan.loanProductName,
                    loanProductRegistrationDate: loan.loanProductRegistrationDate,
                    interestRate: loan.interestRate,
                    content: loan.content,
                    minMoney: loan.minMoney,
                    maxMoney: loan.maxMoney,
                    minPeriod: loan.minPeriod,
                    maxPeriod: loan.maxPeriod,
                    repayment: loan.repayment,
                    commission: loan.commission,
                })
            })
            .catch(err =>{
                console.log('loadLoanDetail() Error!!', err);
            });
    }

    // sign
    signLoan = (num) => {
        window.localStorage.setItem("LoanNum", num);
        this.props.history.push("/loanSign")
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> Loan Product Detail </Typography><br />

                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-loanProductName-helper-text"
                            inputProps={{
                                'aria-label': 'loanProductName',
                            }}
                            value={this.state.loanProductName}
                        />
                        <FormHelperText >loanProductName</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="standard-interestRate-helper-text"
                            inputProps={{
                                'aria-label': 'interestRate',
                            }}
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
                            aria-describedby="standard-minMoney-helper-text"
                            inputProps={{
                                'aria-label': 'minMoney',
                            }}
                            value={this.state.minMoney}
                        />
                        <FormHelperText >minMoney</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-maxMoney-helper-text"
                            inputProps={{
                                'aria-label': 'maxMoney',
                            }}
                            value={this.state.maxMoney}
                        />
                        <FormHelperText >maxMoney</FormHelperText>
                    </FormControl>
                    

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">개월</InputAdornment>}
                            aria-describedby="standard-minPeriod-helper-text"
                            inputProps={{
                                'aria-label': 'minPeriod',
                            }}
                            value={this.state.minPeriod}
                        />
                        <FormHelperText >minPeriod</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">개월</InputAdornment>}
                            aria-describedby="standard-maxPeriod-helper-text"
                            inputProps={{
                                'aria-label': 'maxPeriod',
                            }}
                            value={this.state.maxPeriod}
                        />
                        <FormHelperText >maxPeriod</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-repayment-helper-text"
                            inputProps={{
                                'aria-label': 'repayment',
                            }}
                            value={this.state.repayment}
                        />
                        <FormHelperText >repayment</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="standard-commission-helper-text"
                            inputProps={{
                                'aria-label': 'commission',
                            }}
                            value={this.state.commission}
                        />
                        <FormHelperText >commission</FormHelperText>
                    </FormControl>
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="outlined" onClick={this.signLoan}>sign</Button>
                    <Button href="/loanList" variant="contained" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default balanceList;