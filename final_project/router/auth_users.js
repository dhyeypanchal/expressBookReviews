const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username,userloginu)=>{ //returns boolean
//write code to check is the username is valid
if (username===userloginu) {
  return true;
}
}

const authenticatedUser = (username,password,userloginu,userloginp)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  if(isValid(username, userloginu) == true && password == userloginp){
    return true;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const userlogin= {
    username: req.body.username,
    password:req.body.password
  }
  for (i in users) {
    if (authenticatedUser(users[i].username,users[i].password,userlogin.username,userlogin.password)) {
      const token = jwt.sign(userlogin.username , 'thisissecretkey');
      req.session.username = token; 
      return res.status(200).json({message:"Successfully login"})
    }
  }
  return res.status(300).json({message: "Login Credentials are wrong"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.query.review;
  try {
    const user = books[isbn].reviews
    user.review = `${review}`;
    // console.log(user.review);
    return res.status(200).send(`The review for book ISBN ${isbn} has been added/updated.`)
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error")
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  try {
    const isbn = req.params.isbn;
    const user = books[isbn].reviews
    // console.log(user);
    user.review = "";
    // console.log(user);
    return res.status(200).send(`Reviews for book ISBN ${isbn} have been Deleted Successfully.`)
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error")
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
