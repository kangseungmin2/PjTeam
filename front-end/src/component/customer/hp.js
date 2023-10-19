import React, { Component } from 'react';

class PhoneVerification extends Component {
  constructor() {
    super();
    this.state = {
      phoneNumber: '',
      code2: '',
      phone2: '',
      verificationStatus: '',
    };
  }

  sendSMS = () => {
    alert('인증번호 발송이 완료되었습니다.\n휴대폰에서 인증번호 확인을 해주십시오.');
    const { phoneNumber } = this.state;

    fetch("/shop/member/sendSMS1.do", {
      method: "POST",
      body: JSON.stringify({ phoneNumber }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.text())
    .then(data => {
      if (data === "error") {
        alert("휴대폰 번호가 올바르지 않습니다.");
      } else {
        alert("휴대폰 전송이  됨.");
        this.setState({ code2: data });
      }
    });
  }

  checkVerification = () => {
    const { phone2, code2 } = this.state;
    if (phone2 === code2) {
      this.setState({ verificationStatus: '인증성공' });
    } else {
      this.setState({ verificationStatus: '인증실패' });
    }
  }

  render() {
    return (
      <div>
        <div className="input_text">
          <input
            className="signin_pass"
            type="text"
            name="phoneNumber"
            title="전화번호 입력"
            placeholder="전화번호 입력해주세요"
            value={this.state.phoneNumber}
            onChange={(e) => this.setState({ phoneNumber: e.target.value })}
          />
          <input
            className="signin_pass"
            type="button"
            value="입력"
            onClick={this.sendSMS}
          />
        </div>
        
        <div className="input_text">
          <input
            className="signin_pass"
            type="text"
            name="phone"
            title="전화번호 입력"
            placeholder="인증번호 입력해주세요"
            value={this.state.phone2}
            onChange={(e) => this.setState({ phone2: e.target.value })}
          />
          <input
            className="signin_pass"
            type="button"
            value="인증확인"
            onClick={this.checkVerification}
          />
        </div>
        
        {this.state.verificationStatus && <p>{this.state.verificationStatus}</p>}
      </div>
    );
  }
}

export default PhoneVerification;