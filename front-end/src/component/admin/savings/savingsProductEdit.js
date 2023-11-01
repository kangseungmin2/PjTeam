import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import savings from '../../../api/savings';


class savingsProductEdit extends Component {

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
    componentDidMount(){
        this.loadSavingsDetail();
    }

    // 수정전 상세페이지 호출
    loadSavingsDetail = () =>{
        savings.fetchSavingsByNum(window.localStorage.getItem("SavingsNum"))
            .then(res => {
                let savings = res.data;
                this.setState({
                    juckNo: savings.juckNo,
                    juckName: savings.juckName,
                    juckRegistrationDate: savings.juckRegistrationDate,
                    interestRate: savings.interestRate,
                    juckSummary: savings.juckSummary,                   
                    juckMinPrice: savings.juckMinPrice,
                    juckMaxPrice: savings.juckMaxPrice,
                    juckMinDate: savings.juckMinDate,
                    juckMaxDate: savings.juckMaxDate,                   
                })
            })
            .catch(err =>{
                console.log('loadSavingsDetail() Error!!', err);
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
            juckNo: this.state.juckNo,
            juckName: this.state.juckName,
            juckRegistrationDate: this.state.juckRegistrationDate,
            interestRate: this.state.interestRate,
            juckSummary: this.state.juckSummary,         
            juckMinPrice: this.state.juckMinPrice,
            juckMaxPrice: this.state.juckMaxPrice,
            juckMinDate: this.state.juckMinDate,
            juckMaxDate: this.state.juckMaxDate,         
        }

        savings.editSavings(inputData)
            .then(res => {
                console.log('editSavings 성공', res.data);
                this.props.history.push('/savingsProductList');
            })
            .catch(err => {
                console.log('editSavings 에러', err);
            })
        }else{
             // 취소클릭, 수정페이지에 그대로남기
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> Edit Savings Product </Typography><br />

                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-juckName-helper-text"
                            inputProps={{
                                'aria-label': 'juckName',
                            }}
                            name = "juckName"
                            value={this.state.juckName}
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
                            label="juckSummary"
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
                            value={this.state.juckMinPrice}
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
                            value={this.state.juckMaxPrice}
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
                            value={this.state.juckMinDate}
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
                                'aria-label': 'juckMaxDate',
                            }}
                            name="juckMaxDate"
                            value={this.state.juckMaxDate}
                            onChange={this.onChange}
                        />
                        <FormHelperText >MaxDate</FormHelperText>
                    </FormControl>

                    
                   
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="outlined" onClick={this.editProduct}>edit</Button>
                    <Button href="/savingsProductList" variant="contained" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default savingsProductEdit;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
