
// external import 
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// internal import 
const loginRouter = require('./routers/loginRouter')
const usersRouter = require('./routers/usersRouter')
const inboxRouter = require('./routers/inboxRouter')
const {errorHandler,notFoundhandler} = require('./middleware/common/errorHandler')

const app = express();
dotenv.config();

// database connection 
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
            .then(()=> console.log("Database Connection Successful!"))
            .catch(err=> console.log(err));
            
// request parser 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// set view engine
app.set('view engin', 'ejs');

// set static folder
app.use(express.static(path.join(__dirname,'public')));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));


// routing setup 
app.use('/',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);



// 404 not found handler 
app.use(notFoundhandler);

// common error handler 
app.use(errorHandler);



app.listen(process.env.PORT,()=>{
    console.log(`app listening to port ${process.env.PORT}`);
})
