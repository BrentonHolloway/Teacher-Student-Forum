import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Subject extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            subject: [],
            forums: [],
            err: "",
            showUnSubscribeModal: false,
            forum_id: null,
        }
    }

    delete = (forum_id) => {
        this.setState(prevState => ({
            forums: prevState.forums.filter(forums => forums.id !== forum_id)
        }))
    }

    onClickHandler = (id) => {
        this.props.history.push("/subject/"+this.props.match.params.subjectId+"/forum/"+id)
    }

    onShowDeleteHandler = (event, forum_id) => {
        event.stopPropagation();
        this.setState({
            showDeleteModal: true,
            forum_id: forum_id
        })
    }

    onHideDeleteHandler = () => {
        this.setState({
            showDeleteModal: false,
            forum_id: null
        })
    }

    onDeleteHandler = (forum_id) => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/'+this.props.match.params.subjectId+'/forum/delete', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                teacher_id: JSON.parse(sessionStorage.getItem('user')).id,
                forum_id: forum_id
            })
        })
        .then((res) => {
            if(res.status !== 200) {
                throw new Error('Unable to delete subject');
            }
        })
        .then(this.delete(forum_id))
        .catch(err => this.setState({err: err.message}));
    }
    
    getSubjectData = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/'+this.props.match.params.subjectId)
        .then(res => {
            if(res.status === 200) {
                return res.json();
            }

            throw new Error('Subject Not Found');
        }).then(res => {
            this.setState({
                subject: res
            })
        }).catch(err => this.setState({err: err.message}));
    }

    getForumData = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/'+this.props.match.params.subjectId+'/forum')
        .then(res => {
            if(res.status === 200) {
                return res.json();
            }

            throw new Error('Subject Not Found');
        }).then(res => {
            this.setState({
                forums: res
            })
        }).catch(err => this.setState({err: err.message}));
    }

    componentDidMount() {
        this.getSubjectData();
        this.getForumData();
    }

    render() {
        return (
            <div>
                <Header items={this.props.headerItems} titleLink={this.props.titleLink} {...this.props}/>
                <main className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                {this.state.subject ? 
                                <div>
                                    <h3>{this.state.subject.name}</h3>
                                    <p>{this.state.subject.description}</p>
                                </div>
                                : null}
                                <div className="row justify-content-center">
                                    <span className="text-md-left col-6">
                                        <h3>Forums</h3>
                                    </span>
                                    <span className="text-md-right col-6">
                                        {JSON.parse(sessionStorage.getItem('user')).role === 2 ?
                                            <Link to={"/subject/"+this.props.match.params.subjectId+"/forum/new"}>
                                                <button className="btn btn-primary">
                                                    Create New Forum
                                                </button>
                                            </Link>
                                        : null}
                                    </span>
                                </div>
                                
                                <table className="table table-hover">
                                    <tbody>
                                        {this.state.forums.map((forum) => {
                                            return (
                                                <tr key={forum.id} className="pointer" onClick={() => this.onClickHandler(forum.id)}>
                                                    <th>{forum.name}</th>
                                                    <td>{forum.description}</td>
                                                    {JSON.parse(sessionStorage.getItem('user')).role === 2 ?
                                                    <td className="text-md-right">
                                                        <button className="btn btn-danger" onClick={(event) => this.onShowDeleteHandler(event, forum.id)}>
                                                            Delete
                                                        </button>
                                                    </td> : null}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer messageLeft={"Welcome: "+JSON.parse(sessionStorage.getItem('user')).fname+" "+JSON.parse(sessionStorage.getItem('user')).lname} messageRight={""}/>

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
                        <p>Are you sure that you want to delete this forum?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.onHideDeleteHandler}>Cancel</button>
                        <button className="btn btn-danger" onClick={() => {
                            this.onDeleteHandler(this.state.forum_id)
                            this.onHideDeleteHandler();
                            }}>Delete</button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }
}

export default Subject
