import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './utils/protected.route';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import Landing from './views/Landing';
import Error404 from './views/Error404';
import auth from './utils/auth'

class App extends Component {
	render() {
		const unAuthHeader = [
            {title: 'Login', type: "Link", link: "/login"},
            {title: 'Sign Up', type: "Link", link: "/signup"}
		  ];
		  
		const AuthHeader = [
			{title: 'Logout', type: "Logout", link: "#", onClick: (props) => {auth.logout(() => {
				props.history.push("/");
			})}}
		];
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/" component={(props) => <Landing {...props} headerItems={unAuthHeader} titleLink="/"/>} />
						<Route path="/login" component={(props) => <Login {...props} headerItems={unAuthHeader} titleLink="/"/>}/>
						<Route path="/signup" component={(props) => <SignUp {...props} headerItems={unAuthHeader} titleLink="/"/>}/>
						<ProtectedRoute path="/dashboard" component={(props) => <Dashboard {...props} headerItems={AuthHeader} titleLink="/dashboard"/>}/>
						<Route path="*" component={Error404}/>
					</Switch>
				</Router>
 			</div>
		)
	}
}

export default App
