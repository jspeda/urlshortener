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
  id: Number,
  slug: Number,
  original_url: String
});

const Address = mongoose.model('Address', urlSchema);

const createEntry = (req, res) => {
  const address = new Address(req.body);
  address.slug = Date.now()
  address.original_url = req.params.url;
  address
    .save()
    .then(address => {
      return Address.find()
    })
    .then(addresses => {
      console.log(addresses)
    })
    .catch(err => {
      throw Error(err);
    })
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/new/:url', (req, res) => {
  createEntry(req);
  res.send({"url": req.params.url});
});

app.set('port', (process.env.PORT || 8000));

app.use('/public', express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
  console.log('listening on port', app.get('port'));
});
