import * as React from 'react';
import { Typography, Button, Container, Copyright, Box, StepLabel, Step, Stepper, Paper } from "@mui/material";
import Identity from './identity';
import Agree from './agree';
import SignDetail from './signDetail';

const steps = ['본인인증', '약관동의', '상품 가입하기'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Identity />;
    case 1:
      return <Agree />;
    case 2:
      return <SignDetail />;
    default:
      throw new Error('Unknown step');
  }
}

export default function LoanSign() {

    const [activeStep, setActiveStep] = React.useState(0);
    

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                대출 신청 성공🎉
              </Typography>
              <Typography variant="subtitle1">
                관리자 승인이 남았습니다.
                승인까지 조금만 기다려 주세요!
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Request to Join' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
   
}
