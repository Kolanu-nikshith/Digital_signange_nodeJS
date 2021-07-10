var finalhandler = require('finalhandler')
var http = require('http')
var serveIndex = require('serve-index')
var serveStatic = require('serve-static')
var express = require('express');
var router = express.Router();
 
// Serve directory indexes for public/ftp folder (with icons)
var up = serveIndex('uploads', {'icons': true})
 
// Serve up public/ftp folder files
var serve = serveStatic('uploads');
 
router.get('/',ensureAuthenticated, function (req, res) {
  
  var done = finalhandler(req, res);
  serve(req, res, function onNext(err) {
    if (err) return done(err);
    up(req, res, done);
   // res.render('file');
});
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;