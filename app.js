const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beer => {
      res.render('beers', { beer });
    })
    .catch(err => {
      res.send('404 beers not found');
    });
});

app.get('/randombeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      // let {food_pairing} = beer[0].food_pairing
      res.render('randombeer', { beer });
    })
    .catch(err => {
      res.send('404 beers not found');
    });
});

app.get('/beers/:id', (req, res) => {
  let { id } = req.params;
  punkAPI
    .getBeer(id)
    .then(beer => {
      res.render('beer', { beer });
      console.log(beer);
    })
    .catch(err => {
      res.send('404 beers not found');
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
