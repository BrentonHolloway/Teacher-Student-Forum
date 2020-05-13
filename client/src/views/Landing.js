import React, { Component } from 'react';
import Header from '../components/Header';

class Landing extends Component {

    constructor(props) {
        super(props);

        this.state = {
             status: "testing...",
             database: "testing..."
        }
    }

    login = () => {
        this.props.history.push("/login");
    }

    signup = () => {
        this.props.history.push("/signup");
    }

    testAPIServer() {
        try {
            fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/test/server')
            .then(res => res.json())
            .then(response => this.setState({status: response.status}));
        } catch (err) {
            this.setState({
                status: "Server Currently Unavailable",
            })
        }
        
    }

    testAPIDatabase() {
        try {
            fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/test/database')
            .then(res => res.json())
            .then(response => this.setState({database: response.status}));
        } catch (err) {
            this.setState({
                database: "Server Currently Unavailable",
            })
        }
        
    }

    componentDidMount() {
        this.testAPIServer();
        this.testAPIDatabase();
    }

    render() {
        
        return (
            <div>
                <Header items={this.props.headerItems} titleLink={this.props.titleLink} {...this.props}/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <h1>Welcome to the Teacher Student Forum</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col">
                            <p>The all in one online learning forum. Where students and teacher can collaborate and communicate effectivly</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="row">
                                <h3>API Server Health</h3>
                            </div>
                            <ul>
                                <li>Server: {this.state.status}</li>
                                <li>Database: {this.state.database}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;
