import React, { Component } from 'react'
import Header from '../components/Header';

class SignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: ""
        }
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
                                    Sign Up
                                </div>

                                <div className="card-body">
                                    <form method="post" onSubmit={this.handleSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="first_name" className="col-md-4 col-form-label text-md-right">First Name: </label>
                                            
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" name="first_name" value={this.state.first_name} onChange={this.handleFormChange}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="last_name" className="col-md-4 col-form-label text-md-right">Last Name: </label>
                                            
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" name="last_name" value={this.state.last_name} onChange={this.handleFormChange}/>
                                            </div>
                                        </div>

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

                                        <div className="form-group row">
                                            <label htmlFor="confirm_password" className="col-md-4 col-form-label text-md-right">Confirm Password: </label>
                                            
                                            <div className="col-md-6">
                                                <input type="password" className="form-control" name="confirm_password" value={this.state.confirm_password} onChange={this.handleFormChange}/>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-0">
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Sign Up
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

export default SignUp
