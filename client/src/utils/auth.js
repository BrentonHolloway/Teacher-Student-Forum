class Auth {

  constructor() {
    this.authenticated = false;
  }
  
  login = (cb, email, password, err) => {
    fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/auth/login', {
          method: 'post',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
        .then((response) => {
    
          if (response.status === 200) {
            this.setSession(response.body);
            cb();
          } else {
            err("Invalid Username or Password");
          }
        })
  }

  setSession = (body) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((64000) + new Date().getTime());
    localStorage.setItem('access_token', body.clearance);
    localStorage.setItem('id_token', body.user_id);
    localStorage.setItem('expires_at', expiresAt);
  }  

  // removes user details from localStorage
  logout = (cb) => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    cb();
  }

  // checks if the user is authenticated
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

export default new Auth();