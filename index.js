const express = require('express');
const favicon = require('serve-favicon')
const path = require('path');
const PORT = process.env.PORT || 80;

express()
  .use(express.static(path.join(__dirname, 'pages')))
  .set('views', path.join(__dirname, 'views'))
  .use(favicon(path.join(__dirname, 'views', 'favicon.ico')))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));