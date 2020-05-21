import React, { Component } from 'react'


export class Subject extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            subjects: null,
            err: null
        }
    }
    

    getSubjects = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject')
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
        this.getSubjects();
    }

    render() {
        return (
            <div>
                <h3>Subjects</h3>
                <div>
                    <table className="table table-hover">
                        <tbody>
                            {this.state.subjects ? this.state.subjects.map((subject) => {
                                return (
                                    <tr key={subject.subject_id}>
                                        <th scope="row">{subject.subject_name}</th>
                                        <td>{subject.subject_description}</td>
                                        <td><img className="profile px-1" src={'https://storage.googleapis.com/teacher-student-forum-files/'+subject.teacher_profile} alt={"Profile-"+subject.teacher_id+'-'+subject.teacher_fname}/>{subject.teacher_fname} {subject.teacher_lname}</td>
                                    </tr>
                                )
                            }) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Subject



// import React from 'react'

// export default function Subject() {
//     const [subjects, setSubjects] = useState(null);

//     function getSubjects(){
//         fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject')
//         .then(res => res.json())
//         .then(res => setSubjects(res))
//     }

//     return (
//         <div>
//             Subject
//             {subjects}
//         </div>
//     )
// }
