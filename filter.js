exports.checkAuth=function(req, res, next) {
	if( req.session.user){
		console.log(req.session.user)
		res.redirect('/user/signin');
	}
	res.redirect('/signin');
    var token = req.signedCookies.token;
    if (token && req.session.user && req.session.user.token === token)
        next();
    else if (token) {
        //if invalid token or no session, should rebuild
        var authInfo = user.getAuthInfo(token);
        if (authInfo && authInfo.isAuth) {
            req.session.user = {
                userID: authInfo.userID,
                userName: authInfo.userName,
                isAuth: authInfo.isAuth,
                token: token
            }
            next();
   
        } else
            res.redirect('/user/login');
    } else
        res.redirect('/user/login');
}