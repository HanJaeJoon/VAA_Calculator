const express = require('express');
const favicon = require('serve-favicon')
const stockInfo = require(__dirname + '/static/js/stockInfo.js');
const path = require('path');
const { Console } = require('console');
const PORT = process.env.PORT || 80;

var app = express();

app
  .use(express.static(path.join(__dirname, 'pages')))
  .set('views', path.join(__dirname, 'views'))
  .use(favicon(path.join(__dirname, 'views', 'favicon.ico')))
  .use(express.static(path.join(__dirname, 'static/public')))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


app.get('/api/:date', (req, res) => {
  try {
    stockInfo.getData(req.params.date)
      .then((quotes) => {
        if (quotes) {
          res.send(quotes);
        } else {
          res.status(500).send(`Internal Server Error`);
        }
      });
  } catch (e) {
    res.status(500).send(`Internal Server Error - ${JSON.stringify(e)}`);
  }
});

app.get('/api/calculate/:date', asyncCalculate);

async function asyncCalculate(req, res) {
  try {
    let result = await stockInfo.calculate(req.params.date);
    res.send(result);
  } catch (e) {
    res.status(500).send(`Internal Server Error`);
  }
}