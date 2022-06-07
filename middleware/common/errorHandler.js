const creatError = require('http-errors');

// not found handler
 function notFoundhandler(req,res,next){
    next(creatError(404,"Your requested content was not found!!"));
 }

 // default error handler
 function errorHandler(err,req,res,next){
     res.locals.error = process.env.NODE_ENV === 'development'? err : {message: err.message};

     res.status(err.status || 500);

     if(res.locals.html){
         // html response
         res.render('error.ejs',{title:"Error Page"})
     }else{
         // json response
         res.json(res.locals.error)
     }
  
 }

 module.exports = {
    notFoundhandler,
    errorHandler
 }