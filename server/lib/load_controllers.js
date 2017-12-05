const fs = require('fs');
const path = require('path');
const { getController } = require('./util');

function dirTree(fileName) {
  var stats = fs.lstatSync(fileName),
    info = {};

  if (stats.isDirectory()) {
    let children = fs.readdirSync(fileName).map(function(child) {
      return dirTree(fileName + '/' + child);
    });
    let childrenObj = {};
    children.forEach(child => {
      let name = Object.keys(child)[0];
      childrenObj[getController(name)] = child[name];
    });

    info[path.basename(fileName)] = childrenObj;
  } else {
    let klass = require(fileName);
    klass._path = fileName.slice(
      path.resolve(__dirname, '../controllers').length,
      -3
    );
    info[path.basename(fileName).slice(0, -3)] = klass;
  }

  return info;
}

module.exports = dirTree(path.resolve(__dirname, '../controllers')).controllers;
