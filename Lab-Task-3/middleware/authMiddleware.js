function isLoggedIn(req, res, next){

    if(!req.session.user){

        req.flash(
            "error",
            "Please login first"
        );

        return res.redirect("/login");

    }

    next();

}


function isAdmin(req, res, next){

    if(

        !req.session.user ||

        req.session.user.role !== "admin"

    ){

        req.flash(
            "error",
            "Access Denied"
        );

        return res.redirect("/");

    }

    next();

}

module.exports = {

    isLoggedIn,

    isAdmin

};