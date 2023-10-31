import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../resource/css/login.css';

function logout(){
    window.location.reload();
    localStorage.clear();
  }

function Admin() {
    const id = window.localStorage.getItem("id");
    const admin = window.localStorage.getItem("admin");
    return (

        <Navbar expand="lg" style={style}>
            <Container>
                <Navbar.Brand href="/main" style={style}>우리은행</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <NavDropdown title="예/적금" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/depositProductAdd">예금상품 등록</NavDropdown.Item>
                            <NavDropdown.Item href="/savingsProductAdd">적금상품 등록</NavDropdown.Item>
                            <NavDropdown.Item href="/depositProductList">예금상품 목록</NavDropdown.Item>
                            <NavDropdown.Item href="/savingsProductList">적금상품 목록</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="대출" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/loanProductAdd">대출상품 등록</NavDropdown.Item>
                            <NavDropdown.Item href="/loanProductList">대출상품 목록</NavDropdown.Item>
                            <NavDropdown.Item href="/loanSignConfirm">대출신청 승인/반려</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="환율" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/exchangeConfirm">환율 승인 목록</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title="관리자" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/management">회원관리</NavDropdown.Item>
                            <NavDropdown.Item href="/adminAccount">관리자 결산</NavDropdown.Item>
                            <NavDropdown.Item href="/boardList">고객센터</NavDropdown.Item>
                            <NavDropdown.Item href="/answerList">1:1문의 답변</NavDropdown.Item>
                            <NavDropdown.Item href="/transferLimit">한도상향요청</NavDropdown.Item>
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

const style = {
    backgroundColor: '#46B8FF',
    color: 'white'
}

export default Admin;