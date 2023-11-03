import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Identity from '../deposit/identity';
import Agree from './agree';
import SignDetail, { send } from './signDetail';
import SavingsSignApi from "../../api/savingSign";

const steps = ['본인인증', '약관동의', '가입내용'];



class SavingsSign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      data:[],
      checked: false, // checkbox 상태를 추가,
      isButtonDisabled:false
    };
  }

  
  // 이 함수를 통해 checked 상태를 변경
  handleCheckboxChange = (e) => {
    this.setState({ checked: e.target.checked });
  };

  // sign insert하기위함
  handlesavingsDetailData = (data) => {
    this.setState({
      data : data
    });
    console.log(data)
  }


  handleNext = () => {
    if (this.state.activeStep === 1 && !this.state.checked) {
      // 약관동의 스텝이고 checkbox가 체크되지 않았을 때는 넘어가지 않음
      return;
    }
    this.setState({ activeStep: this.state.activeStep + 1 });
    if (this.state.activeStep === 2){
      const data = this.state.data;
      SavingsSignApi.addSavingsSign(data)
      .then(res => {
        console.log('addSign 성공', res.data);
    })
    .catch(err => {
        console.log('addSign 에러', err);
    })
    }
  };


  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };


  handle = (data) =>{
    this.setState({
      isButtonDisabled : data.isButtonDisabled
    })
    console.log(data)
  }
  
  render() {
    // getStepContent 함수를 클래스 내부로 이동
    const getStepContent = (step) => {
      switch (step) {
        case 0:
          return <Identity onDataHandle={this.handle}/>;
          case 1:
            return (
              <Agree
                checked={this.state.checked}
                onCheckboxChange={this.handleCheckboxChange} // 함수 전달
              />
            );
        case 2:
          return <SignDetail onDataHandle = {this.handlesavingsDetailData}/>;
        default:
          throw new Error('Unknown step');
      }
    };

    return (
      <React.Fragment>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={this.state.activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {this.state.activeStep === steps.length ? (
              <React.Fragment>
                <br />
                <Typography variant="h5" gutterBottom>
                  적금 신청이 <strong style={{ color: "orange" }}>정상적으로 접수</strong> 되었습니다.
                </Typography>
                <Typography variant="subtitle1">
                  <br /><br />
                  확인
                  <br /><br />
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(this.state.activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {this.state.activeStep !== 0 && (
                    <Button onClick={this.handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

              <Button
                variant="contained"
                onClick={this.handleNext}
                sx={{ mt: 3, ml: 1 }}
                // 약관동의 스텝에서만 체크되었을 때만 버튼 활성화
                disabled={
                  this.state.activeStep === 0
                    ? this.state.isButtonDisabled
                    : this.state.activeStep === 1
                    ? !this.state.checked
                    : false  // 기본적으로는 항상 활성화
                }
              >
                {this.state.activeStep === steps.length - 1 ? 'Request to join' : 'Next'}
              </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

export default SavingsSign;