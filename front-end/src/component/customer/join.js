import { Component } from "react";
import JoinForm from "./joinForm.js";
import { request, setAuthToken } from "../../heplers/axios_helper.js";

class AppContent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome" // componentToShow의 초기값은 welcome
        }
    }

    // login일 땐 componentToShow의 값을 login으로 줌
    login = () => {
        this.setState({componentToShow: "login"})
    }

    // login일 땐 componentToShow의 값을 welcome으로 줌
    logout = () => {
        this.setState({componentToShow: "welcome"})
    }

    onLogin = (e, id, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {
                id: id,
                password: password
            })
            .then((response) => {
                this.setState({componentToShow: "messages"});
                setAuthToken(response.data.token,id);
                this.props.history.push('/main');
                window.location.reload();
            })
            .catch((error) => {
                this.setState({componentToShow: "welcome"});
                setAuthToken(null);
            })
    }

    onRegister = (event, id, password, name, residentRegistrationNumber, address,hp,job,email) => {
        event.preventDefault();
        request(
            "POST",
            "/register",
            {
                id: id,
                password: password,
                name: name,
                residentRegistrationNumber: residentRegistrationNumber,
                address: address,
                hp: hp,
                job: job,
                email: email
            })
            .then((response) => {
                this.setState({componentToShow: "messages"});
                setAuthToken(response.data.token);
                this.props.history.push('/login');
            })
            .catch((error) => {
                this.setState({componentToShow: "welcome"});
                console.log("회원가입 실패");
                setAuthToken(null);
            })
    }

    render() {
        return(
            <div>
                {<JoinForm onLogin={this.onLogin} onRegister={this.onRegister} />}
            </div>
        );
    }
}

export default AppContent;