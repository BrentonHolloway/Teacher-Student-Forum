import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import AllSubjects from './AllSubjects';
import UserSubjects from './UserSubjects';

class Dashboard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            allSubjects: [],
            allSubjectsErr: null,
            userSubjects: [],
            userSubjectsError: null,
            err: null
        }
    }

    subscribe = (subject_id) => {
        var subject = this.state.allSubjects.filter(subject => subject.subject_id === subject_id)
        this.setState(prevState => ({
            allSubjects: prevState.allSubjects.filter(subject => subject.subject_id !== subject_id),
            userSubjects: prevState.userSubjects.concat(subject)
        }))
    }

    unsubscribe = (subject_id) => {
        var subject = this.state.userSubjects.filter(subject => subject.subject_id === subject_id)
        this.setState(prevState => ({
            allSubjects: prevState.allSubjects.concat(subject),
            userSubjects: prevState.userSubjects.filter(subject => subject.subject_id !== subject_id)
        }))
    }

    delete = (subject_id) => {
        this.setState(prevState => ({
            userSubjects: prevState.userSubjects.filter(subject => subject.subject_id !== subject_id)
        }))
    }

    getAllSubjects = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/all', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: JSON.parse(sessionStorage.getItem('user')).id,
                role: JSON.parse(sessionStorage.getItem('user')).role
            })
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json();
            }

            throw new Error('Unable to retrieve subjects');
        })
        .then(res => {
            this.setState({
                allSubjects: res,
                allSubjectsErr: null
            });
        })
        .catch(err => this.setState({subjects: null, err: err.message}));
    }

    getUserSubjects = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/user', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: JSON.parse(sessionStorage.getItem('user')).id,
                role: JSON.parse(sessionStorage.getItem('user')).role
            })
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json();
            }

            throw new Error('Unable to retrieve subjects');
        })
        .then(res => {
            this.setState({
                userSubjects: res,
                userSubjectsError: null
            });
        })
        .catch(err => this.setState({err: err.message}));
    }

    onSubscribeHandler = (subject_id) => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/subscribe', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user_id: JSON.parse(sessionStorage.getItem('user')).id,
                subject_id: subject_id
            })
        })
        .then((res) => {
            if(res.status === 200) {
                return res.json();
            }

            throw new Error('Unable to retrieve subjects');
        })
        .then(this.subscribe(subject_id))
        .catch(err => this.setState({err: err.message}));
    }

    onUnSubscribeHandler = (subject_id) => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/unsubscribe', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user_id: JSON.parse(sessionStorage.getItem('user')).id,
                subject_id: subject_id
            })
        })
        .then((res) => {
            if(res.status !== 200) {
                throw new Error('Unable to delete subject');
            }
        })
        .then(this.unsubscribe(subject_id))
        .catch(err => this.setState({err: err.message}));
    }

    onDeleteHandler = (subject_id) => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/delete', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                teacher_id: JSON.parse(sessionStorage.getItem('user')).id,
                subject_id: subject_id
            })
        })
        .then((res) => {
            if(res.status !== 200) {
                throw new Error('Unable to delete subject');
            }
        })
        .then(this.delete(subject_id))
        .catch(err => this.setState({err: err.message}));
    }

    componentDidMount(){
        this.getUserSubjects();
        this.getAllSubjects();
    }

    render() {
        const functions = {
            subscribe: (subject_id) => {this.onSubscribeHandler(subject_id)},
            unsubscribe: (subject_id) => {this.onUnSubscribeHandler(subject_id)},
            delete: (subject_id) => {this.onDeleteHandler(subject_id)}
        }

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
                                        <UserSubjects subjects={this.state.userSubjects} func={functions} {...this.props}/>
                                    </div>}
                                <h3>Subjects</h3>
                                <AllSubjects subjects={this.state.allSubjects} func={functions} {...this.props}/>
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
