"use strict";

var open = require("open");
var express = require('express');
var app = express();

app.use(express.static('frontend'));

app.listen(1337, function () {
  console.log('Test app running on localhost:1337');
});

open('http://127.0.0.1:1337')