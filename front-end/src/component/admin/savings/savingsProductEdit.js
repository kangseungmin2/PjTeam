import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from '../../../ApiService';


class savingsProductEdit extends Component {

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
    componentDidMount(){
        this.loadSavingsDetail();
    }

    // 수정전 상세페이지 호출
    loadSavingsDetail = () =>{
        ApiService.fetchsavingsDetailByNum(window.localStorage.getItem("savingsNum"))
            .then(res => {
                let savings = res.data;
                this.setState({
                    num: savings.jNo,
                    savingsProductName: savings.jName,
                    savingsProductRegistrationDate: savings.jRegistrationDate,
                    interestRate: savings.interestRate,
                    content: savings.jSummary,
                    type: savings.jType,     
                    MinPrice: savings.jMinPrice,
                    MaxPrice: savings.jMaxPrice,
                    MinDate: savings.jMinDate,
                    MaxDate: savings.jMaxDate,                   
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
            savingsProductName: this.state.savingsProductName,
            savingsProductRegistrationDate: this.state.savingsProductRegistrationDate,
            interestRate: this.state.interestRate,
            content: this.state.content,
            MinPrice: this.state.MinPrice,
            MaxPrice: this.state.MaxPrice,
            MinDate: this.state.MinDate,
            MaxDate: this.state.MaxDate,         
        }

        ApiService.editSavings(inputData)
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
                            aria-describedby="standard-savingsProductName-helper-text"
                            inputProps={{
                                'aria-label': 'savingsProductName',
                            }}
                            name = "savingsProductName"
                            value={this.state.savingsProductName}
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
