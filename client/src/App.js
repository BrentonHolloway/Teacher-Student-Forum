import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './utils/protected.route';
import PublicRoute from './utils/public.route';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import Landing from './views/Landing';
import Error404 from './views/Error404';
import NewSubject from './views/NewSubject';
import Subject from './views/Subject';
import NewForum from './views/NewForum';
import Forum from './views/Forum';
import auth from './utils/auth';
import './css/App.css';

class App extends Component {
	render() {
		const unAuthHeaderProps = {
			buttons: [
				{title: 'Login', type: "Link", link: "/login"},
            	{title: 'Sign Up', type: "Link", link: "/signup"}
			],
			title: {
				name: process.env.REACT_APP_NAME,
				link: "/"
			}
		}

		const AuthHeaderProps = {
			buttons: [
				{title: 'Dashboard', type: "Link", link: "/dashboard"},
				{title: 'Logout', type: "Logout", link: "/", onClick: (props) => {auth.logout(() => {
					props.history.push("/");
				})}}
				
			],
			title: {
				name: process.env.REACT_APP_NAME,
				link: "/dashboard"
			},
			profile: {
				image: "default.png",
				link: "/profile"
			}
		}

		return (
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/" component={(props) => <Landing {...props} headerItems={auth.isAuthenticated() ? AuthHeaderProps : unAuthHeaderProps}/>} />
						<PublicRoute path="/login" component={(props) => <Login {...props} headerItems={unAuthHeaderProps}/>}/>
						<PublicRoute path="/signup" component={(props) => <SignUp {...props} headerItems={unAuthHeaderProps}/>}/>
						<ProtectedRoute path="/dashboard" component={(props) => <Dashboard {...props} headerItems={AuthHeaderProps}/>}/>
						<ProtectedRoute path="/profile" component={(props) => <Profile {...props} headerItems={AuthHeaderProps}/>}/>
						<ProtectedRoute path="/subject/new" component={(props) => <NewSubject {...props} headerItems={AuthHeaderProps}/>}/>
						<ProtectedRoute exact path="/subject/:subjectId" component={(props) => <Subject {...props} headerItems={AuthHeaderProps}/>}/>
						<ProtectedRoute path="/subject/:subjectId/forum/new" component={(props) => <NewForum {...props} headerItems={AuthHeaderProps}/>}/>
						<ProtectedRoute path="/subject/:subjectId/forum/:forumId" component={(props) => <Forum {...props} headerItems={AuthHeaderProps}/>}/>
						<Route path="*" component={Error404}/>
					</Switch>
				</Router>
 			</div>
		)
	}
}

export default App
