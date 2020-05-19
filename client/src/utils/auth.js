class Auth {

  constructor() {
    this.authenticated = false;
  }

  handleResponse = res => {
    console.log(res)
    if(res.status === 200) {
      return res.json()
    }
    throw new Error(res.message);
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
        .then((res) => {
          if(res.status === 200) {
            return res.json()
          }
          throw new Error('User Not Found');
        })
        .then((res) => {
          this.setSession(res);
          cb();
        })
        .catch(err => console.error(err))
  }

  setSession = (body) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((64000) + new Date().getTime());
    console.log(body)
    localStorage.setItem('user', JSON.stringify({
      id: body.user.id,
      fname: body.user.fname,
      lname: body.user.lname,
      email: body.user.email,
      role: body.user.role,
      profile: body.user.profile
    }))
    localStorage.setItem('expires_at', expiresAt);
  }  

  // removes user details from localStorage
  logout = (cb) => {
    // Clear access token and ID token from local storage
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