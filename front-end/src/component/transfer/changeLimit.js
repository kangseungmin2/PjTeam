import { Typography, Container, Table, TableContainer, TableHead, TableRow, TableCell, Button } from '@mui/material';
import React, { Component } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import API from '../../api/transferAuto';

class ChangeLimit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transferNum: '',
      transType: '',
      accountLimit: ''
    };
  }

  componentDidMount() {
    this.loadTransList();
  }

  loadTransList = () => {
    const transferNum = window.localStorage.getItem("TranNum");
    API.autoList(transferNum)
      .then(res => {
        let tran = res.data;
        this.setState({
          transferNum: tran.transferNum,
          transType: tran.transType,
          accountLimit: tran.accountLimit
        });
      })
      .catch(err => {
        console.log('loadTransList() Error!!', err);
      });
  }

  allAccount = (transferNum) => {
    window.localStorage.setItem("TranNum", transferNum);
    this.props.history.push("/allAccount");
  }

  render() {
    return (
      <Container component="main" maxWidth="md">
        <CurrencyExchangeIcon fontSize='large' color='primary' />
        <Typography variant="h4" style={style}> 일일이체한도 변경 </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" width="50">No.</TableCell>
              <TableCell align="center" width="50">{this.state.transferNum}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" width="50">이체계좌명</TableCell>
              <TableCell align="center" width="50">{this.state.transType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" width="50">일일한도</TableCell>
              <TableCell align="center" width="50">
                <div style={{ maxHeight: '100px', overflow: 'auto' }}>
                  {this.state.accountLimit}
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <br />
        <Button variant="contained" color="primary" onClick={() => this.allAccount(this.state.transferNum)} align="center">심사요청</Button>
      </Container>
    );
  }
}

const style = {
  display: 'flex',
  justifyContent: 'center',
};

export default ChangeLimit;
