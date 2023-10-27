import React, { Component } from 'react';
import DepositSignApi from "../../api/depositSign";
import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';

class DepositSignList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      depositSigns: [],
    };
  }

  componentDidMount() {
    this.loadDepositSignConfirmList();
  }

  loadDepositSignConfirmList = () => {
    const id = window.localStorage.getItem("id");
    DepositSignApi.fetchSignConfirms(id)
      .then((res) => {
        this.setState({
          depositSigns: res.data
        });
      })
      .catch(err => {
        console.log('loadDepositSignConfirmList() Error!!', err);
      });
  }

  render() {
    const { depositSigns } = this.state;

    return (
      <div>
        <h2>Subscription List</h2>
        <Grid container justifyContent="center">
          <Paper elevation={3} style={{ padding: '16px', width: '50%' }}>
            {depositSigns.map(sign => (
              <Card key={sign.yeSignNo} style={{ marginBottom: '16px', padding: '8px' }}>
                <CardContent>
                  <Typography variant="body1">No: {sign.yeSignNo}</Typography>
                  <Typography variant="h6">Product Name: {sign.yeName}</Typography>                 
                  <Typography variant="body1">Account Number: {sign.depositAccountNum}</Typography>
                  <Typography variant="body1">Amount: {sign.yeAmount}원</Typography>
                  <Typography variant="body1">InterestRate: {sign.interestRate}%</Typography>
                  {/* 다른 정보 표시 */}
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default DepositSignList;
