import Header from '../components/Header';
import React, { Component } from 'react'
import auth from '../utils/auth';

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        auth.login(() => {
            this.props.history.push("/dashboard");
        },
        this.state.email,
        this.state.password,
        (error) => {
            this.setState({
                error: error
            })
        }
        )
        // ).then((error) => {
        //     this.setState({
        //         error: error
        //     })
        // })
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
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    Login
                                </div>

                                <div className="card-body">
                                    <form method="post" onSubmit={this.handleSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email: </label>
                                            
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleFormChange}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password: </label>
                                            
                                            <div className="col-md-6">
                                                <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleFormChange}/>
                                            </div>
                                        </div>

                                        {this.state.error !== "" &&
                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4 alert-danger">
                                                <p>
                                                {this.state.error}
                                                </p>
                                            </div>
                                        </div>}

                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
