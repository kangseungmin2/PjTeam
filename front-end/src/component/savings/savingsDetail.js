import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from '../../api/savings';


class savingsDetail extends Component {

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

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadSavingsDetail();
    }

    // 상세페이지 호출
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
                console.log('fetchsavingsDetailByNum() Error!!', err);
            });
    }

    // sign
    signSavings = (num) => {
        window.localStorage.setItem("SavingsNo", num);
        this.props.history.push("/savingsSign")
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> savings Product Detail </Typography><br />

                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-savingsProductName-helper-text"
                            inputProps={{
                                'aria-label': 'savingsProductName',
                            }}                           
                            value={this.state.savingsProductName}
                            disabled
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
                            value={this.state.interestRate}
                            disabled
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
                            disabled
                            placeholder="content"/><br />

                       

                
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-MinPrice-helper-text"
                            inputProps={{
                                'aria-label': 'MinPrice',
                           }}                         
                            value={this.state.MinPrice}
                            disabled
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
                            value={this.state.MaxPrice}
                            disabled
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
                            value={this.state.MinDate}
                            disabled
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
                            value={this.state.MaxDate}
                            disabled
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
                            value={this.state.type}
                            disabled
                        />
                        <FormHelperText >type</FormHelperText>
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
export default savingsDetail;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
