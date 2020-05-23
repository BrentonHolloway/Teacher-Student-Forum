import React, { Component } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

class Subject extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             subject: null,
             forums: null,
             err: null
        }
    }
    

    getSubjectData = () => {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/subject/'+this.props.match.params.id)
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

    getFourumData = () => {

    }

    componentDidMount() {
        this.getSubjectData();
        this.getFourumData();
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
                                <h3>Forums</h3>
                                {}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer messageLeft={"Welcome: "+JSON.parse(sessionStorage.getItem('user')).fname+" "+JSON.parse(sessionStorage.getItem('user')).lname} messageRight={""}/>
            </div>
        )
    }
}

export default Subject
