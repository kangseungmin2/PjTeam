import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../resource/css/login.css';

function log(){
  const id = window.localStorage.getItem("id");
  const admin = window.localStorage.getItem("admin");
  if(admin == null){
    if(id == null){
      console.log('로그인 안됨')
      return <Nav >        
          <Nav.Link href="/join" style={style}>회원가입</Nav.Link>
          <Nav.Link eventKey={2} href="/login" style={style}>
          로그인
          </Nav.Link>
      </Nav>
      
    }
    else if(id != null){
      console.log('로그인 됨')
      return <Nav>
        <NavDropdown title={id} id="basic-nav-dropdown">
          <NavDropdown.Item href="/memberInfo">내정보</NavDropdown.Item>
          <NavDropdown.Item href="/modifyMember">회원수정</NavDropdown.Item>
          <NavDropdown.Item href="/deleteMember">회원탈퇴</NavDropdown.Item>
          <NavDropdown.Item href="/memAccount">회원 결산</NavDropdown.Item>
          <NavDropdown.Item href="/question">1:1문의</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link eventKey={2} href="/chat" style={style}>
          채팅
        </Nav.Link>
        <Nav.Link eventKey={2} style={style} onClick={logout}>
          로그아웃
        </Nav.Link>
      </Nav>
    }
  }
  else if(admin != null){
    return <Nav>
        <NavDropdown title="관리자" id="basic-nav-dropdown">
          <NavDropdown.Item href="/management">회원관리</NavDropdown.Item>
          <NavDropdown.Item href="/adminAccount">관리자 결산</NavDropdown.Item>
          <NavDropdown.Item href="/answer">1:1문의 답변</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link eventKey={2} href="/chat" style={style}>
          채팅
        </Nav.Link>
        <Nav.Link eventKey={2} style={style} onClick={logout}>
          로그아웃
        </Nav.Link>
      </Nav>
  }
}
function logout(){
  window.location.reload();
  localStorage.removeItem("id");
  localStorage.removeItem("admin");
}

function BasicExample() {

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
              <NavDropdown.Item href="/eAccount">
                전체계좌조회
              </NavDropdown.Item>
              <NavDropdown.Item href="/balanceList">잔액조회</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/passwordModify">비밀번호변경</NavDropdown.Item>
              <NavDropdown.Item href="/deleteAccount">계좌해지</NavDropdown.Item>
            </NavDropdown>


            <NavDropdown title="대출" id="basic-nav-dropdown">
              <NavDropdown.Item href="/loanList">대출상품</NavDropdown.Item>
              <NavDropdown.Item href="/loanSignList">가입상품 조회</NavDropdown.Item>
              <NavDropdown.Item href="/repayment">이자조회/납부</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/loanProductAdd">대출상품 등록</NavDropdown.Item>
              <NavDropdown.Item href="/loanProductList">대출상품 목록</NavDropdown.Item>
              <NavDropdown.Item href="/loanSignConfirm">대출신청 승인/반려</NavDropdown.Item>
            </NavDropdown>


            <NavDropdown title="예/적금" id="basic-nav-dropdown">
              <NavDropdown.Item href="/depositList">예금 상품</NavDropdown.Item>
              <NavDropdown.Item href="/savingsList">적금 상품</NavDropdown.Item>
              <NavDropdown.Item href="/depositnew">가입상품 조회</NavDropdown.Item>                           
              <NavDropdown.Divider />
              <NavDropdown.Item href="/depositProductAdd">예금상품 등록</NavDropdown.Item>  
              <NavDropdown.Item href="/savingsProductAdd">적금상품 등록</NavDropdown.Item>            
              <NavDropdown.Item href="/depositProductList">예금상품 목록</NavDropdown.Item>
              <NavDropdown.Item href="/savingsProductList">적금상품 목록</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="이체" id="basic-nav-dropdown">
              <NavDropdown.Item href="/transAccount">1건이체</NavDropdown.Item>
              <NavDropdown.Item href="/multipleTransfer">다건이체</NavDropdown.Item>
              <NavDropdown.Item href="/transAccount">이체한도변경</NavDropdown.Item>
              <NavDropdown.Item href="/transferList">이체목록</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/autoWithdrawal">자동이체</NavDropdown.Item>
              <NavDropdown.Item href="/changeAuto">자동이체 변경/해지</NavDropdown.Item>
              <NavDropdown.Item href="/autoList">자동이체 목록</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="펀드" id="basic-nav-dropdown">
              <NavDropdown.Item href="/fundAccount">펀드 계좌개설</NavDropdown.Item>
              <NavDropdown.Item href="/fundList">
                펀드상품
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/myFund">
                보유펀드현황
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="환율" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">환율 정보</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                나의 환율기록
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="MYPAGE" id="basic-nav-dropdown">
              <NavDropdown.Item>--admin--</NavDropdown.Item>
              <NavDropdown.Item href="/management">회원관리</NavDropdown.Item>
              <NavDropdown.Item href="/adminAccount">관리자 결산</NavDropdown.Item>
              <NavDropdown.Item href="/answer">1:1문의 답변</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>--member--</NavDropdown.Item>
              <NavDropdown.Item href="/memberInfo">내정보</NavDropdown.Item>
              <NavDropdown.Item href="/modifyMember">회원수정</NavDropdown.Item>
              <NavDropdown.Item href="/deleteMember">회원탈퇴</NavDropdown.Item>
              <NavDropdown.Item href="/memAccount">회원 결산</NavDropdown.Item>
              <NavDropdown.Item href="/question">1:1문의</NavDropdown.Item>
            </NavDropdown>            
          </Nav>
          {log()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
const style={
  backgroundColor:'#46B8FF',
  color:'white'
}
const style2={
  Color:'white'
}

export default BasicExample;