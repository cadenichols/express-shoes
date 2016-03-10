'use strict';

//  Shoe model
//  Contains methods to interact with shoe data

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var shoesFilepath = path.join(__dirname, '../data/shoes.json');

exports.get = function(cb) {
  fs.readFile(shoesFilepath, function(err, data) {
    if(err) return cb(err);
    var shoes = JSON.parse(data);
    cb(null, shoes);
  });
};

exports.create = function(newShoe, cb) {
  this.get((err, shoes) => {  // read and parse
    if(err) return cb(err);
    newShoe.id = uuid();
    shoes.push(newShoe);   // modify
    this.write(shoes, cb);  // stringify and write
  });
};

exports.write = function(shoes, cb) {
  fs.writeFile(shoesFilepath, JSON.stringify(shoes), cb);
};

exports.getById = function() {

}

exports.delete = function(id, cb) {
  // get the array of shoes
  // remove the shoe with the given id from the array
  // write the modified array back to the db

  this.get((err, shoes) => {

    var length = shoes.length;

    shoes = shoes.filter(function(shoe) {
      return shoe.id !== id;
    });

    if(length === shoes.length) {
      cb( {err: "Shoe not found."} );
      return;
    }

    this.write(shoes, cb);
  });
};


exports.update = function(id, updatesObj, cb) {
  // find the shoe with the given id
  // update that shoe with the object
  // save the modified shoes array to db
  // cb with updated shoe

  this.get((err, shoes) => {
    var updatedShoe;

    shoes = shoes.map(function(shoe) {
      if(shoe.id === id) {
        // do the update
        for(var key in updatesObj) {
          shoe[key] = updatesObj[key];
        }
        updatedShoe = shoe;
      }
      return shoe;
    });

    if(!updatedShoe) {
      cb( {err: "Shoe not found."} );
      return;
    }

    this.write(shoes, function(err) {
      cb(err, updatedShoe)
    });
  });
};












