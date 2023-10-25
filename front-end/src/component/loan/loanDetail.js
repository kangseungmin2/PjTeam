import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LoanApi from "../../api/loan";


class LoanDetail extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            num:'',
            loanProductName: '',
            loanProductRegistrationDate: '',
            interestRate: '',
            contentTitle:'',
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

    componentDidMount() {
        this.loadLoanDetail();
    }

    // 상세페이지 호출
    loadLoanDetail = () =>{
        LoanApi.fetchDetailByNum(window.localStorage.getItem("LoanNum"))
            .then(res => {
                let loan = res.data;
                this.setState({
                    num: loan.num,
                    loanProductName: loan.loanProductName,
                    loanProductRegistrationDate: loan.loanProductRegistrationDate,
                    interestRate: loan.interestRate,
                    contentTitle: loan.contentTitle,
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
                            disabled
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
                            disabled
                        />
                        <FormHelperText >interestRate</FormHelperText>
                    </FormControl>

                    <TextField sx={{ m: 2, width: '93ch' }}
                        required
                        id="sandard-required"
                        variant="standard"
                        multiline
                        fullWidth
                        rows={4}
                        label="contentTitle"
                        // helperText="please enter content"
                        type="text"
                        name="contentTitle"
                        value={this.state.contentTitle}
                        disabled
                        placeholder="contentTitle"
                        onChange={this.onChange} /><br />

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
                            disabled
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
                            disabled
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
                            disabled
                        />
                        <FormHelperText >maxMoney</FormHelperText>
                    </FormControl>
                    

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">년</InputAdornment>}
                            aria-describedby="standard-minPeriod-helper-text"
                            inputProps={{
                                'aria-label': 'minPeriod',
                            }}
                            value={this.state.minPeriod}
                            disabled
                        />
                        <FormHelperText >minPeriod</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">년</InputAdornment>}
                            aria-describedby="standard-maxPeriod-helper-text"
                            inputProps={{
                                'aria-label': 'maxPeriod',
                            }}
                            value={this.state.maxPeriod}
                            disabled
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
                            disabled
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
                            disabled
                        />
                        <FormHelperText >commission</FormHelperText>
                    </FormControl>
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="contained" onClick={() => this.signLoan(this.state.num)}>sign</Button>
                    <Button href="/loanList" variant="outlined" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default LoanDetail;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
