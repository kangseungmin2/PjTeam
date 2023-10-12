import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/main">우리은행</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/main">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="계좌" id="basic-nav-dropdown">
              <NavDropdown.Item href="/openAccount">계좌개설</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/allAccount">
                전체계좌조회
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">잔액조회</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">비밀번호변경</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">계좌해지</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="대출" id="basic-nav-dropdown">
              <NavDropdown.Item href="/loanList">대출상품</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                대출신청/조회
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                이자조회/납부
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="예/적금" id="basic-nav-dropdown">
              <NavDropdown.Item href="/depositList">예/적금 조회</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                예/적금 신규
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                예/적금 해지
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                계좌관리
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="이체" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1건이체</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                다건이체
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                자동이체
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                자동이체 변경
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                자동이체 해지
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="펀드" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">펀드 계좌개설</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                펀드상품
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                보유펀드현황
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">회원가입</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              로그인
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;