import React, { Component } from 'react'

class AllSubjects extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            subjects: null,
            err: null,
        }
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <tbody>
                        {this.props.subjects.map((subject) => {
                            return (
                                <tr key={subject.subject_id}>
                                    <th scope="row">{subject.subject_name}</th>
                                    <td>{subject.subject_description}</td>
                                    <td><img className="profile px-1" src={'https://storage.googleapis.com/teacher-student-forum-files/'+subject.teacher_profile} alt={"Profile-"+subject.teacher_id+'-'+subject.teacher_fname}/>{subject.teacher_fname} {subject.teacher_lname}</td>
                                    {JSON.parse(sessionStorage.getItem('user')).role === 3 ?
                                    <td>
                                        <button className="btn btn-success" onClick={() => this.props.func.subscribe(subject.subject_id)}>Subscribe</button>
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
