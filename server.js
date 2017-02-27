var express = require('express'),
  mongoose = require('mongoose'),
  path = require('path'),
  cors = require('cors'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 6755,
  app = express();

//requiring files
var Book = require("./server/Book.schema.js")

//middleware
// app.use(express.static(path.join(__dirname, 'SRC/public')));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
// app.post('/api/books', books.postBook);
// app.put('/api/book/:id', books.updateBook);
// app.delete('/api/book/:id', books.deleteBook);
// app.get('/api/books', books.getAllBooks);
app.get('/', function(req, res) {
  res.send('happy to be here');
});

app.get('/books', function(req, res) {
  console.log('getting all books');
  Book.find({})
    .exec(function(err, books) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

app.get('/books/:id', function(req, res) {
  console.log('getting all books');
  Book.findOne({
    _id: req.params.id
    })
    .exec(function(err, books) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

app.post('/book', function(req, res) {
  var newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save(function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.post('/book2', function(req, res) {
  Book.create(req.body, function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});


//connection
var mongoUri = "mongodb://localhost:27017/book";


mongoose.connect(mongoUri, function() {
  console.log("I'm connected to the DataBase: " + mongoUri);
})

app.listen(port, function() {
  console.log("I'm listen on port: " + port)
});