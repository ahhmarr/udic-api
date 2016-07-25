var express = require('express');
var router = express.Router();
var wordApi=require('../app/getWords');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/fetch-random-word',function(req,res,next)
{
	wordApi.fetchWord().then(function(resp)
	{
		res.send({
			word : resp.word,
			meaning : resp.def
		})
	});
	
});

module.exports = router;
