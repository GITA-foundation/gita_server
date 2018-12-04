### User local login

POST /api/auth/local

```{
  identifier: email or username,
  password
}```


### reset password flow,

1. POST  /api/forgetRequest

body: {
 email: 'xxxx@xxx.ccc'
}

// ok 201,
// and send email to route: /resetPassword?code=${token} (front end route)
// form post to /api/resetPassword

// Error 401


2. POST /api/resetPassword

const data = qs.stringify({
newPassword,
code,
});

var req = new XMLHttpRequest();
req.open('POST', `${API_HOST}/resetPassword`, true);
req.setRequestHeader('Authorization', 'Bearer ' + code);
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
req.send(data);

// update success 
// res.redirect(`/?verify=ok&accessToken=${token}`);

// error 401