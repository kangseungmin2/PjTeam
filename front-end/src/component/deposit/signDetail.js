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
import DepositSignApi from "../../api/depositSign";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

class SignDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yeSignNo: "",
      id: window.localStorage.getItem("id"),
      yeNo: "",
      yeName: "",     
      depositAccountNum: "",
      accountType: "y",
      accountNum: "",
      accountPW: "",
      yeAmount: "",
      yeJoinDate: "",
      yeEndDate: "",
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
  }

  handleJoinDateChange = (e) => {
    const yeJoinDate = e.target.value;
    this.setState({ yeJoinDate });
    this.calculateMaturityDate(yeJoinDate, this.state.rate);
  }

  handleRateChange = (e) => {
    const rate = e.target.value;
    this.setState({ rate });
    this.calculateMaturityDate(this.state.yeJoinDate, rate);
  }

  calculateMaturityDate = (yeJoinDate, rate) => {
    if (yeJoinDate && rate) {
      const startDate = new Date(yeJoinDate);
      const maturityDate = new Date(startDate);
      maturityDate.setFullYear(startDate.getFullYear() + parseInt(rate, 10));
      this.setState({ yeEndDate: maturityDate.toISOString().split('T')[0] });
    }
  }

  componentDidMount() {
    this.loadDepositDetail();
    this.loadAccountNum();
  }

  loadDepositDetail = () => {
    DepositSignApi.fetchDetailByNum(window.localStorage.getItem("DepositNum"))
      .then((res) => {
        let deposit = res.data;
        this.setState({
          yeNo: deposit.yeNo,
          yeName: deposit.yeName,
          interestRate: deposit.interestRate,
        });
      })
      .catch((err) => {
        console.log("loadDepositDetail() Error!!", err);
      });
  }

  loadAccountNum = () => {
    const id = window.localStorage.getItem("id");
    DepositSignApi.fetchAllAccounts(id)
      .then((res) => {
        const accounts = res.data;
        this.setState({ accountNumList: accounts });
      })
      .catch((err) => {
        console.log("계좌 목록 로딩 중 오류 발생:", err);
      });
  }

  pwCheck = (e) => {
    e.preventDefault();
    const id = window.localStorage.getItem("id");
    let inputData = {
      accountNum: this.state.accountNum,
      id: id,
    };

    DepositSignApi.pwCheck(inputData)
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
  }

  calRepayment = (e) => {
    e.preventDefault();

    const yeAmount = parseFloat(this.state.yeAmount);
    const rate = parseInt(this.state.rate);
    const interestRate = parseFloat(this.state.interestRate) / 100;
    const yeJoinDate = new Date(this.state.yeJoinDate);
    const yeEndDate = new Date(this.state.yeEndDate);
 
    if (yeAmount > 0 && rate > 0 && interestRate > 0 && yeJoinDate && yeEndDate) {
        // 계산식 추가
        const months = (yeEndDate.getFullYear() - yeJoinDate.getFullYear()) * 12 + (yeEndDate.getMonth() - yeJoinDate.getMonth());
        const monthlyInterestRate = interestRate / 12;
        const totalInterest = (yeAmount * monthlyInterestRate * months) / 2;
        const totalRepayment = yeAmount + totalInterest;

        this.setState({ totalRepayment, totalInterest });
        this.sendDataToParent()
    }
}

  sendDataToParent = () => {
    const data = {
      id: window.localStorage.getItem("id"),
      yeNo: this.state.yeNo,     
      accountType: "y",
      yeName: this.state.yeName,
      accountNum: this.state.accountNum,
      accountPW: this.state.accountPW,
      yeAmount: this.state.yeAmount,
      yeJoinDate: this.state.yeJoinDate,
      yeEndDate: this.state.yeEndDate,
      interestRate: this.state.interestRate,
      rate: parseInt(this.state.rate),
    };
    this.props.onDataHandle(data);
  }

  render() {
    return (
      <Container component="main" maxWidth="md">
        <br />
        <Grid container spacing={2}>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "50ch" }}>
            <Input
              id="depositProductNameInput"
              aria-describedby="standard-yeName-helper-text"
              inputProps={{
                "aria-label": "yeName",
              }}
              name="yeName"
              value={this.state.yeName}
              disabled
            />
            <FormHelperText>depositProductName</FormHelperText>
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
          Sign Deposit Product
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
            <FormHelperText>예금입금 계좌번호</FormHelperText>
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
              id="yeJoinDateInput"
              type="date"
              name="yeJoinDate"
              value={this.state.yeJoinDate}
              onChange={(e) => this.handleJoinDateChange(e)}
            />
            <FormHelperText>예금실행일</FormHelperText>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "23ch" }}>
            <Input
              id="yeEndDateInput"
              type="date"
              name="yeEndDate"
              value={this.state.yeEndDate}
            />
            <FormHelperText>예금만기일</FormHelperText>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "23ch" }}>
            <Input
              id="yeAmounttInput"
              endAdornment={
                <InputAdornment position="end">원</InputAdornment>
              }
              aria-describedby="standard-yeAmount-helper-text"
              inputProps={{
                "aria-label": "yeAmount",
              }}
              name="yeAmount"
              onChange={this.onChange}
            />
            <FormHelperText>예금금액</FormHelperText>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "23ch" }}>
            <Input
              id="rateInput"
              endAdornment={<InputAdornment position="end">년</InputAdornment>}
              aria-describedby="standard-rate-helper-text"
              inputProps={{
                "aria-label": "rate",
              }}
              name="rate"
              onChange={(e) => this.handleRateChange(e)}
            />
            <FormHelperText>기간</FormHelperText>
          </FormControl>
          <Button
            style={{ margin: "0 auto" }}
            color="primary"
            variant="outlined"
            onClick={this.calRepayment}
            disabled={this.state.isButtonDisabled}
          >
            예금 상환금 계산하기
          </Button>
        </Grid>
        <br />
        <br />
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          <FormControl variant="standard" sx={{ m: 2, mt: 2, width: "21ch" }}>
            <Input
              id="yeAmount"
              endAdornment={
                <InputAdornment position="end">원</InputAdornment>
              }
              aria-describedby="standard-yeAmount-helper-text"
              inputProps={{
                "aria-label": "yeAmount",
              }}
              name="yeAmount"
              value={this.state.yeAmount}
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
            <FormHelperText>총예금이자</FormHelperText>
          </FormControl>
          <Typography
            variant="body1"
            style={style}
            spacing={2}
            paddingLeft={4}
          >
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
