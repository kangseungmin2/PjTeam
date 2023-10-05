import { Component } from "react";
import WelcomeContent from './WelcomeContent.js';
import LoginForm from "./LoginForm";
import { request, setAuthToken } from "../../heplers/axios_helper.js";
import Buttons from "./Buttons";

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
                setAuthToken(response.data.token);
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
            })
            .catch((error) => {
                this.setState({componentToShow: "welcome"});
                setAuthToken(null);
            })
    }

    render() {
        return(
            <div>
                <Buttons login={this.login}
                         logout={this.logout} />
                {this.state.componentToShow === "welcome" && <WelcomeContent />}
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
            </div>
        );
    }
}

export default AppContent;