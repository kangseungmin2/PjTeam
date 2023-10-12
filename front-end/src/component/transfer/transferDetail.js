import React, { Component } from "react";
import { TextField, Typography, Button, Stack, Grid, Container, InputAdornment, Input, FormHelperText, FormControl } from "@mui/material";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ApiService from '../../ApiService';


class transferDetail extends Component {

    constructor(props) {
        super(props);
        // state에 초기화
        this.state = {
            transType: '',
            transAmount: '',
            transBalance: '',
            transDate: '',
            transDetail: ''
        }
    }

    // 상세페이지 호출
    transferDetail = () =>{
        ApiService.fetchDetailByNum(window.localStorage.getItem("tranNum"))
            .then(res => {
                let tran = res.data;
                this.setState({
                    num: tran.num,
                    transType: tran.transType,
                    transAmount: tran.transAmount,
                    transDate: tran.transDate,
                    transDetail: tran.transDetail,
                })
            })
            .catch(err =>{
                console.log('transferDetail() Error!!', err);
            });
    }

    // check
    checkTran = (num) => {
        window.localStorage.setItem("TranNum", num);
        this.props.history.push("/tranCheck")
    }

    render() {
        return (
            <Container component="main" maxWidth="md">

                <PaidOutlinedIcon fontSize='large' color='primary' />
                <Typography variant="h4" style={style} spacing={2}> 이체 상세 </Typography><br />

                <Grid container spacing={2}>
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-transType-helper-text"
                            inputProps={{
                                'aria-label': 'transType',
                            }}
                            value={this.state.transType}
                        />
                        <FormHelperText >이체명</FormHelperText>
                    </FormControl>

                        <TextField sx={{ m: 2, mt: 2, width: '93ch' }}
                            required
                            id="sandard-required"
                            variant="standard"
                            multiline
                            fullWidth
                            rows={4}
                            label="transDetail"
                            // helperText="please enter transDetail"
                            type="text"
                            name="transDetail"
                            value={this.state.transDetail}
                            placeholder="transDetail"/><br />

                
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end">원</InputAdornment>}
                            aria-describedby="standard-transAmount-helper-text"
                            inputProps={{
                                'aria-label': 'transAmount',
                            }}
                            value={this.state.transAmount}
                        />
                        <FormHelperText >이체금액</FormHelperText>
                    </FormControl>

                
                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-transBalance-helper-text"
                            inputProps={{
                                'aria-label': 'transBalance',
                            }}
                            value={this.state.transBalance}
                        />
                        <FormHelperText >잔액</FormHelperText>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '45ch' }}>
                        <Input
                            id="standard-required"
                            endAdornment={<InputAdornment position="end"></InputAdornment>}
                            aria-describedby="standard-transDate-helper-text"
                            inputProps={{
                                'aria-label': 'transDate',
                            }}
                            value={this.state.transDate}
                        />
                        <FormHelperText >이체날짜</FormHelperText>
                    </FormControl>
                </Grid>

                <Stack spacing={1} direction="row" justifyContent="center" marginTop={1}>
                    <Button href="/transferList" variant="contained" color="primary">확인</Button>
                </Stack>

            </Container>
        );
    }
}
export default transferDetail;

const style = {
    display: 'flex',
    justifyContent: 'center'
}
