const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: 'variables.env'});
const path = require('path');


mongoose.connect(process.env.DATABASE, (err) => {
  if (err) return console.log('error')
});


const Schema = mongoose.Schema;

const urlSchema = new Schema({
  slug: String,
  original_url: String
})


app.set('port', (process.env.PORT || 8000));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:url', (req, res) => {
  res.send({"url": req.params.url});
});

app.listen(app.get('port'), () => {
  console.log('listening on port', app.get('port'));
});
