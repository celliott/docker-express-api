var express = require('express'),
	basicAuth = require('basic-auth')
	mongoskin = require('mongoskin'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	auth_token = process.env["AUTH_TOKEN"],
	auth_user = process.env["AUTH_USER"],
	app = express(),
	basicAuth = require('basic-auth')
	db = mongoskin.db('mongodb://@172.17.42.1:27017/api', {safe:true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))


// basic auth
var auth = function (req, res, next) {
	function unauthorized(res) {
		res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
		return res.status(401).send({ msg: 'Not Authorized' })
	}
	var user = basicAuth(req)
	if (!user || !user.name || !user.pass) {
		return unauthorized(res)
	}
	if (user.pass === auth_token) {
		return next()
	} else {
		return unauthorized(res)
	}
}

// get collection name
app.param('collectionName', function(req, res, next, collectionName){
	req.collection = db.collection(collectionName)
	return next()
})

// return error for access root
app.get('/', auth, function(req, res, next) {
	res.status(400).send({ msg: 'Bad Request' })
})

// return collection by name
app.get('/collections/:collectionName', auth, function(req, res, next) {
	req.collection.find({} ,{limit: 100, sort: {'_id': -1}}).toArray(function(e, results){
		if (e) return next(e)
		res.send(results)
	})
})

// post data to collection
app.post('/collections/:collectionName', auth, function(req, res, next) {
	req.collection.insert(req.body, {}, function(e, results){
		if (e) return next(e)
		res.send(results)
	})
})

// get item by collection and id
app.get('/collections/:collectionName/:id', auth, function(req, res, next) {
	req.collection.findById(req.params.id, function(e, result){
		if (e) return next(e)
		res.send(result)
	})
})

// update item by collection and id
app.put('/collections/:collectionName/:id', auth, function(req, res, next) {
	req.collection.updateById(req.params.id, {$set: req.body}, {safe: true, multi: false}, function(e, result){
		if (e) return next(e)
		res.send((result === 1) ? {msg:'success'} : {msg: 'error'})
	})
})

// delete item by collection and id
app.delete('/collections/:collectionName/:id', auth, function(req, res, next) {
	req.collection.removeById(req.params.id, function(e, result){
		if (e) return next(e)
		res.send((result === 1)?{msg: 'success'} : {msg: 'error'})
	})
})

// start server on port 3000
app.listen(3000, function(){
  console.log('Express server listening on port 3000')
})