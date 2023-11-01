import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import deposit from '../../api/deposit';


class depositDetail extends Component {

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

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 렌더링
    componentDidMount() {
        this.loadDepositDetail();
    }

    // 상세페이지 호출
    loadDepositDetail = () =>{
        deposit.fetchdepositDetailByNum(window.localStorage.getItem("DepositNum"))
            .then(res => {
                let deposit = res.data;
                this.setState({
                    yeNo: deposit.yeNo,
                    yeName: deposit.yeName,
                    yeRegistrationDate: deposit.yeRegistrationDate,
                    interestRate: deposit.interestRate,
                    yeSummary: deposit.yeSummary,                 
                    yeMinPrice: deposit.yeMinPrice,
                    yeMaxPrice: deposit.yeMaxPrice,
                    yeMinDate: deposit.yeMinDate,
                    yeMaxDate: deposit.yeMaxDate,                                      
                })
            })
            .catch(err =>{
                console.log('fetchdepositDetailByNum() Error!!', err);
            });
    }

    // sign
    signDeposit = (yeNo) => {
        window.localStorage.setItem("DepositNum", yeNo);
        this.props.history.push("/depositSign")
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> deposit Product Detail </Typography><br />

                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-yeName-helper-text"
                            inputProps={{
                                'aria-label': 'yeName',
                            }}                           
                            value={this.state.yeName}
                            disabled
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
                            label="Summary"
                            // helperText="please enter content"
                            type="text"
                            name="yeSummary"
                            value={this.state.yeSummary}
                            disabled
                            placeholder="content"/><br />

                
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-yeMinPrice-helper-text"
                            inputProps={{
                                'aria-label': 'yeMinPrice',
                            }}                          
                            value={this.state.yeMinPrice}
                            disabled
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
                            value={this.state.yeMaxPrice}
                            disabled
                        />
                        <FormHelperText >MaxPrice</FormHelperText>
                    </FormControl>
                    

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">년</InputAdornment>}
                            aria-describedby="standard-yeMinDate-helper-text"
                            inputProps={{
                                'aria-label': 'yeMinDate',
                            }}                        
                            value={this.state.yeMinDate}
                            disabled
                        />
                        <FormHelperText >MinDate</FormHelperText>
                    </FormControl>

                    
                    
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">년</InputAdornment>}
                            aria-describedby="standard-yeMaxDate-helper-text"
                            inputProps={{
                                'aria-label': 'yeMaxDate',
                            }}                         
                            value={this.state.yeMaxDate}
                            disabled
                        />
                        <FormHelperText >MaxDate</FormHelperText>
                    </FormControl>  
                    
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button color="primary" variant="outlined" onClick={this.signDeposit}>sign</Button>
                    <Button href="/depositList" variant="contained" color="primary">back</Button>
                </Stack>

            </Container>
        );
    }
}
export default depositDetail;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
