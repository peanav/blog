var fs = require('fs')
    , marked = require('marked')
    , props = require('props')
    , _ = require('underscore');

var all = function(callback) {
  var posts = [],
      total,
      count = function(err, data) {
        if(data) {
          posts.push(data);
        } 
        total--;
        if(total === 0) {
          callback(null, _.sortBy(posts, function(post) { return post.date }).reverse());
        }
      };
  fs.readdir('content/posts', function(err, files) {
    if(err) {
      callback(err);
    } else {
      var mds = _.reduce(files, function(memo, file) {
        if(_.last(file.split('.')) === 'md') {
          memo.push(file);
          return memo;
        }
      }, []);
      total = mds.length;
      _.each(mds, function(fileName) {
        find(fileName, count);
      });
    }
  });
};

var find = function(fileName, callback) {
  fs.readFile('content/posts/' + fileName, 'ascii', function(err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, read(data))
    }
  });
};

var read = function(data) {
  var post = props(data);
  post['html'] = marked(post.__content);
  return post;
}

exports.all = all;
exports.find = find;
