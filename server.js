const express = require('express');
const hbs = require('hbs');
const fs =  require('fs');

const port =  process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req, res, next) => {
  var now = new  Date().toString();
  var log = `${now}:${req.method}:${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append log file');
    }
  });

next();
});

// app.use((req, res) => {
//   res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCUrrentYear', () =>{
  return new  Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

app.get('/', (request, response) =>{
  response.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to SomeWebsite'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs',{
    pageTitle:'About us page'
  });
});

app.get('/bad',(req, res) =>{
  res.send({
    errorMessage:'Unable to Handle Request'
  });
})

app.listen(port,() =>{
  console.log(`Server is up on port:${port}`);
});
