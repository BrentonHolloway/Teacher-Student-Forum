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
  
  login = (cb, email, password, error) => {
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
          throw new Error('Email or Password Incorrect');
        })
        .then((res) => {
          this.setSession(res);
          cb();
        })
        .catch(err => error(err));
  }

  setSession = (body) => {
    // Set the time that the access token will expire at
    //let expiresAt = JSON.stringify((64000) + new Date().getTime());
    // console.log(body)
    
    sessionStorage.setItem('user', JSON.stringify({
      id: body.user.id,
      fname: body.user.fname,
      lname: body.user.lname,
      email: body.user.email,
      role: body.user.role,
      profile: body.user.profile
    }));
    sessionStorage.setItem('authenticated', true);
    //this.authenticated = true;
  }  

  // removes user details from localStorage
  logout = (cb) => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authenticated');
    //this.authenticated = false;
    cb();
  }

  // checks if the user is authenticated
  isAuthenticated = () => {
    return sessionStorage.getItem('authenticated');
  }
}

export default new Auth();