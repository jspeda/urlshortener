const express = require('express');
const app = express();
const path = require('path');

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
