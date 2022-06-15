const User = require("../models/People")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { set } = require("mongoose")
const createError = require("http-errors")

// get login page
function getLogin(req,res,next){
    res.render('index')
}

// login func 
async function login(req,res,next){
    try{
        // find a user email/mobile
        const user = await User.findOne({
            $or:[{email:req.body.username},{mobile: req.body.username}],
        })
        if(user && user._id){
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(isValidPassword){
                //prepere the user object to generate token
                const userObject ={
                    username:user.name,
                    mobile:user.mobile,
                    email:user.email,
                    removeEventListener:"user"
                };
                //generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                });
                // set cookie 
                res.cookie(process.env.COOKIE_NAME, token ,{
                    maxAge: process.env.JWT_EXPIRE,
                    httpOnly: true,
                    signed:true,
                });
                //set loggen in user local
                res.locals.loggrdInUser= userObject;

                res.render('inbox');
                
            }else{
                throw createError("Login failed! Please try again")
            }
        }else{
            throw createError("Login failed! Please try again")
        }
    }catch(err){
        res.render('index',{
            data:{
                username: req.body.username,
            },
            errors:{
                common:{
                    msg:err.message
                },
            },
        })
    }
}
// logout 
function logout(req,res){
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("Logged Out!");
}
module.exports = {
    getLogin,
    login,
    logout
}