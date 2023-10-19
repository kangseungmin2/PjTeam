import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import deposit from '../../../api/deposit';


class depositProductAdd extends Component {

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

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveProduct = (e) => {
        // save후 reload방지
        e.preventDefault();

        let inputData = {
            yeName: this.state.yeName,
            yeRegistrationDate: this.state.yeRegistrationDate,
            interestRate: this.state.interestRate,
            yeSummary: this.state.yeSummary,
            yeMinPrice: this.state.yeMinPrice,
            yeMaxPrice: this.state.yeMaxPrice,
            yeMinDate: this.state.yeMinDate,
            yeMaxDate: this.state.yeMaxDate         
        }

        deposit.addDeposit(inputData)
            .then(res => {
                console.log('addDeposit 성공', res.data);
                this.props.history.push('/DepositProductList');
            })
            .catch(err => {
                console.log('addLoan 에러', err);
            })
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> Add Deposit Product </Typography><br />

                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-yeName-helper-text"
                            inputProps={{
                                'aria-label': 'yeName',
                            }}
                            name="yeName"
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
                            label="yeSummary"
                            // helperText="please enter yeSummary"
                            type="text"
                            name="yeSummary"
                            value={this.state.yeSummary}
                            placeholder="content"
                            onChange={this.onChange} /><br />

                
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-yeMinPrice-helper-text"
                            inputProps={{
                                'aria-label': 'yeMinPrice',
                            }}
                            name="yeMinPrice"
                            onChange={this.onChange}
                        />
                        <FormHelperText >MinPrice</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-yeMaxPrice-helper-text"
                            inputProps={{
                                'aria-label': 'yeMaxPrice',
                            }}
                            name="yeMaxPrice"
                            onChange={this.onChange}
                        />
                        <FormHelperText >MaxPrice</FormHelperText>
                    </FormControl>
                    

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">개월</InputAdornment>}
                            aria-describedby="standard-yeMinDate-helper-text"
                            inputProps={{
                                'aria-label': 'yeMinDate',
                            }}
                            name="yeMinDate"
                            onChange={this.onChange}
                        />
                        <FormHelperText >MinDate</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">개월</InputAdornment>}
                            aria-describedby="standard-yeMaxDate-helper-text"
                            inputProps={{
                                'aria-label': 'yeMaxDate',
                            }}
                            name="yeMaxDate"
                            onChange={this.onChange}
                        />
                        <FormHelperText >MaxDate</FormHelperText>
                    </FormControl> 

                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="outlined" onClick={this.saveProduct}>save</Button>
                    <Button href="/depositProductList" variant="contained" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default depositProductAdd;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
