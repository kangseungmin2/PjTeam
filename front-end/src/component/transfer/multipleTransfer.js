import React, { Component } from "react";
import ApiService from "../../ApiService";
import "../../resource/css/multipleTransfer.css";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

class MultipleTransfer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      newTransaction: {
        accountNum: "",
        trbank: "",
        trName: "",
        trAmount: "",
        trAccountNum: "",
        accountPW: ""
      }
    };
  }

  addTransaction = () => {
    this.setState((prevState) => ({
      transactions: [...prevState.transactions, { ...prevState.newTransaction }],
      newTransaction: {
        accountNum: "",
        trbank: "",
        trName: "",
        trAmount: "",
        trAccountNum: "",
        accountPW: ""
      }
    }));
  };

  removeTransaction = (index) => {
    this.setState((prevState) => {
      const updatedTransactions = [...prevState.transactions];
      updatedTransactions.splice(index, 1);
      return { transactions: updatedTransactions };
    });
  };

  onChange = (e, index) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const updatedTransactions = [...prevState.transactions];
      updatedTransactions[index] = {
        ...updatedTransactions[index],
        [name]: value,
      };
      return { transactions: updatedTransactions };
    });
  };

  saveMultipleTransfers = (e) => {
    e.preventDefault();

    // transactions 배열을 ApiService로 전송하여 처리

    // 예시: 성공 시
    console.log("다건이체 성공");

    // 필요에 따라 다른 로직을 추가하세요.
  };

  render() {
    return (
        <div>
        <CurrencyExchangeIcon fontSize='large' color='primary' />
          <h4>다건이체</h4>
          {this.state.transactions.map((transaction, index) => (
            <div key={index} className="transaction-form">
              <label>거래 {index + 1}</label>
              <input
                type="text"
                name="accountNum"
                value={transaction.accountNum}
                placeholder="출금 계좌번호"
                onChange={(e) => this.onChange(e, index)}
              />

              <input
                type="text"
                name="trbank"
                value={transaction.trbank}
                placeholder="입금은행"
                onChange={(e) => this.onChange(e, index)}
              />
              <input
                type="text"
                name="trName"
                value={transaction.trName}
                placeholder="수취인명"
                onChange={(e) => this.onChange(e, index)}
              />
              <input
                type="text"
                name="trAmount"
                value={transaction.trAmount}
                placeholder="입금하실 금액을 입력하세요"
                onChange={(e) => this.onChange(e, index)}
              />
              <input
                type="text"
                name="trAccountNum"
                value={transaction.trAccountNum}
                placeholder="입금계좌번호를 입력하세요"
                onChange={(e) => this.onChange(e, index)}
              />
              <input
                type="password"
                name="accountPW"
                value={transaction.accountPW}
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => this.onChange(e, index)}
              />
              {index > 0 && (
                <button
                  onClick={() => this.removeTransaction(index)}
                  className="remove-transaction"
                >
                  삭제
                </button>
              )}
            </div>
          ))}

          <button onClick={this.addTransaction} className="add-transaction" >
            거래 추가
          </button>

          <button onClick={this.saveMultipleTransfers} className="save-transfers">
            이체
          </button>
      </div>
    );
    }
}

export default MultipleTransfer;
