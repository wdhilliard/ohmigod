"use strict";

var express = require('express');
var app = express();

app.use(express.static('frontend'));

app.listen(3000, function () {
  console.log('Test app running on localhost:3000');
});