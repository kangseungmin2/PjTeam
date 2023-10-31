import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../resource/css/login.css';
import NoCustomer from './notMember';
import Customer from './customer';
import Admin from './admin';

function log(){
  const id = window.localStorage.getItem("id");
  const admin = window.localStorage.getItem("admin");
  if(admin == null){
    if(id == null){
      console.log('로그인 안됨')
      return <NoCustomer/>
      
    }
    else if(id != null){
      console.log('로그인 됨')
      return <Customer/>
    }
  }
  else if(admin != null){
    return <Admin/>
  }
}


function BasicExample() {

  return (
          log()
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