import React, { Component } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

export class Profile extends Component {
    render() {
        return (
            <div>
            <Header items={this.props.headerItems} titleLink={this.props.titleLink} {...this.props}/>
                Profile
            <Footer messageLeft={"Forum"} messageRight={""}/>
            </div>
        )
    }
}

export default Profile
