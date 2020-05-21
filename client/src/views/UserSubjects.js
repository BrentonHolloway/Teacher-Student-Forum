import React, { Component } from 'react'

class UserSubjects extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            subjects: null,
            err: null
        }
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
                subjects: res,
                err: null
            });
        })
        .catch(err => this.setState({subjects: null, err: err.message}));
    }

    componentDidMount() {
        this.getUserSubjects();
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                <tbody>
                    {this.state.subjects ? this.state.subjects.map((subject) => {
                        return (
                            <tr key={subject.subject_id}>
                                <th scope="row">{subject.subject_name}</th>
                                <td>{subject.subject_description}</td>
                                {JSON.parse(sessionStorage.getItem('user')).role === 2 ? null :
                                <td><img className="profile px-1" src={'https://storage.googleapis.com/teacher-student-forum-files/'+subject.teacher_profile} alt={"Profile-"+subject.teacher_id+'-'+subject.teacher_fname}/>{subject.teacher_fname} {subject.teacher_lname}</td>}
                                
                            </tr>
                        )
                    }) : null}
                </tbody>
            </table>
            </div>
        )
    }
}

export default UserSubjects
