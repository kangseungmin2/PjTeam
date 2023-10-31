import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../resource/css/login.css';
function logout(){
    window.location.reload();
    localStorage.clear();
  }

function Customer() {
    const id = window.localStorage.getItem("id");
    const admin = window.localStorage.getItem("admin");
    return (
        <Navbar expand="lg" style={style}>
            <Container>
                <Navbar.Brand href="/main" style={style}>우리은행</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/main" style={style}>Home</Nav.Link>
                        <NavDropdown title="계좌" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/openAccount">계좌개설</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/allAccount">
                                전체계좌조회
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/passwordModify">비밀번호변경</NavDropdown.Item>
                            <NavDropdown.Item href="/deleteAccount">계좌해지</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="이체" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/transAccount">1건이체</NavDropdown.Item>
                            <NavDropdown.Item href="/limitAccount">이체한도변경</NavDropdown.Item>
                            <NavDropdown.Item href="/transferList">이체목록</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/autoAccount">자동이체</NavDropdown.Item>
                            <NavDropdown.Item href="/changeAuto">자동이체 변경/해지</NavDropdown.Item>
                            <NavDropdown.Item href="/autoList">자동이체 목록</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="공과금" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/utilityList">납부내역조회</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/payChk">
                                공과금 납부
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="예/적금" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/depositList">예금 상품</NavDropdown.Item>
                            <NavDropdown.Item href="/savingsList">적금 상품</NavDropdown.Item>
                            <NavDropdown.Item href="/depositSignList">가입상품 조회</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="대출" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/loanList">대출상품</NavDropdown.Item>
                            <NavDropdown.Item href="/loanSignList">가입상품 조회</NavDropdown.Item>
                            <NavDropdown.Item href="/repayment">이자조회/납부</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="펀드" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/fundAccount">펀드계좌 개설</NavDropdown.Item>
                            <NavDropdown.Item href="/fundTransaction">펀드계좌 거래내역</NavDropdown.Item>
                            <NavDropdown.Item href="/fundList">펀드상품</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/myFundChk">보유펀드현황</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="환율" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/exchangeList">환율 정보</NavDropdown.Item>
                            <NavDropdown.Item href="/myExchange">나의 환율기록</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/boardListMember" style={style}>자주하는 질문</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={id} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/memberInfo">내정보</NavDropdown.Item>
                            <NavDropdown.Item href="/modifyMember">회원수정</NavDropdown.Item>
                            <NavDropdown.Item href="/deleteMember">회원탈퇴</NavDropdown.Item>
                            <NavDropdown.Item href="/memAccount">회원 결산</NavDropdown.Item>
                            <NavDropdown.Item href="/questionList">1:1문의</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link eventKey={2} href="/chat" style={style}>
                            채팅
                        </Nav.Link>
                        <Nav.Link eventKey={2} style={style} onClick={logout}>
                            로그아웃
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

const style={
    backgroundColor:'#46B8FF',
    color:'white'
  }
export default Customer;