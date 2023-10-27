// DepositCalculator.js
import React, { Component } from 'react';
import axios from 'axios';

class depositCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      principal: 0, // 예치 금액
      interestRate: 0, // 연 이율
      months: 0, // 개월 수
      totalAmount: 0, // 총액
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  calculateTotalAmount = () => {
    // 계산 로직을 여기에 추가
    const principal = parseFloat(this.state.principal);
    const interestRate = parseFloat(this.state.interestRate) / 100;
    const months = parseInt(this.state.months);
    const totalAmount = principal + principal * interestRate * months;
    this.setState({ totalAmount });
  };

  render() {
    return (
      <div>
        <h2>예금 및 적금 계산기</h2>
        <div>
          <label>예치 금액:</label>
          <input
            type="number"
            name="principal"
            value={this.state.principal}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>연 이율 (%):</label>
          <input
            type="number"
            name="interestRate"
            value={this.state.interestRate}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>개월 수:</label>
          <input
            type="number"
            name="months"
            value={this.state.months}
            onChange={this.handleInputChange}
          />
        </div>
        <button onClick={this.calculateTotalAmount}>계산</button>
        <div>총액: {this.state.totalAmount}</div>
      </div>
    );
  }
}

export default depositCalculator;
