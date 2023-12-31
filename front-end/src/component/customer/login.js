import { Component } from "react";
import LoginForm from "./loginForm.js";
import { request, setAuthToken } from "../../heplers/axios_helper.js";
import * as Fpp from '../../heplers/axios_helper.js';

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
                console.log("여기요")
                this.props.history.push('/main');                
                window.location.reload();
            })
            .catch((error) => {
                this.setState({componentToShow: "welcome"});
                setAuthToken(null);
            })
    }

    onAdmin = (e, id, password) => {
        e.preventDefault();
        request(
            "POST",
            "/admin",
            {
                id: id,
                password: password
            })
            .then((response) => {
                this.setState({componentToShow: "messages"});
                setAuthToken(response.data.token,id);
                console.log("여기요")
                this.props.history.push('/main');
               
            })
            .catch((error) => {
                this.setState({componentToShow: "welcome"});
                setAuthToken(null);
            })

    }

    render() {
        return(
            <div>
                {<LoginForm onLogin={this.onLogin} onAdmin={this.onAdmin} />}
            </div>
        );
    }
}

export default AppContent;


