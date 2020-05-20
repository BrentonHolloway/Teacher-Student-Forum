import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Dashboard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             status: "testing..."
        }
    }
    
    test() {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/test/server')
        .then(res => res.json())
        .then(response => this.setState({status: response.status}));
    }

    componentDidMount(){
        this.test();
    }

    render() {
        return (
            <div>
                <Header items={this.props.headerItems} titleLink={this.props.titleLink} {...this.props}/>
                <main className="row justify-content-center">
                    <div className="container">
                        <p>Welcome</p>
                    </div>
                </main>
                <Footer messageLeft={"Welcome: "+JSON.parse(sessionStorage.getItem('user')).fname+" "+JSON.parse(sessionStorage.getItem('user')).lname} messageRight={""}/>
            </div>
        )
    }
}

export default Dashboard;
