import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from '../../api/savings';


class savingsDetail extends Component {

    constructor(props) {
        super(props);
        // staate에 초기화
        this.state = {
            juckName: '',
            juckRegistrationDate: '',
            interestRate: '',          
            juckSummary: '', 
            juckType: '',          
            juckMinPrice: '',
            juckMaxPrice: '', 
            juckMinDate: '',         
            juckMaxDate: '',       
            message: ''
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadSavingsDetail();
    }

    // 상세페이지 호출
    loadSavingsDetail = () =>{
        ApiService.fetchsavingsDetailByNum(window.localStorage.getItem("SavingsNum"))
            .then(res => {
                let savings = res.data;
                this.setState({
                    juckNo: savings.juckNo,
                    juckName: savings.juckName,
                    juckRegistrationDate: savings.juckRegistrationDate,
                    interestRate: savings.interestRate,
                    juckSummary: savings.juckSummary,  
                    juckType: savings.juckType,              
                    juckMinPrice: savings.juckMinPrice,
                    juckMaxPrice: savings.juckMaxPrice,
                    juckMinDate: savings.juckMinDate,
                    juckMaxDate: savings.juckMaxDate,                   
                })
            })
            .catch(err =>{
                console.log('fetchsavingsDetailByNum() Error!!', err);
            });
    }

    // sign
    signSavings = (juckNo) => {
        window.localStorage.setItem("SavingsNum", juckNo);
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
                            aria-describedby="standard-juckName-helper-text"
                            inputProps={{
                                'aria-label': 'juckName',
                            }}                           
                            value={this.state.juckName}
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
                            label="juckSummary"
                            // helperText="please enter juckSummary"
                            type="text"
                            name="juckSummary"
                            value={this.state.juckSummary}
                            disabled
                            placeholder="content"/><br />

                       

                
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-juckMinPrice-helper-text"
                            inputProps={{
                                'aria-label': 'juckMinPrice',
                           }}                         
                            value={this.state.juckMinPrice}
                            disabled
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
                            value={this.state.juckMaxPrice}
                            disabled
                        />
                        <FormHelperText >MaxPrice</FormHelperText>
                    </FormControl>
                    

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">개월</InputAdornment>}
                            aria-describedby="standard-juckMinDate-helper-text"
                            inputProps={{
                                'aria-label': 'juckMinDate',
                            }}                          
                            value={this.state.juckMinDate}
                            disabled
                        />
                        <FormHelperText >MinDate</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">개월</InputAdornment>}
                            aria-describedby="standard-juckMaxDate-helper-text"
                            inputProps={{
                                'aria-label': 'juckMaxDate',
                            }}                           
                            value={this.state.juckMaxDate}
                            disabled
                        />
                        <FormHelperText >MaxDate</FormHelperText>
                    </FormControl>  

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-juckType-helper-text"
                            inputProps={{
                                'aria-label': 'juckType',
                            }}                         
                            value={this.state.juckType}
                            disabled
                        />
                        <FormHelperText >type</FormHelperText>
                    </FormControl>                  
                   
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="outlined" onClick={this.signSavings}>sign</Button>
                    <Button href="/savingsList" variant="contained" color="primary">back</Button>
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
