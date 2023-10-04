import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function join(){
    return (
        <div>
            <Container className="panel">
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control type="password" placeholder="UserID" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">   
                        <Col sm>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Col sm>
                            <Form.Control type="password" placeholder="Username" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Col sm>
                            <Form.Control type="email" placeholder="Email Address" />
                        </Col>
                    </Form.Group>
                    <br/>

                    <div className="d-grid gap-1">
                        <Button variant="secondary" type="submit" style={style}>
                            회원가입
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
const style ={
    backgroundColor:'#46B8FF'
}
export default join