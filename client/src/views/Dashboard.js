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
                <main className="container row bg-light">
                    <div className="container">
                        <p>Authenticated</p>
                    </div>
                    <div className="container">
                        <p>API status: {this.state.status}</p>
                        <p>{localStorage.getItem('user')}</p>
                    </div>
                </main>
                <Footer messageLeft={"Welcome: "+JSON.parse(localStorage.getItem('user')).fname+" "+JSON.parse(localStorage.getItem('user')).lname} messageRight={""}/>
            </div>
        )
    }
}

export default Dashboard;
