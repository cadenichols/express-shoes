'use strict';

var express = require('express');
var router = express.Router();

var Shoe = require('../models/shoe');

router.get('/', function(req, res) {
  Shoe.get(function(err, shoes) {
    if(err) {
      res.status(400).send(err);
      return;
    }
    res.send(shoes);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Shoe.get(function(err, shoes) {
    if(err) {
      res.status(400).send(err);
      return;
    }

    var shoe = shoes.find(function(obj) {
      return obj.id === id;
    });

    if(!shoe) {
      res.status(404).send({err: "Shoe not found"});
      return;
    }
    res.send(shoe);
  });
});

router.post('/', function(req, res) {
  var newShoe = req.body;
  Shoe.create(newShoe, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Shoe.delete(id, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var updatesObj = req.body;
  Shoe.update(id, updatesObj, function(err, updatedShoe) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(updatedShoe);
    }
  });
});


module.exports = router;

