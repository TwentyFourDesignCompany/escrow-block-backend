
var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();

const page = fs.readFileSync(path.join(__dirname, "../", "index.html")).toString()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(202).send(page);
});

module.exports = router;
