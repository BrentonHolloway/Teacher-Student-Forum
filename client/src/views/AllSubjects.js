import React, { Component } from 'react'

class AllSubjects extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            subjects: null,
            err: null,
        }
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
                subjects: res,
                err: null
            });
        })
        .catch(err => this.setState({subjects: null, err: err.message}));
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
        .then(this.props.update())
        .then(this.getAllSubjects())
        .catch(err => this.setState({subjects: null, err: err.message}));
    }

    componentDidMount() {
        this.getAllSubjects();
    }

    componentDidUpdate() {
        if(this.props.updateStatus === true) {
            this.props.status();
            this.getAllSubjects();
        }
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <tbody>
                        {this.state.subjects.map((subject) => {
                            return (
                                <tr key={subject.subject_id}>
                                    <th scope="row">{subject.subject_name}</th>
                                    <td>{subject.subject_description}</td>
                                    <td><img className="profile px-1" src={'https://storage.googleapis.com/teacher-student-forum-files/'+subject.teacher_profile} alt={"Profile-"+subject.teacher_id+'-'+subject.teacher_fname}/>{subject.teacher_fname} {subject.teacher_lname}</td>
                                    {JSON.parse(sessionStorage.getItem('user')).role === 3 ?
                                    <td>
                                        <button className="btn btn-success" onClick={() => this.onSubscribeHandler(subject.subject_id)}>Subscribe</button>
                                    </td> : null}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AllSubjects
