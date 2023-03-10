const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  const data = {
    username, password
  }
  for (i in users) {
    if (isValid(users[i].username === username)) {
      return res.status(400).json({ message: "user already exist" })
    }
  }
  users.push(data)
  return res.status(200).json({ message: "Successfully registered Now you can login." })
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  return res.status(200).json({ books: books })

  // using async callback function
  // function getbooks(callback) {
  //   return callback(null, books);
  // }
  // getbooks((err, books) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(books);
  // });
});


// public_users.get('/',async (req, res)=> {
//   //Write your code here
//   return res.status(200).json({ books: books })
// });


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  if (req.params.isbn <= 10) {
    return res.send(books[req.params.isbn])
  }
  return res.status(400).json({ message: "isbn must be in 1 to 10" })

  // this is code using promises
// function bookbyisbn(isbn) {
//   return new Promise((resolve, reject) => {
//     if (isbn) {
//       resolve(books[isbn]);
//     } else {
//       reject(new Error('Book not found'));
//     }
//   });
// }
// bookbyisbn(req.params.isbn)
//   .then(book => {
//     console.log(book);
//   })
//   .catch(error => {
//     console.error(error);
//   });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  for (i in books) {
    if (books[i].author === req.params.author) {
      const isbn = i;
      const title = books[i].title;
      const reviews = books[i].reviews;
      return res.status(200).json({
        booksbytitle: [{
          isbn: isbn,
          title: title,
          reviews: reviews
        }
        ]
      })
    }
  }

  // using promises
  // for (i in books) {
  //   if (books[i].author === req.params.author) {
  //     function bookbyauthor(author) {
  //       return new Promise((resolve, reject) => {
  //         if (author) {
  //           resolve(books[i].author);
  //         } else {
  //           reject(new Error('book not exist'));
  //         }
  //       });
  //     }
  //     bookbyauthor(req.params.author)
  //     .then(book => {
  //       console.log(book);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  //   }
  // }
  return res.status(400).json({ message: "wrong input" });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  for (i in books) {
    if (books[i].title === req.params.title) {
      const isbn = i;
      const author = books[i].author;
      const reviews = books[i].reviews;
      return res.status(200).json({
        booksbytitle: [{
          isbn: isbn,
          author: author,
          reviews: reviews
        }
        ]
      })
    }
  }

  // using promises
  // for (i in books) {
  //   if (books[i].title === req.params.title) {
  //     function bookbyauthor(title) {
  //       return new Promise((resolve, reject) => {
  //         if (title) {
  //           resolve(books[i].title);
  //         } else {
  //           reject(new Error('book not exist'));
  //         }
  //       });
  //     }
  //     bookbyauthor(req.params.title)
  //       .then(book => {
  //         console.log(book);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }
  // }
  return res.status(400).json({ message: "wrong input" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  if (req.params.isbn <= 10) {
    return res.send(books[req.params.isbn].reviews)
  }
  return res.status(400).json({ message: "isbn must be in 1 to 10" })
});

module.exports.general = public_users;