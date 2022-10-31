const fetch = require('node-fetch');

// use the express library
const express = require('express');

// create a new server application
const app = express();



const cookieParser = require('cookie-parser');

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;



const {encode} = require('html-entities');

const date = new Date();
console.log(date.toLocaleString('en-US'));


//const correctAnswer = "Denmark";
//const answers =[ "Denmark", "Sweden","Norway", "United Kingdom"];

//const answerLinks = answers.map(answer => {
//  return `<a href="javascript:alert('${
//    answer === correctAnswer ? 'Correct!' : 'Incorrect, Please Try Again!'
//    }')">${answer}</a>
//  }`
//})



// The main page of our website
app.get('/', (req, res) => {
  res.cookie('visited', Date.now().toString())
  const name = req.query.name || "World";



  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>An Example Title</title>
        <link rel="stylesheet" href="app.css">
      </head>
      <body>
        <h1>Hello, ${encode(name)}</h1>
        <h1> This site was accessed at, ${encode(date)}
        <p>HTML is so much better than a plain string!</p>
      </body>
    </html>

    
  `)
});




app.get('/', (req, res) => {  
  res.render('welcome', {
    name: req.query.name || "World",
  });
});




app.get("/trivia", async (req, res) => {
  // fetch the data
  const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");

  // interpret the body as json
  const content = await response.json();

  // TODO: make proper html
  const format = JSON.stringify(content, 2);

  // respond to the browser
  // TODO: make proper html
  res.send(JSON.stringify(content, 2));
  

//  res.render('trivia',{
//    question: question,
//    answers: answers,
//    category: category,
//    difficulty: difficulty,
//    correct_ans:correct_ans,  
//  });
});










// Start listening for network connections
app.listen(port);

// Printout for readability
console.log("Server Started!");




app.use(express.static('public'));



app.set('view engine', 'ejs');



let nextVisitorId = 1;

app.get('/', (req, res) => {
  res.cookie('visitorId', nextVisitorId++);
  res.cookie('visited', Date.now().toString());
  res.render('welcome', /* params */)
});
app.use(cookieParser());




//var cookieParser = require('cookie-parser');
//var PORT = 3000;
//app.listen(PORT, function(err){
//  if (err) console.log(err);
//  console.log("Server listening on PORT", PORT);
//});