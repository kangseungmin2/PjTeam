import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl, MenuItem, Select } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from '../../../ApiService';


class LoanProductAdd extends Component {

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

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveProduct = (e) => {
        // save후 reload방지
        e.preventDefault();

        let inputData = {
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

        ApiService.addLoan(inputData)
            .then(res => {
                console.log('addLoan 성공', res.data);
                this.props.history.push('/loanProductList');
            })
            .catch(err => {
                console.log('addLoan 에러', err);
            })
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> Add Loan Product </Typography><br />

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
                            onChange={this.onChange}
                        />
                        <FormHelperText >commission</FormHelperText>
                    </FormControl>
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="contained" onClick={this.saveProduct}>save</Button>
                    <Button href="/loanProductList" variant="outlined" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default LoanProductAdd;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
