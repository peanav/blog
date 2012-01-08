var fs = require('fs');
var _ = require('underscore');

var filesInDir = function(dir, extensions, callback) {
  fs.readdir(dir, function(err, files) {
    if(err) {
      callback(err);
    } else {
      var filteredFiles = _.reduce(files, function(memo, file) {
        if(match(file, extensions)) {
          memo.push(file);
        }
        return memo;
      }, []);
    }
  });
};

var match = function(file, extensions) {
  var returnValue,
      fileCheck = function(fileName, fileExtension) {
        return _.last(fileName.split('.')) === fileExtension;
      };

  if(_.isArray(extensions)) {
    _.each(extensions, function(ext) {
      if(fileCheck(file, ext)) {
        returnValue = true;
      }
    });
  } else {
    returnValue = fileCheck(file, extensions);
  }
  return returnValue;
}
