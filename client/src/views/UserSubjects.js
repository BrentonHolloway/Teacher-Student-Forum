import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class UserSubjects extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            showDeleteModal: false,
            showUnSubscribeModal: false,
            subject_id: null,
        }
    }

    onClickHandler = (id) => {
        this.props.history.push("/subject/"+id)
    }

    onShowDeleteHandler = (event, subject_id) => {
        event.stopPropagation();
        this.setState({
            showDeleteModal: true,
            subject_id: subject_id
        })
    }

    onHideDeleteHandler = () => {
        this.setState({
            showDeleteModal: false,
            subject_id: null
        })
    }

    onShowUnSubscribeHandler = (event, subject_id) => {
        event.stopPropagation();
        this.setState({
            showUnSubscribeModal: true,
            subject_id: subject_id
        })
    }

    onHideUnSubscribeHandler = () => {
        this.setState({
            showUnSubscribeModal: false,
            subject_id: null
        })
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <tbody>
                        {this.props.subjects.map((subject) => {
                            return (
                                <tr key={subject.subject_id} className="pointer" onClick={() => this.onClickHandler(subject.subject_id)}>
                                    <th scope="row">{subject.subject_name}</th>
                                    <td>{subject.subject_description}</td>
                                    {JSON.parse(sessionStorage.getItem('user')).role === 2 ?
                                    <td>
                                        <button className="btn btn-danger" onClick={(event) => this.onShowDeleteHandler(event, subject.subject_id)}>
                                            Delete
                                        </button>
                                    </td> :
                                    <td><img className="profile px-1" src={'https://storage.googleapis.com/teacher-student-forum-files/'+subject.teacher_profile} alt={"Profile-"+subject.teacher_id+'-'+subject.teacher_fname}/>{subject.teacher_fname} {subject.teacher_lname}</td>}
                                    {JSON.parse(sessionStorage.getItem('user')).role === 3 ?
                                        <td>
                                            <button className="btn btn-warning" onClick={(event) => this.onShowUnSubscribeHandler(event, subject.subject_id)}>Unsubscribe</button>
                                        </td> : null}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            
                <Modal
                    show={this.state.showDeleteModal}
                    onHide={this.onHideDeleteHandler}
                    dialogClassName="modal-90w"
                    aria-labelledby="delete-modal-styling-title">

                    <Modal.Header closeButton>
                        <Modal.Title id="delete-modal-styling-title">
                            Delete
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure that you want to delete this subject?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.onHideDeleteHandler}>Cancel</button>
                        <button className="btn btn-danger" onClick={() => {
                            this.props.func.delete(this.state.subject_id);
                            this.onHideDeleteHandler();
                            }}>Delete</button>
                    </Modal.Footer>

                </Modal>

                <Modal
                    show={this.state.showUnSubscribeModal}
                    onHide={this.onHideUnSubscribeHandler}
                    dialogClassName="modal-90w"
                    aria-labelledby="unsubscribe-modal-styling-title">

                    <Modal.Header closeButton>
                        <Modal.Title id="unsubscribe-modal-styling-title">
                            Unsubscribe
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure that you want to unsubscribe from this subject?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.onHideUnSubscribeHandler}>Cancel</button>
                        <button className="btn btn-danger" onClick={() => {
                            this.props.func.unsubscribe(this.state.subject_id);
                            this.onHideUnSubscribeHandler();
                            }}>Unsubscribe</button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }
}

export default UserSubjects
