import React, { Component } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            selectedFile: null,
            loaded:0
        }
    }

    checkMimeType = (file) => {
        const types = ['image/png', 'image/jpeg', 'image/gif']

        if(types.every(type => file.type !== type)){
            return file.type+' is not a valid file type\n';
        }
        return true
    }

    checkFileSize = (file) => {
        var size = 5000000 //bytes => 5Mb

        if(file > size) {
            return file.type+' is too large';
        }

        return true
    }

    fileSelectedHandler = (event) => {
        if(this.checkFileSize(event.target.files[0]) && this.checkMimeType(event.target.files[0])) {
            this.setState({
                selectedFile: event.target.files[0]
            })
        }
    }

    fileUploadHandler = (event) => {
        let formData = new FormData();
        formData.append('file', this.state.selectedFile, this.state.selectedFile.name);
        formData.set('user_id', JSON.parse(sessionStorage.getItem('user')).id);
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_SERVER_ADDRESS+'/media/profile/upload',
            data: formData,
        }).then(res => {
            if(res.status === 200) {
                var user = JSON.parse(sessionStorage.getItem('user'));
                user.profile = res.data.profile;
                sessionStorage.setItem('user', JSON.stringify(user)); 
            }
        })
    }
    
    render() {
        return (
            <div>
            <Header items={this.props.headerItems} titleLink={this.props.titleLink} {...this.props}/>
            <main className="py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="form-group file">
                                <label htmlFor="file">Upload Your Profile Picture</label>
                                <input name="file" type="file" className="form-control" onChange={this.fileSelectedHandler}/>
                            </div>
                            <button className="btn btn-success btn-block" onClick={this.fileUploadHandler}>Upload</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer messageLeft={"Forum"} messageRight={""}/>
            </div>
        )
    }
}

export default Profile