const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const JWT_SECRET = "thisissecretkey"

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    const token = req.session.username
    // console.log(token);
    if (!token) {
        return res.status(401).json({ error: "Please Login" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        // console.log(data);
        next()
    } catch (error) {
        return res.status(401).json({ error: "Please Login" })
    }
    
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));