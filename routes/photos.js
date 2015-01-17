var express = require('express');
var router = express.Router();
var Photo = require('../models/Photo');

var path = require('path');
var fs = require('fs');
var join = path.join;



var photos = [];
photos.push({

	name: 'Node.js Logo',
	path: 'http://nodejs.org/images/logos/nodejs-green.png'

});

/* GET home page. */
module.exports = function(router, dir){

	router.get('/', function(req, res, next) {
/*		res.render('photos', { 
	  	title: 'photos',
	  	photos: photos */
	  	Photo.find({}, function(err, photos){
	  		console.log(photos);
	  		if(err) return next(err);
	  		res.render('photos', {

	  			title: 'Photos',
	  			photos : photos

	  		});

	  	});
	});


router.get('/upload', function(req, res){

	res.render('photos/upload', {title: 'upload'});
});


router.post('/upload', function (req, res) {

	console.log(req.body);

	console.log('dir : ' + dir);

	console.log(req.files);

	var name = req.body.photo.name;

	var img = req.files.file;

	var path = join(dir, img.name);

	console.log('path : ' + path);
	console.log('img.path :' + img.path);

	fs.rename(img.path, path, function(err){

		if(err) return res.send(err);

		Photo.create({

			name: name,
			path: img.name

		}, function(err){
			if(err) return res.send(err);
			res.redirect('/');
		});


	});
/*	var name = req.body.photo_name;
	console.log('name : ' + name);

	console.log('upload called!!');
	res.send('upload!!');*/
});
router.get('/photo/:id/download', function(req, res, next){

	var id = req.params.id;

	console.log('id : ' + id);
	Photo.findById(id, function(err, photo){

		if(err) return next(err);

		var path = join(dir, photo.path);
		res.download(path);
	});

});
};


/*router.get('/', function(req, res) {
  res.render('photos', { 
  	title: 'photos',
  	photos: photos 
  });
});

router.get('/upload', function(req, res){

	res.render('photos/upload', {title: 'upload'});
});

router.post('/upload/:name', function (req, res) {

	var name = req.body.photo.name;
	console.log('name : ' + name);

	console.log('upload called!!');
	res.send('upload!!');
});

module.exports = router;*/
