'use strict';
var
  express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  parser = require('body-parser');

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./dat.sqlite"
  }
});

app.use(express.static('pages'));
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());
app.use(express.static(__dirname + '/public'))

app.get('/api/projects', function (req, res, next) {
  knex.select('*').from("projects")
    .then(function(projects){
	res.json(projects);
	return next();
    })
    .catch(function(err){
	res.status(500).json(err)
	return next();
    });
});
 
app.post('/api/projects', function (req, res, next) {
  var title = req.body.title;
  var description = req.body.description;
  var url = req.body.url;
  if(title&&description){
      knex("projects").insert({
	  title: title,
	  description: description,
	  url: url
      }).then(function(ids){
	  res.json({
	      id: ids[0],
	      title: title,
	      description: description,
	      url: url
	  });
	  return next();
      })
      .catch(function(err){
	  res.status(500).json(err);
	  return next();
      });
  }else{
	  res.status(400).json("BadRequest");
	  return next();
  }
});

app.get('/api/projects/:id', function (req, res, next) {
  var id = req.params.id;
  knex("projects").where('id',id).select('*')
    .then(function(project){
	if(project!=""){
	    res.json(project);
	    return next();
	}else{
	    res.status(404).json("NotFound");
	    return next();
	}
    })
    .catch(function(err){
	res.status(500).json(err)
	return next();
    });
});

app.delete('/api/projects/:id', function (req, res, next) {
  var id = req.params.id;
  knex("projects").where('id',id).del()
    .then(function(project){
	if(project>0){
	    res.json(id);
	    return next();
	}else{
	    res.status(404).json("NotFound");
	    return next();
	}
    })
  .catch(function(err){
      res.status(500).json(err)
      return next();
  });
});


app.listen(port, function () {
    console.log("Server running with port", port)
});

/*
var sqls = require('fs')
  .readFileSync(__dirname + '/specifications/database.sql')
  .toString();
knex.raw(sqls)
  .then(function () {
    app.listen(port, function () {
      console.log("Server running with port", port)
    });
  });
*/
