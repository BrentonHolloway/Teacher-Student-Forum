import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import AllSubjects from './AllSubjects';
import UserSubjects from './UserSubjects';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header items={this.props.headerItems} titleLink={this.props.titleLink} {...this.props}/>
                <main className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                {JSON.parse(sessionStorage.getItem('user')).role === 1 ? null : 
                                    <div>
                                        <div className="row justify-content-center">
                                            <span className="text-md-left col-6">
                                                <h3>My Subjects</h3>
                                            </span>
                                            <span className="text-md-right col-6">
                                                {JSON.parse(sessionStorage.getItem('user')).role === 2 ?
                                                <Link to="/subject/new">
                                                    <button className="btn btn-primary">
                                                        Create New Subject
                                                    </button>
                                                </Link>
                                                : null}
                                            </span>
                                        </div>
                                        
                                        <UserSubjects {...this.props}/>
                                    </div>}
                                <h3>Subjects</h3>
                                <AllSubjects {...this.props}/>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer messageLeft={"Welcome: "+JSON.parse(sessionStorage.getItem('user')).fname+" "+JSON.parse(sessionStorage.getItem('user')).lname} messageRight={""}/>
            </div>
        )
    }
}

export default Dashboard;
