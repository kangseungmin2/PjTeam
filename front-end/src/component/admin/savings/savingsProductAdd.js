import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from '../../../api/savings';


class savingsProductAdd extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            savingsProductName: '',
            savingsProductRegistrationDate: '',
            interestRate: '',
            content: '',
            type: '', 
            MinPrice: '',
            MaxPrice: '',
            MinDate: '',
            MaxDate: '',
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
            jName: this.state.savingsProductName,
            jRegistrationDate: this.state.savingsProductRegistrationDate,
            interestRate: this.state.interestRate,
            jSummary: this.state.content,
            jType: this.state.type,
            jMinPrice: this.state.MinPrice,
            jMaxPrice: this.state.MaxPrice,
            jMinDate: this.state.MinDate,
            jMaxDate: this.state.MaxDate         
        }

        ApiService.addSavings(inputData)
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
                            aria-describedby="standard-savingsProductName-helper-text"
                            inputProps={{
                                'aria-label': 'savingsProductName',
                            }}
                            name="savingsProductName"
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
                                'aria-label': 'MinPrice',
                            }}
                            name="MinPrice"
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
                            onChange={this.MaxPrice}
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
                            onChange={this.MinDate}
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
                            onChange={this.MaxDate}
                        />
                        <FormHelperText >MaxDate</FormHelperText>
                    </FormControl> 

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-type-helper-text"
                            inputProps={{
                                'aria-label': 'type',
                            }}
                            name="type"
                            value={this.state.type}
                        />
                        <FormHelperText >type</FormHelperText>
                    </FormControl>     

                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="outlined" onClick={this.saveProduct}>save</Button>
                    <Button href="/savingsProductAdd" variant="contained" color="primary">back</Button>
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
