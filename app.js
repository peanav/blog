
/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var marked = require('marked');
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get(/\/post\/([^\/]+)\/?/, function(req, res) {
  fs.readFile('content/posts/' + req.params[0] + '.md', 'ascii', function(err, data) {
    if(err) {
      res.render('404', {
        title: '404'
      });
    } else {
      console.log(marked(data));
      res.render('post', {
        locals: {
          title: 'test',
          post_html: marked(data)
        }
      });
    }
  });
});

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

