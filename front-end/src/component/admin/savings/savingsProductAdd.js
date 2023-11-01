import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import savings from '../../../api/savings';


class savingsProductAdd extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            juckName: '',
            juckRegistrationDate: '',
            interestRate: '',
            juckSummary: '',    
            juckMinPrice: '',
            juckMaxPrice: '',
            juckMinDate: '',
            juckMaxDate: '',
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
            juckName: this.state.juckName,
            juckRegistrationDate: this.state.juckRegistrationDate,
            interestRate: this.state.interestRate,
            juckSummary: this.state.juckSummary,          
            juckMinPrice: this.state.juckMinPrice,
            juckMaxPrice: this.state.juckMaxPrice,
            juckMinDate: this.state.juckMinDate,
            juckMaxDate: this.state.juckMaxDate         
        }

        savings.addSavings(inputData)
            .then(res => {
                console.log('addSavings 성공', res.data);
                this.props.history.push('/SavingsProductList');
            })
            .catch(err => {
                console.log('addLoan 에러', err);
            })
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> Add Savings Product </Typography><br />

                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-juckName-helper-text"
                            inputProps={{
                                'aria-label': 'juckName',
                            }}
                            name="juckName"
                            onChange={this.onChange}
                        />
                        <FormHelperText >savingsProductName</FormHelperText>
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
                            label="Summary"
                            // helperText="please enter juckSummary"
                            type="text"
                            name="juckSummary"
                            value={this.state.juckSummary}
                            placeholder="content"
                            onChange={this.onChange} /><br />

                
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-juckMinPrice-helper-text"
                            inputProps={{
                                'aria-label': 'juckMinPrice',
                            }}
                            name="juckMinPrice"
                            onChange={this.onChange}
                        />
                        <FormHelperText >MinPrice</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-juckMaxPrice-helper-text"
                            inputProps={{
                                'aria-label': 'juckMaxPrice',
                            }}
                            name="juckMaxPrice"
                            onChange={this.onChange}
                        />
                        <FormHelperText >MaxPrice</FormHelperText>
                    </FormControl>
                    

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">년</InputAdornment>}
                            aria-describedby="standard-juckMinDate-helper-text"
                            inputProps={{
                                'aria-label': 'juckMinDate',
                            }}
                            name="juckMinDate"
                            onChange={this.onChange}
                        />
                        <FormHelperText >MinDate</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">년</InputAdornment>}
                            aria-describedby="standard-juckMaxDate-helper-text"
                            inputProps={{
                                'aria-label': 'MaxjuckMaxDateDate',
                            }}
                            name="juckMaxDate"
                            onChange={this.onChange}
                        />
                        <FormHelperText >MaxDate</FormHelperText>
                    </FormControl> 

                    

                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="outlined" onClick={this.saveProduct}>save</Button>
                    <Button href="/savingsProductList" variant="contained" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default savingsProductAdd;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
