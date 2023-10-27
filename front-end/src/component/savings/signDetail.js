import React, { Component } from "react";
import {
  IconButton,
  Typography,
  Button,
  Stack,
  Grid,
  Container,
  InputAdornment,
  Input,
  FormHelperText,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import SavingsSignApi from "../../api/savingSign";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

class SignDetail extends Component {
  constructor(props) {
    super(props);
    // state에 초기화
    this.state = {
      juckSignNo: "",
      id: window.localStorage.getItem("id"),
      juckNo: "",
      savingsAccountNum: "",
      accountType: "j",
      accountNum: "",
      accountPW: "",
      juckAmount: "",
      juckMethod: "",
      juckJoinDate: "",
      juckEndDate: "",
      juckAutoDate: "선택없음",
      rate: "",
      interestRate: "",
      message: "",
      accountNumList: [],
      accountPWD: "",
      totalPaymentRound: "",
      totalRepayment: "",
      totalInterest: "",
      monthlyInterestRate: "",
      showPassword: false,
      isButtonDisabled: true,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleJoinDateChange = (e) => {
    const juckJoinDate = e.target.value;
    this.setState({ juckJoinDate });
    this.calculateMaturityDate(juckJoinDate, this.state.rate);
  };

  handleRateChange = (e) => {
    const rate = e.target.value;
    this.setState({ rate });
    this.calculateMaturityDate(this.state.juckJoinDate, rate);
  };

  handleJuckMethodChange = (e) => {
    this.setState({
      juckMethod: e.target.value,
    });
  };

  handleAutoDateChange = (e) => {
    this.setState({
      juckAutoDate: e.target.value,
    });
  };

  calculateMaturityDate = (juckJoinDate, rate) => {
    if (juckJoinDate && rate) {
      const startDate = new Date(juckJoinDate);
      const maturityDate = new Date(startDate);
      maturityDate.setFullYear(startDate.getFullYear() + parseInt(rate, 10)); // 수정 필요한 부분
      this.setState({ juckEndDate: maturityDate.toISOString().split("T")[0] });
    }
  };
  

  componentDidMount() {
    this.loadSavingsDetail();
    this.loadAccountNum();
  }

  loadSavingsDetail = () => {
    SavingsSignApi.fetchDetailByNum(window.localStorage.getItem("SavingsNum"))
      .then((res) => {
        let savings = res.data;
        this.setState({
          juckNo: savings.juckNo,
          juckName: savings.juckName,
          interestRate: savings.interestRate,
        });
      })
      .catch((err) => {
        console.log("loadSavingsDetail() Error!!", err);
      });
  };

  loadAccountNum = () => {
    const id = window.localStorage.getItem("id");
    SavingsSignApi.fetchAllAccounts(id)
      .then((res) => {
        const accounts = res.data;
        this.setState({ accountNumList: accounts });
      })
      .catch((err) => {
        console.log("계좌 목록 로딩 중 오류 발생:", err);
      });
  };

  pwCheck = (e) => {
    e.preventDefault();
    const id = window.localStorage.getItem("id");
    let inputData = {
      accountNum: this.state.accountNum,
      id: id,
    };

    SavingsSignApi.pwCheck(inputData)
      .then((res) => {
        const accountPWD = res.data;
        this.setState({ accountPWD: accountPWD });

        if (this.state.accountPW == this.state.accountPWD) {
          this.setState({ isButtonDisabled: false });
          window.alert("비밀번호가 일치. 계속 진행하세요.");
        } else {
          window.alert("비밀번호가 불일치. 확인하세요.");
        }
      })
      .catch((err) => {
        console.log("pwCheck 에러", err);
      });
  };

  calRepayment = (e) => {
    e.preventDefault();
    console.log("Button clicked");
  
    const juckMethod = this.state.juckMethod;
    console.log("juckMethod:", juckMethod);
  
    const juckAmount = parseFloat(this.state.juckAmount);
    console.log("juckAmount:", juckAmount);
  
    const rate = parseInt(this.state.rate);
    console.log("rate:", rate);
  
    const interestRate = parseFloat(this.state.interestRate) / 100;
    console.log("interestRate:", interestRate);
  
    if (juckAmount > 0 && rate > 0 && interestRate > 0) {
      let totalInterest = 0;
      let totalDeposits = 0;
  
      if (juckMethod === "정기납부") {
        console.log("juckMethod is 정기납부");
  
        // 정기납부에 대한 처리를 구현
        // 총입금액 계산 (juckAmount * rate)
        // 총이자 계산 (juckAmount * interestRate * rate)
        totalDeposits = juckAmount * rate;
        totalInterest = juckAmount * interestRate * rate;
        // 정기납부인 경우, 월별 납부일을 선택해서 납부할 수 있도록 구현
        // 사용자가 선택한 월별 납부일을 this.state.juckAutoDate에 저장
        // 여기에서 사용자가 월별 납부일을 선택하도록 UI를 구성해야 합니다.
        // this.state.juckAutoDate를 이용해 월별 납부를 구현할 수 있습니다.
      } else if (juckMethod === "자유납부") {
        console.log("juckMethod is 자유납부");
  
        // 자유납부에 대한 처리를 구현
        // 여기에 자유납부에 따른 계산식 추가
        // 사용자가 자유롭게 납부하는 방식에 따라 계산식이 달라질 수 있습니다.
        // 아래는 간단한 예시입니다.
        const monthlyPayments = this.calculateMonthlyPayments(juckAmount, rate, interestRate);
        totalDeposits = monthlyPayments.reduce((sum, payment) => sum + payment, 0);
        totalInterest = totalDeposits - juckAmount;
      }
  
      const totalRepayment = totalDeposits + totalInterest;
      this.setState({ totalRepayment, totalInterest });
  
      const juckJoinDate = this.state.juckJoinDate;
      const maturityDate = new Date(juckJoinDate);
      maturityDate.setFullYear(maturityDate.getFullYear() + rate);
      this.setState({ juckEndDate: maturityDate.toISOString().split("T")[0] });
    }
  };
  
  
  
  
  

  

  sendDataToParent = () => {
    const data = {
      id: window.localStorage.getItem("id"),
      juckNo: this.state.juckNo,
      accountType: "j",
      juckName: this.state.juckName,
      accountNum: this.state.accountNum,
      accountPW: this.state.accountPW,
      juckAmount: this.state.juckAmount,
      juckMethod: this.state.juckMethod,
      juckAutoDate: this.state.juckAutoDate,
      juckJoinDate: this.state.juckJoinDate,
      juckEndDate: this.state.juckEndDate,
      interestRate: this.state.interestRate,
      rate: parseInt(this.state.rate),
    };

    this.props.onDataHandle(data);
  };

  render() {
    return (
      <Container component="main" maxWidth="md">
        <br />
        <Grid container spacing={2}>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "50ch" }}>
            <Input
              id="savingsProductNameInput"
              aria-describedby="standard-juckName-helper-text"
              inputProps={{
                "aria-label": "juckName",
              }}
              name="juckName"
              value={this.state.juckName}
              disabled
            />
            <FormHelperText>savingsProductName</FormHelperText>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "23ch" }}>
            <Input
              id="interestRateInput"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              aria-describedby="standard-interestRate-helper-text"
              inputProps={{
                "aria-label": "interestRate",
              }}
              name="interestRate"
              value={this.state.interestRate}
              disabled
            />
            <FormHelperText>interestRate</FormHelperText>
          </FormControl>
        </Grid>
        <Typography variant="h5" style={style} spacing={2}>
          Sign Savings Product
        </Typography>
        <br />
        <Grid container spacing={2}>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "23ch" }}>
            <Select
              labelId="accountNum-label"
              id="accountNumInput"
              name="accountNum"
              value={this.state.accountNum}
              onChange={this.onChange}
            >
              {this.state.accountNumList.map((account) => (
                <MenuItem key={account.accountNum} value={account.accountNum}>
                  {account.accountNum}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>적금입금 계좌번호</FormHelperText>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "23ch" }}>
            <Input
              id="accountPWInput"
              type={this.state.showPassword ? "text" : "password"}
              name="accountPW"
              endAdornment={
                <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
              }
              onChange={this.onChange}
            />
            <FormHelperText>비밀번호</FormHelperText>
          </FormControl>
          <Grid container spacing={2}>
            <Button
              style={{ margin: "0 auto" }}
              color="primary"
              variant="outlined"
              onClick={this.pwCheck}
            >
              계좌확인
            </Button>
          </Grid>

          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "23ch" }}>
            <Input
              id="juckJoinDateInput"
              type="date"
              name="juckJoinDate"
              value={this.state.juckJoinDate}
              onChange={(e) => this.setState({ juckJoinDate: e.target.value })}
            />
            <FormHelperText>적금실행일</FormHelperText>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "23ch" }}>
            <Input
              id="juckEndDateInput"
              type="date"
              name="juckEndDate"
              value={this.state.juckEndDate}
            />
            <FormHelperText>적금만기일</FormHelperText>
          </FormControl>     
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
            <Select
              labelId="juckMethod-label"
              id="juckMethod"
              name="juckMethod"
              value={this.state.juckMethod}
              onChange={this.onChange}
            >
              <MenuItem value="일시납">정기납부</MenuItem>
              <MenuItem value="월납">자유납부</MenuItem>
            </Select>
            <FormHelperText>적금방법</FormHelperText>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: '23ch' }}>
            <Select
              labelId="juckAutoDate-label"
              id="juckAutoDate"
              name="juckAutoDate"
              value={this.state.juckAutoDate}
              onChange={this.onChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // 5개씩 보이도록 크기조정
                  },
                },
              }}
            >
              <MenuItem value={"선택없음"}>선택하세요</MenuItem>
              <MenuItem value={"1"}>1일</MenuItem>
              <MenuItem value={"2"}>2일</MenuItem>
              <MenuItem value={"3"}>3일</MenuItem>
              <MenuItem value={"4"}>4일</MenuItem>
              <MenuItem value={"5"}>5일</MenuItem>
              <MenuItem value={"6"}>6일</MenuItem>
              <MenuItem value={"7"}>7일</MenuItem>
              <MenuItem value={"8"}>8일</MenuItem>
              <MenuItem value={"9"}>9일</MenuItem>
              <MenuItem value={"10"}>10일</MenuItem>
              <MenuItem value={"11"}>11일</MenuItem>
              <MenuItem value={"12"}>12일</MenuItem>
              <MenuItem value={"13"}>13일</MenuItem>
              <MenuItem value={"14"}>14일</MenuItem>
              <MenuItem value={"15"}>15일</MenuItem>
              <MenuItem value={"16"}>16일</MenuItem>
              <MenuItem value={"17"}>17일</MenuItem>
              <MenuItem value={"18"}>18일</MenuItem>
              <MenuItem value={"19"}>19일</MenuItem>
              <MenuItem value={"20"}>20일</MenuItem>
              <MenuItem value={"21"}>21일</MenuItem>
              <MenuItem value={"22"}>22일</MenuItem>
              <MenuItem value={"23"}>23일</MenuItem>
              <MenuItem value={"24"}>24일</MenuItem>
              <MenuItem value={"25"}>25일</MenuItem>
              <MenuItem value={"26"}>26일</MenuItem>
              <MenuItem value={"27"}>27일</MenuItem>
              <MenuItem value={"28"}>28일</MenuItem>
            </Select>
            <FormHelperText>자동납부일</FormHelperText>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "23ch" }}>
            <Input
              id="juckAmounttInput"
              endAdornment={
                <InputAdornment position="end">원</InputAdornment>
              }
              aria-describedby="standard-juckAmount-helper-text"
              inputProps={{
                "aria-label": "juckAmount",
              }}
              name="juckAmount"
              onChange={this.onChange}
            />
            <FormHelperText>적금금액</FormHelperText>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "23ch" }}>
            <Input
              id="rateInput"
              endAdornment={
                <InputAdornment position="end">년</InputAdornment>
              }
              aria-describedby="standard-rate-helper-text"
              inputProps={{
                "aria-label": "rate",
              }}
              name="rate"
              onChange={this.onChange}
            />
            <FormHelperText>기간</FormHelperText>
          </FormControl>
          <Button
            style={{ margin: "0 auto" }}
            color="primary"
            variant="outlined"
            onClick={this.calRepayment} // calRepayment 함수 호출
            disabled={this.state.isButtonDisabled}
          >
            적금 상환금 계산하기
          </Button>
        </Grid>
        <br />
        <br />
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "21ch" }}>
            <Input
              id="juckAmount"
              endAdornment={
                <InputAdornment position="end">원</InputAdornment>
              }
              aria-describedby="standard-juckAmount-helper-text"
              inputProps={{
                "aria-label": "juckAmount",
              }}
              name="juckAmount"
              value={this.state.juckAmount}
              disabled
            />
            <FormHelperText>원금</FormHelperText>
          </FormControl>
          <Typography variant="body1" style={style} spacing={2}>
            +
          </Typography>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "21ch" }}>
            <Input
              id="totalInterest"
              endAdornment={
                <InputAdornment position="end">원</InputAdornment>
              }
              aria-describedby="standard-totalInterest-helper-text"
              inputProps={{
                "aria-label": "totalInterest",
              }}
              name="totalInterest"
              value={this.state.totalInterest}
              disabled
            />
            <FormHelperText>총적금이자</FormHelperText>
          </FormControl>
          <Typography variant="body1" style={style} spacing={2} paddingLeft={4}>
            =
          </Typography>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "35ch" }}>
            <Input
              id="totalRepayment"
              endAdornment={
                <InputAdornment position="end">원</InputAdornment>
              }
              aria-describedby="standard-totalRepayment-helper-text"
              inputProps={{
                "aria-label": "totalRepayment",
              }}
              name="totalRepayment"
              value={this.state.totalRepayment}
              disabled
            />
            <FormHelperText>총상환금액</FormHelperText>
          </FormControl>
        </Grid>
      </Container>
    );
  }
}

export default SignDetail;

const style = {
  display: "flex",
  justifyContent: "center",
};
