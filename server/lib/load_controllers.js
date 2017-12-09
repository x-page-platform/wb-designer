const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { getController } = require('./util');

function dirTree(fileName, parentNode = {}) {
  var stats = fs.lstatSync(fileName);

  if (stats.isDirectory()) {
    let dirName = _.capitalize(path.basename(fileName));
    parentNode[dirName] = {};

    let children = fs.readdirSync(fileName).map(function(child) {
      return dirTree(fileName + '/' + child);
    });

    children.forEach(child => {
      Object.assign(parentNode[dirName], child);
    });
  } else {
    let klass = require(fileName);
    klass._path = fileName.slice(
      path.resolve(__dirname, '../controllers').length,
      -3
    );
    parentNode[getController(path.basename(fileName).slice(0, -3))] = klass;
  }

  return parentNode;
}

module.exports = dirTree(path.resolve(__dirname, '../controllers')).Controllers;
