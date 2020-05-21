import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import AllSubjects from './AllSubjects';
import UserSubjects from './UserSubjects';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header items={this.props.headerItems} titleLink={this.props.titleLink} {...this.props}/>
                <main className="row justify-content-center">
                    <div className="container">
                        {JSON.parse(sessionStorage.getItem('user')).role === 1 ? null : 
                            <div>
                                <h3>My Subjects</h3>
                                <UserSubjects {...this.props}/>
                            </div>}
                        <h3>Subjects</h3>
                        <AllSubjects {...this.props}/>
                    </div>
                </main>
                <Footer messageLeft={"Welcome: "+JSON.parse(sessionStorage.getItem('user')).fname+" "+JSON.parse(sessionStorage.getItem('user')).lname} messageRight={""}/>
            </div>
        )
    }
}

export default Dashboard;
