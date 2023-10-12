import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl, MenuItem, Select } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from '../../../ApiService';


class LoanProductEdit extends Component {

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
    componentDidMount() {
        this.loadLoanDetail();
    }

    // 수정전 상세페이지 호출
    loadLoanDetail = () => {
        ApiService.fetchLoanByNum(window.localStorage.getItem("LoanNum"))
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
            .catch(err => {
                console.log('loadLoanDetail() Error!!', err);
            });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    editProduct = (e) => {
        e.preventDefault();
    
        const confirmEdit = window.confirm("수정하시겠습니까?"); // 수정 여부를 묻는 알림창
    
        if (confirmEdit) {
            let inputData = {
                num: this.state.num,
                loanProductName: this.state.loanProductName,
                loanProductRegistrationDate: this.state.loanProductRegistrationDate,
                interestRate: this.state.interestRate,
                content: this.state.content,
                minMoney: this.state.minMoney,
                maxMoney: this.state.maxMoney,
                minPeriod: this.state.minPeriod,
                maxPeriod: this.state.maxPeriod,
                repayment: this.state.repayment,
                commission: this.state.commission
            }
    
            ApiService.editLoan(inputData)
                .then(res => {
                    console.log('editLoan 성공', res.data);
                    this.props.history.push('/loanProductList');
                })
                .catch(err => {
                    console.log('editLoan 에러', err);
                })
        } else {
            // 취소를 클릭한 경우, 수정 페이지에 그대로 남기
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> Edit Loan Product </Typography><br />

                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-loanProductName-helper-text"
                            inputProps={{
                                'aria-label': 'loanProductName',
                            }}
                            name="loanProductName"
                            value={this.state.loanProductName}
                            onChange={this.onChange}
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
                            name="interestRate"
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
                            aria-describedby="standard-minMoney-helper-text"
                            inputProps={{
                                'aria-label': 'minMoney',
                            }}
                            name="minMoney"
                            value={this.state.minMoney}
                            onChange={this.onChange}
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
                            name="maxMoney"
                            value={this.state.maxMoney}
                            onChange={this.onChange}
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
                            name="minPeriod"
                            value={this.state.minPeriod}
                            onChange={this.onChange}
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
                            name="maxPeriod"
                            value={this.state.maxPeriod}
                            onChange={this.onChange}
                        />
                        <FormHelperText >maxPeriod</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Select
                            labelId="repayment-label"
                            id="repayment"
                            name="repayment"
                            value={this.state.repayment}
                            onChange={this.onChange}
                        >
                            <MenuItem value={"만기일시상환"}>만기일시상환</MenuItem>
                            <MenuItem value={"원리금균등상환"}>원리금균등상환</MenuItem>
                            <MenuItem value={"원금균등상환"}>원금균등상환</MenuItem>
                        </Select>
                        <FormHelperText>repayment</FormHelperText>
                    </FormControl>

                    {/* <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-repayment-helper-text"
                            inputProps={{
                                'aria-label': 'repayment',
                            }}
                            name="repayment"
                            value={this.state.repayment}
                            onChange={this.onChange}
                        />
                        <FormHelperText >repayment</FormHelperText>
                    </FormControl> */}

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="standard-commission-helper-text"
                            inputProps={{
                                'aria-label': 'commission',
                            }}
                            name="commission"
                            value={this.state.commission}
                            onChange={this.onChange}
                        />
                        <FormHelperText >commission</FormHelperText>
                    </FormControl>
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="contained" onClick={this.editProduct}>edit</Button>
                    <Button href="/loanProductList" variant="outlined" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default LoanProductEdit;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
