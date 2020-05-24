import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Forum extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             forum: {},
             messages: [],
             message: "",
             err: ""
        }
    }
    

    getForumData = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/'+this.props.match.params.subjectId+'/forum/'+this.props.match.params.forumId)
        .then(res => {
            if(res.status === 200) {
                return res.json();
            }

            throw new Error('Subject Not Found');
        }).then(res => {
            this.setState({
                forum: res
            })
        }).catch(err => this.setState({err: err.message}));
    }

    getMessageData = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/'+this.props.match.params.subjectId+'/forum/'+this.props.match.params.forumId+'/messages')
        .then(res => {
            if(res.status === 200) {
                return res.json();
            }

            throw new Error('Subject Not Found');
        })
        .then(res => {
            this.setState({
                messages: res
            })
        })
        .catch(err => this.setState({err: err.message}));
    }

    onPost = (event) => {
        event.preventDefault();

        try {

            if(this.state.message.length < 1) {
                throw new Error('Comment Name Is Empty')
            }

            fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/'+this.props.match.params.subjectId+'/forum/'+this.props.match.params.forumId+'/message/post', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: JSON.parse(sessionStorage.getItem('user')).id,
                    forum_id: this.props.match.params.forumId,
                    message: this.state.message
                })
            })
            .then(res => {
                if(res.status === 200) {
                    return res.json();
                }
    
                throw new Error('Unable to Post Comment');
            })
            .then(res => {
                this.setState(prevState => ({
                    messages: res.concat(prevState.messages),
                    message: ""
                }))
            })
            .catch(err => this.setState({err: err.message}));
        } catch (error) {
            this.setState({err: error.message})
        }
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        this.getForumData();
        this.getMessageData();
    }

    render() {
        return (
            <div>
                <Header items={this.props.headerItems} titleLink={this.props.titleLink} {...this.props}/>
                <main className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col">
                                <h3>{this.state.forum.name}</h3>
                                <p>{this.state.forum.description}</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col">
                                <form>
                                    <div className="input-group mb-3">
                                        <input type="text" name="message" className="form-control" onChange={this.handleFormChange} value={this.state.message} placeholder="Write your comment here..."/>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" onClick={this.onPost}>Comment</button>
                                        </div>
                                    </div>
                                </form>
                                {this.state.messages.map(message => {
                                    return (
                                        <div className="media text-muted pt-3" key={message.id}>
                                            <img src={"https://storage.googleapis.com/teacher-student-forum-files/"+message.profile} alt="profile" className="mr-2 rounded" width="32" height="32"/>
                                            <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                                <span className="d-block text-gray-dark"><strong>{message.fname+" "+message.lname}</strong> - {message.created_at}</span>
                                                {message.message}
                                            </p>
                                        </div>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </div>
                </main>
                <Footer messageLeft={"Welcome: "+JSON.parse(sessionStorage.getItem('user')).fname+" "+JSON.parse(sessionStorage.getItem('user')).lname} messageRight={""}/>
            </div>
        )
    }
}

export default Forum
