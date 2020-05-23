import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class NewForum extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            forumName: "",
            description: "",
            err: ""
       }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        try {
            if(this.state.forumName.length < 1) {
                throw new Error('Subject Name Is Empty')
            }

            fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/'+this.props.match.params.subjectId+'/forum/new', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    forumName: this.state.forumName,
                    description: this.state.description,
                    teacher_id: JSON.parse(sessionStorage.getItem('user')).id
                })
            }).then(res => {
                if(res.status === 200) {
                    return res.json()
                }
    
                throw new Error('Error Creating Forum');
            }).then(res => {
                this.props.history.push("/subject/"+this.props.match.params.subjectId+'/forum/'+res.forum_id);
            })
            .catch(err => this.setState({err: err.message}));

        } catch (error) {
            this.setState({err: error.message})
        }
    }

    handleCancel = () => {
        this.props.history.push("/subject/"+this.props.match.params.subjectId)
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    

    render() {
        return (
            <div>
                <Header items={this.props.headerItems} titleLink={this.props.titleLink} {...this.props}/>
                <main className="py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <form>
                                    <div className="form-group row">
                                        <label htmlFor="forumName" className="col-md-4 col-form-label text-md-right">Forum Name: </label>

                                        <div className="col-md-6">
                                            <input type="text" name="forumName" id="forumName" className="form-control" placeholder="Subject Name" value={this.state.forumName} onChange={this.handleFormChange}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="description" className="col-md-4 col-form-label text-md-right">Description: </label>

                                        <div className="col-md-6">
                                            <textarea name="description" id="description" className="form-control" rows="7" placeholder="Description of Subject" value={this.state.description} onChange={this.handleFormChange}/>
                                        </div>
                                    </div>

                                    {this.state.err !== "" ?
                                        <div className="form-group row">
                                            <div className="col-md-6 offset-md-4">
                                                <span className="alert-danger form-control">
                                                {this.state.err}
                                                </span>
                                            </div>
                                        </div>: null}

                                    <div className="form-group row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <span>
                                                <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>
                                                    Submit
                                                </button>
                                            </span>
                                            <span className="px-1" onClick={this.handleCancel}>
                                                <button className="btn btn-warning">
                                                    Cancel
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer messageLeft={"Welcome: "+JSON.parse(sessionStorage.getItem('user')).fname+" "+JSON.parse(sessionStorage.getItem('user')).lname} messageRight={""}/>
            </div>
        )
    }
}

export default NewForum
