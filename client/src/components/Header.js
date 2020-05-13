import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'

class Header extends Component {

    headerButon = (item, index) => {
        if (item.type === "Link") {
            return (
                <Link to={item.link} className="nav-link">
                    {item.title}
                </Link>
            );
        } else if (item.type === "Logout") {
            return (
                <Link className="nav-link" onClick={() => item.onClick(this.props)}>
                    {item.title}
                </Link>
            );
        }
        
    }
    

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a href={this.props.titleLink} className="navbar-brand col-sm-3 col md 2 mr-0">{process.env.REACT_APP_NAME}</a>
                <ul className="navbar-nav px-3 ml-auto">
                    {this.props.items.map((item, index) => (
                        <li className="nav-item text-nowrap" key={index}>
                            {this.headerButon(item, index)}
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}

export default Header
