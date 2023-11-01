import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../resource/css/login.css';
import NoCustomer from './notMember';
import Customer from './customer';
import Admin from './admin';

function openMemberAccount(e) {
  window.open("http://43.202.0.250:5601/app/dashboards#/view/abb9cd00-77c4-11ee-831d-81a7372e981f?_g=(filters:!(),refreshInterval:(pause:!t,value:60000),time:(from:now-1m,to:now))");
}

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